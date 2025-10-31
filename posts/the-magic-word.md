---
title: "The Magic Word"
date: "2006-08-08"
path: "/posts/the-magic-word"
excerpt: ""
feature_image: "https://images.unsplash.com/photo-1498019559366-a1cbd07b5160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE0fHxtYWdpY3xlbnwwfHx8fDE3MTEyMTQ5MDd8MA&ixlib=rb-4.0.3&q=80&w=2000"
---

Once in every three years or so, I fire up an editor that I can’t exit.

First it was vi, many many moons ago.

Then came emacs. Ctrl-x, Ctrl-c was the LAST thing on my mind.

I’ve been working with z/OS for a while now and never had the opportunity to play around much. Being mostly restricted to USS (UNIX System Services) that offers a friendly UNIX shell, hiding the arcane operating system beneath, I haven’t really had the opportunity to mess things up much. As anyone who likes to play around with new operating systems would tell you: that’s no way to learn.

The last couple of days have been spent dipping my feet in TSO, [taking notes feverishly](http://anuradha.files.wordpress.com/2006/08/zos_tsoe_primer.txt), and throwing commands at it, sometimes with no real idea of what it does. Somewhere down the line I happened to type EDIT.

Before long, it was evident that I had stumbled upon an editor that I didn’t know how to exit.

And so the usual panic ensued. After many failed attempts, broken-spirited, I resorted to google. Several queries later, hidden deep in google groups, I stumbled upon [exactly what I needed](http://groups.google.lk/group/bit.listserv.ibm-main/msg/7b89552a10af700e?dmode=source).

The magic word was END!

not :wq. 

not Ctrl-x Ctrl-c. 

END!!!

```
EDIT car
 ENTER DATA SET TYPE-
TEXT
 DATA SET OR MEMBER NOT FOUND, ASSUMED TO BE NEW
 INPUT
 00010 Dude, where's my car?
 00020
 EDIT
SAVE
 EDIT
END
 READY
```
