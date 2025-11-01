---
title: "Musings on Git"
date: "2012-12-31"
path: "/musings-on-git"
excerpt: "Having spent some quality time with Git over the holidays, my appreciation for the flexibility of this DVCS and the elegance with which it has been constructed has reached a state of awe."
feature_image: "/images/version-control-dvcs.jpg"
---

Having spent some quality time with [Git](http://git-scm.com/) over the holidays, my appreciation for the flexibility of this DVCS and the elegance with which it has been constructed has reached a state of awe. I remember following the BitKeeper debacle of 2005 on Kernel Traffic that spawned the project that would turn out to be git, and wondering why Linus would even think of going off on a tangent and building a VCS. I’m thankful that he did.

In a mail to the LKML, Linus mentions:

So I’m writing some scripts to try to track things a whole lot faster. Initial indications are that I should be able to do it almost as quickly as I can just apply the patch, but quite frankly, I’m at most half done, and if I hit a snag maybe that’s not true at all. Anyway, the reason I can do it quickly is that my scripts will not be an SCM, they’ll be a very specific “log Linus’ state” kind of thing. That will make the linear patch merge a lot more time-efficient, and thus possible.What I find interesting is his statement that “my scripts will not be an SCM” sounds a lot like [“won’t be big and professional like gnu”](https://groups.google.com/forum/?fromgroups=#!topic/comp.os.minix/dlNtH7RRrGA) in an earlier mail to a different crowd. Pay attention when hackers sound humble and self deprecating. It’ll be easy to spot, since they’re not most of the time. I kid, of course.

Having hacked on Linux for a long time, I believe Linus really enjoyed taking a break and doing something different, and [in this talk](http://www.youtube.com/watch?v=MShbP3OpASA), it’s clear that he was quite proud of his creation. It’s also very clear that the entire system was thought up by a kernel hacker from the focus on making the system fast and efficient, not to mention being able to do a “fsck” on the git repository also shows which analogies were drawn in designing git.

Managing kernel contribution is a difficult process, and with over 1000 contributors to each kernel release makes it one of the most prolific open source projects in history. The benevolent dictator and the [governance structure](http://p2pfoundation.net/Linux_-_Governance#George_Dafermos_on_the_four-fold_structure) that he’s laid out for the kernel over the years seems to be able to manage this complexity and scale efficiently. Git has played a major part of this success and I expect will continue to do so in the coming years.
