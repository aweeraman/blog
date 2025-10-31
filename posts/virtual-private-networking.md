---
title: "Virtual Private Networking"
date: "2006-03-20"
path: "/posts/virtual-private-networking"
excerpt: ""
feature_image: "https://images.unsplash.com/photo-1601898532125-bb05b244b90e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDV8fHZwbnxlbnwwfHx8fDE3MTEyOTE4OTR8MA&ixlib=rb-4.0.3&q=80&w=2000"
---

I’m sure most of you would have had to mess around with [VPN](http://en.wikipedia.org/wiki/Vpn)s at some point of your lives. Sometimes, VPNs can turn nasty and bind you to an OS that hinders your free spirit. But thanks to [IPSec](http://en.wikipedia.org/wiki/IPsec), that doesn’t always have to be the case. For instance, assuming your place of work has set up Cisco based VPN concentrators, connecting to it using Linux is quite simple with the help of vpnc. Cisco, being somewhat of an opensource friendly hardware manufacturer, has released their vpn client software for Linux as a free download so long as you use it with their products. vpnc on the other hand, is an opensource alternative, very easy to configure, and a delight to work with.

Once again, its just a matter of

```
apt-get install vpnc resolvconf
```
Then you need to add the following lines to /etc/vpn/vpnc.conf:

```
IPSec gateway XX.XX.XX.XX
IPSec ID MegaCorpNetwork
IPSec secret ThisIsAPlaintextPassword
Xauth username myuserid
```
The gateway is the IP Address of the VPN concentrator. If your trusty MIS department has already setup the Cisco VPN client on Windows (such as in a dual booting scenario in my case) you can extract this information from the profile file that gets created. It should reside somewhere in the neighbourhood of “Program Files”, under the Cisco VPN Client installation folder, and within the Profiles subdirectory. There’s one small caveat, the group password, that corresponds to the “IPSec secret” field in vpnc.conf, is usually “encrypted” on Windows. But have no fear, [for it can be undone](http://www.unix-ag.uni-kl.de/~massar/bin/cisco-decode). This is a well known flaw, and the group password encryption is practically redundant. I recommend that you download the C program and run it locally instead of using the form on the web page to decrypt it.

Once you have the plaintext, plug it into your vpn.conf.

Also, vpnc requires TUN/TAP device driver support in the kernel, but the good news is that it comes standard with most distributions. At least the ones I’ve tried out so far. If not:

```
modprobe tun
```
Failing which, you’d need to do a bit o’ kernel compilin’.

That out of the way, you’ll also need resolvconf to setup your /etc/resolv.conf so that you’ll be able resolve hostnames properly on the various networks you’re connected to. Later on, if you find out that your hostnames aren’t resolving, /etc/resolvconf/interface-order is probably a good place to start troubleshooting.

Depending on the version of vpnc you’re are using, you can connect to the vpn by either using vpnc, or vpnc-connect. Although I noticed that the latter has been deprecated in most recent versions, but the following should work no matter which version you use:

```
vpnc /etc/vpnc/vpnc.conf
```
If you have a static xauth password (which btw, is a very very bad idea) you could either hardcode it in vpnc.conf (again, bad idea) or have it prompted by not specifying in the config file as shown in the sample above. For added security, xauth authentication shouldn’t be relied upon solely, and should be complemented with some form of [two-factor authentication](http://en.wikipedia.org/wiki/Two_Factor_Authentication) for maximum security.

If all goes according to plan, you’ll be prompted with a legal disclaimer from the network you’re connecting to and all the routes will be automatically set up.

To log off from the vpn, simply issue vpnc-disconnect, and you’ll be back to where you started from.
