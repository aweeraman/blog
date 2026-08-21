---
title: "Plan 9 from Bell Labs, the little OS that could"
date: "2026-08-04"
path: "/plan-9-from-bell-labs-the-little-os-that-could"
excerpt: "Plan 9 lost as a product but won as a set of ideas, leaving a mark on modern operating systems far greater than its current user base suggests."
feature_image: "/images/plan-9-from-bell-labs-the-little-os-that-could/plan-9-rio.png"
feature_image_alt: "Plan 9 Fourth Edition showing the rio windowing system"
feature_image_attribution: "Screenshot by VulcanSphere via Wikimedia Commons"
feature_image_attribution_url: "https://commons.wikimedia.org/wiki/File:Plan_9_Fourth_Edition_rio_interaction_screenshot.png"
feature_image_license: "MIT License"
feature_image_license_url: "https://opensource.org/license/mit"
featured: true
tags: [opensource]
---

I first heard of [Plan 9](https://p9f.org/sys/doc/9.html) from my friend [Vajra](https://vajra.me) in 1999 or so, as we were distro-hopping on early Linux distributions and trying to find our way. Vajra is now a Nebula Award-winning science fiction author - have a look at his work. We had just been through [Tom's Root Boot](https://en.wikipedia.org/wiki/Tomsrtbt), a UNIX-like operating system crammed into a single floppy, and through it discovered a whole new world outside of DOS 6.22. Combing through old UNIX manuals, we went in search of the perfect OS, through Slackware, Caldera, TurboLinux, SUSE and Red Hat. I finally settled on Debian, which lived up to everything I stood for.

Plan 9 was distinct. It came out of the Computing Sciences Research Center at Bell Labs, built by Rob Pike, Ken Thompson, Dave Presotto and Phil Winterbottom, with Dennis Ritchie heading the department. The name is a joke at their own expense, borrowed from Ed Wood's 1959 _Plan 9 from Outer Space_, routinely nominated as the worst film ever made. Thompson and Ritchie had, of course, built the original UNIX; it almost seemed as if they were building a new OS from the lessons learnt from building it - which was in turn built on the lessons from Multics. I remember the awe I felt playing around with Plan 9, and I've not been able to replicate it since.

Plan 9 was different in a couple of fundamental ways: per-process namespaces, and a protocol that abstracted locality of resources to processes. As a consequence of these core primitives, the OS surface area was distinctly small. The entire system from the core kernel, to the system call interface, to the compiler, linker and shell was reduced to a form small enough that a single developer could hold it in their head. Lessons from the implementation of UNIX helped the designers make the system leaner, and in Ken Thompson's words, it's the "best operating system out except that it doesn't have the apps that everybody demands" [[1]](https://www.youtube.com/watch?v=EoYUZtZl02g).

It also took the concept of "everything is a file" in UNIX to a whole new level. The network stack is a filesystem (`/net`), processes are files, the display is a file (`/dev/draw`). Because every resource speaks 9P and every process has its own namespace, you can mount another machine's `/net` into your namespace and your program makes network calls through that machine's stack without knowing or caring. No sockets API, no RPC layer, just ordinary file system operations through a simple system call interface.

Some would say that OS research is dead, and that backwards-compatibility and POSIX killed it. Rob Pike himself argued as much in his 2000 talk, "Systems Software Research is Irrelevant" - but we didn't care at the time. There was so much happening that we didn't have time to take it all in. And then Linux happened, and Software Freedom became a focal point (more on that in a later post).

In the summer of 2020, with the world deep in Covid lockdowns, I decided to build a toy operating system, just to try my hand at the the thing that I had always wanted to do. I spent three feverish months working on [Odyssey](https://github.com/aweeraman/odyssey) and, looking back, it is perhaps the most fun I have ever had. I would not dare compare it to the magnum opus that is Plan 9, but it gave me perspective: how hard it is to build an OS from scratch, and above all, how *fun* it is to build an OS from scratch, and why the original creators kept coming back to the same problem. The highlight of those three months was booting the OS and watching it render "The Great Wave off Kanagawa". Nothing in my professional achievements to date captures what that meant to me.

<figure>
  <img src="/images/plan-9-from-bell-labs-the-little-os-that-could/odyssey-splash.png" alt="Odyssey rendering The Great Wave off Kanagawa during boot" />
  <figcaption>Odyssey displaying "The Great Wave Off Kanagawa"</figcaption>
</figure>

Decades on from the first time I booted Plan 9, I look back with nothing but awe and respect for the creators of this little operating system and marvel at the foresight that went into it. While many readers will not have heard of Plan 9, they have almost certainly worked with the ideas that came from it: 9P (if you ever used the Windows Subsystem for Linux), UTF-8 (if you ever used any modern operating system), per-process namespaces (if you've ever run a container), Go (whose assembler still uses Plan 9 syntax).

Plan 9 still lives on in [9front](https://9front.org/), a community-maintained fork. Separately, Yoann Padioleau [[2]](https://www.youtube.com/watch?v=blVTDhr4QN8) has produced a set of annotated books at [principia-softwarica.org](https://principia-softwarica.org/), presenting the Plan 9 source in the spirit of Donald Knuth's literate programming - an admirable effort to introduce new readers to the art of operating systems engineering.

Pike thought systems research had become irrelevant, and Thompson thought Plan 9 would never "make it" [[1]](https://www.youtube.com/watch?v=EoYUZtZl02g). Both were right about the industry, but may have been pessimistic about the impact. The system lost as a product but won as a set of ideas, assimilated one at a time by modern operating systems. Success is not always measured by popularity. The mark that Plan 9 left behind is greater than what's reflected in its current user base.

To me, Plan 9 will always be the OS that punched above its weight class, the little OS that could.

## References

[1] [Ken Thompson Interview, March 6, 2024](https://www.youtube.com/watch?v=EoYUZtZl02g)

[2] [Yoann Padioleau — Principia Softwarica, May 9, 2026](https://www.youtube.com/watch?v=blVTDhr4QN8)
