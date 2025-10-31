---
title: "Quilt"
date: "2006-09-29"
path: "/quilt"
excerpt: ""
feature_image: "https://images.unsplash.com/photo-1594526761005-4ccdbd608d2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fHF1aWx0fGVufDB8fHx8MTcxMTI5MDI0Mnww&ixlib=rb-4.0.3&q=80&w=2000"
---

Quilt is a great tool to maintain patchsets.

For those new to quilt, let me brief you on how it works.

If you take something like the kernel sources, you would eventually need to apply patches to give it functionality that has not made it to the official tree. Examples like suspend2, xen, bootsplash, drivers and all that other kernel goodness floating around. Sometimes different patchsets need to be applied and different branches of the source tree will need to be maintained. When applying patches manually, no record of the patches is kept (apart from the actual changes themselves) so its difficult to say which patches have been applied. Reverting patches can be tricky if they’re order dependent.

Here’s how you would use quilt to simplify this madness.

Simply make a** patches/** directory inside your kernel source tree, and dump all your patches in it. Create a** patches/series** file and list all your patches in the order that it should be applied. Once you’re done, back from the root of the kernel source tree, type ‘**quilt push -a**’. If everything applies cleanly you’re good to go. To see which patches have been applied ‘**quilt applied**’. To revert the last patch, ‘**quilt pop**’. To revert everything ‘**quilt pop -a**’. It’s really that simple. Quilt takes a stack oriented approach to patching which is extremely intuitive.

The patches can be kept elsewhere and symlinked from within the patches folder. That way you can maintain multiple kernel trees with different patchsets and a common repository with all your patches for easy maintenance.

Oh and updating a patch is a simple ‘**quilt refresh**’.

Happy patchin’.
