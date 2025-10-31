---
title: "Google App Engine + APNS"
date: "2013-04-21"
path: "/posts/google-app-engine-apns"
excerpt: ""
feature_image: "https://images.unsplash.com/photo-1632298095711-d546888879ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fHB1c2glMjBub3RpZmljYXRpb25zfGVufDB8fHx8MTcxMTI4NzYxNHww&ixlib=rb-4.0.3&q=80&w=2000"
---

Earlier this month, Google App Engine [released support for outbound sockets](http://googleappengine.blogspot.com/2013/04/app-engine-177-released.html) and I figured that a Saturday spent mucking around with AppEngine to see if I could get it to work with APNS would be time well spent. In the sandboxed world of GAE, lack out outbound socket support meant that it was not possible to communicate with external services by opening a socket, which is what the Apple Push Notification Service (APNS) required. So for a long time, it was not possible to use the AppEngine to build an APNS provider, but now you can. Services like [Urban Airship expose this capability](http://www.aschroder.com/2012/02/sending-apple-ios-notifications-via-urban-airship-on-google-app-engine/) in a way that can be consumed through a RESTful service, which works with GAE using UrlFetch, but the focus of this post is to communicate with APNS directly. There are some caveats though. Billing needs to be enabled, although the free tier should be sufficient for playing around, and there’s also the matter of [the daily quota](https://developers.google.com/appengine/docs/quotas#Sockets).

Here’s a whirlwind tour of getting yourself up and running on APNS with Google AppEngine.

**1 — Fun with certificates and keys**

Apple makes the job of working with APNS quite a fun and intellectually stimulating experience, if you have nothing else to do on a Saturday. You may also notice a couple of new gray hairs once you’re done, but at the same time, there is an elegance to the architecture that must be acknowledged, even though its painful to setup.

Generate a new certificate signing request
Fire up the mac Keychain Access tool and request a certificate from a certificate authority.

![Request a certificate from a CA](/images/2024/03/0-xamvmxm-rp0v-wx-.png)

In the resulting dialog, enter your email address an identifiable string in the common name field. Also, select the “Saved to disk” option, since we need to upload it later to the provisioning portal.

![Certificate assistant](/images/2024/03/0-_we1luitgqesyxew.png)

Once you’re done with this, you should have a Certificate Signing Request (CSR) in your file system.

**Create a new App Id**
Now head over to the [Apple developer site](developer.apple.com), log in with your developer credentials and navigate to the iOS Dev Center, where you should see a link to “Certificates, Identifiers and Profiles” as shown below.

![iOS Developer Program](/images/2024/03/0-uouo58feqe5hj-4o.png)

First, create a new App Id, by navigating to that section:

![New App Id](/images/2024/03/0-9qaavfohfykdhgq9.png)

In, the add screen, enter any description and select the “Push Notifications” check box:

![Push notifications](/images/2024/03/0-pt_asgpge2sdab3l.png)

Also, in the bundle ID section, remember to include an explicit fully qualified bundle Id in the reverse domain notation, as wild-cards are not supported for push notifications:

![Bundle Id](/images/2024/03/0-osxwzpxvgnitej_v.png)

**Create a new push certificate**
Now, navigate to the certificates section, and create a new one. During creation, select the combo box as indicated below:

![Development certificate](/images/2024/03/0-ekfcscrq_ledhr6h.png)

Next, select the app Id created earlier and when prompted, upload the Certificate Signing Request created earlier. If all goes well, the certificate will be generated. Download this certificate, and double click it to open it in the KeyChain tool. You would see the private key with the common name that you entered earlier when you expand the certificate. Remember to note that the certificate name is prefixed with “Apple Development IOS Push Services”. Select both the certificate and the key, right click and “Export 2 items”. It will prompt you to enter the KeyChain password and will generate a .p12 file that you will need later to configure the server side provider.

**Generate a provisioning profile**
The last step in this process is to generate a provisioning profile so that you can deploy the app on to the device. In the devices section of the portal, create a new device and enter the 40-character device Id you get from iTunes or the Xcode Organizer. Head over to the Provisioning Profiles section and create a new profile. Remember to select “iOS App Development as shown below:

![Provisioning profile](/images/2024/03/0-gextxwtoujcvfnou.png)

In the next screens, select the App Id, device and certificate created in the previous steps to create the provisioning profile. Download the profile and drag it onto the profiles section of the Xcode organizer.

Now the painful part is done. Time to do some real work.

**2 — Create the web service**

A pre-requisite for this tutorial is Google App Engine, and getting a service up and running on it. If you haven’t done that before, follow the steps outlined in the [getting started page](https://developers.google.com/appengine/docs/java/gettingstarted/) and it should give you a good idea on how to work on this platform. It comes with good Eclipse integration so it should be a snap to get setup.

The framework I’ve used for APNS is [java-apns](https://github.com/notnoop/java-apns) which provides a simple API to APNS. Here’s all of the code I used to build out the simple service, this could be done in a simple servlet or a RESTful service on a [JAX-RS implementation like Jersey](http://crunchify.com/how-to-build-restful-service-with-java-using-jax-rs-and-jersey/) for example:

```
InputStream inputStream = context
    .getResourceAsStream(“/WEB-INF/ApnsDevelopment.p12”);
ApnsService service = APNS.newService()
    .withCert(inputStream, “password”).withSandboxDestination()
    .withNoErrorDetection().build();
String payload = APNS.newPayload().alertBody(message).badge(1).build();
ApnsNotification notification = service.push(token, payload);
```
A couple of things to note, the .p12 file exported from the Keychain needs to be included in the war file (preferably in the WEB-INF directory to prevent public access) and password protected at export time. Also, it’s important to add the “withNoErrorDetection()” method as shown above as it would otherwise try to spawn threads to detect errors and would not run in the GAE environment since thread creation is restricted. The input into this web service is a 40-character token that is received from the device, and the message that is to be sent.

At this point, the server side work is done. Let’s move over to the client.

**3 — Create the iOS client**

For the purpose of demonstration and testing, I’ve created a simple single view application with the bundle ID specified in the provisioning profile.

The key methods you would need to implement in the AppDelegate would be:

```
-application:didFinishLaunchingWithOptions:
-application:didRegisterForRemoteNotificationsWithDeviceToken
-application:didFailToRegisterForRemoteNotificationsWithError
-application:didReceiveRemoteNotification
```
1) -application:didFinishLaunchingWithOptions:
This method gets invoked when the application finishes launching either directly or when launched through a push notification. In the case of the latter, the details of the push notification are passed in through a dictionary object so that it can be dealt with. Here’s the code to register for push notification alerts:

```
[[ UIApplication sharedApplication] registerForRemoteNotificationTypes:UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound];
```
2) -application:didRegisterForRemoteNotificationsWithDeviceToken
This method gets invoked with the device token received from APNS. This token uniquely identifies the device and is not the same as the UDID. The token needs to be sent to the web service so that it can pass it on to the APNS and have messages sent back to this device. This token includes some special characters and spaces which needs to be removed as shown below:

```
NSString *token = [ deviceToken description ];
token = [ token stringByTrimmingCharactersInSet:[ NSCharacterSet characterSetWithCharactersInString:@”&lt;&gt;”]];
token = [ token stringByReplacingOccurrencesOfString:@” “ withString:@”” ];
```
3) -application:didFailToRegisterForRemoteNotificationsWithError
This method gets invoked if there’s some error in registering for remote notifications which causes the push token to be not available for the app.

4) -application:didReceiveRemoteNotification
This method can be used to trap an incoming message while in the app, and take some action. In this case it just shows it in an alert view.

```
UIAlertView *alertView = [[ UIAlertView alloc ] initWithTitle:@”Push Alert” message:userInfo[@”aps”][@”alert”] delegate:self cancelButtonTitle:@”OK” otherButtonTitles:nil];
[ alertView show ];
```
To test this capability, I’ve built a test app that takes input text from a text field and sends it to the web service created in GAE. The resulting push notification is trapped and displayed in an alert view as shown in the sample code above.

![Voila](/images/2024/03/0-pu9dsrqv8wd-0nh6.jpg)

Finally, a couple of things to keep in mind when developing apps that use push notifications:

- It’s inherently unreliable, do not use it for transferring any critical information
- While the transport is secured through TLS, it’s still advisable not to use APNS for company confidential information
- Do not store your certificates in an accessible location on the web server. Password protect it for additional security
- Store the device tokens safely on the server side, or users will be very upset if its compromised
- It’s a good practice not to update information in the push notification handler code, since it may trigger updates without the user’s knowledge
That’s all for now. Enjoy!
