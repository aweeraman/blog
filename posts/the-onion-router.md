---
title: "The Onion Router"
date: "2006-03-14"
path: "/the-onion-router"
excerpt: "I recently tried out TOR for the first time as this has been something in my TODO list for a while. It was just a matter of apt-get install tor privoxy."
feature_image: "/images/onion-router-tor.jpg"
---

I recently tried out TOR for the first time as this has been something in my TODO list for a while. It was just a matter of

```
apt-get install tor privoxy
```

Adding the following line in /etc/privoxy/config

```
forward-socks4a / localhost:9050 .
```
And starting the tor and privoxy services. Next, setup your applications to use tor and privoxy to proxy your connections and route it through the tor networks, effectively hiding your trails and stripping HTTP header information that could be used to track you. The latter is handled by privoxy.

Tor provides a socks proxy that listens on port 9050 and privoxy is a filtering web proxy listening on port 8118 that can be used by your web browser. Privoxy routes the HTTP traffic through tor and handles DNS requests securely. Using plain old socks through tor for HTTP browsing is not very effective because DNS requests can leak, and blow your cover. Enter privoxy.

If you’re using lynx, you can configure it to use privoxy by setting the http_proxy environment variable to “http://localhost:8118". Wget and curl can also be configured this way. If you’re not sure, set both http_proxy and HTTP_PROXY variables and your http client should hopefully use either.

On firefox, the proxy settings are available in preferences, connection settings. Set all proxies to localhost on port 8118 and select SOCKS v4. There’s also a neat firefox plugin called [SwitchProxy ](https://addons.mozilla.org/extensions/moreinfo.php?application=firefox&id=125)that can be used to easily torify your browsing experience.

Once you’re connected to tor networks, visit [this link](http://serifos.eecs.harvard.edu/cgi-bin/ipaddr.pl?tor=1) to verify whether you really ARE anonymous. It will recognize whether your traffic is coming from a recognized tor exit node.

The only gotcha at the moment is that only tools capable of using SOCKS and HTTP is capable of anonymizing your traffic through tor, the rest is routed normally through more insecure channels. This problem can be easily subverted using tools such as socat, which having discovered it recently, I think is a very powerful tool which can be used for a wide range of applications. Think netcat for sockets. More on that in a later rant.
