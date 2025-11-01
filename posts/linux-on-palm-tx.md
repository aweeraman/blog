---
title: "Linux on Palm TX"
date: "2008-03-03"
path: "/linux-on-palm-tx"
excerpt: "Here are the steps to get Linux running on a Palm TX. For the approach described, you'll need an SD card, an SD card reader and a Palm TX that you can hopefully live without."
feature_image: "/images/linux-on-palm-tx/palm-handheld-device.jpg"
---

[Here](http://www.handhelds.org/moin/moin.cgi/PalmTXBinaryHowTo) are the steps to get Linux running on a Palm TX. For the approach described, you’ll need an SD card, an SD card reader and a Palm TX that you can hopefully live without. Remember, backup the handheld using a tool such as [JPilot](http://www.jpilot.org/). It’s really quite simple and you’ll thank yourself later.

For the impatient, here’s the list of steps to get you up and running:

- Mount the SD card on your Linux desktop

- Extract [tx-bootbundle-20060813.tar.gz](http://projects.linuxtogo.org/frs/?group_id=15&release_id=4) to a temporary location

- Copy `linux.boot.cfg` to the SD card

- Copy `garux.prc` to Palm/Launcher on the SD card

- Download the root image with your choice of environment

[GPE](http://downloads.sourceforge.net/hackndev/gpe-image-v0.8.4-rc3-palmtx-0.0.2-rootfs.ext2.tar.gz?modtime=1155500677&big_mirror=0) — GTK+ widget toolkit/X Windows
[Opie](http://downloads.sourceforge.net/hackndev/opie-image-v0.8.4-rc3-palmtx-0.0.2-rootfs.ext2.tar.gz?modtime=1155500677&big_mirror=0) — a fork of [Qtopia](http://trolltech.com/products/qtopia/index.html) developed by Trolltech

The links for the root images above are for version 0.8.4-RC3 of the [Familiar distribution](http://familiar.handhelds.org/) and are somewhat dated.

- Copy the root image(s) to the SD card

- Create 32M swap file in SD card

```bash
dd if=/dev/zero of=swap.fs bs=1k count=32k
mkswap swap.fs
```

- Edit `linux.boot.cfg` and uncomment the line with the root image that you wish to boot

- Uncomment the following line

```
SWAP_DEV=/media/mmc1/swap.fs
```

- Unmount SD card, giving it ample time to flush its buffers

- Pop the card in the Palm TX

- Tap on “Garux” and you’re ready to boot Linux

[Garux](http://garux.sourceforge.net/) is a loadlin-style bootloader that unloads the Palm OS from memory and boots Linux. PalmOS will still be present in ROM so a reset of the handheld will boot the device back into PalmOS. Because of the way PalmOS works, the Linux kernel is broken up into 64k chunks and rejoined at runtime. The kernel is embedded in Garux, and so a Garux image cannot be used to boot a kernel other than the version it was compiled for. [Cocoboot](http://sourceforge.net/project/showfiles.php?group_id=155828&package_id=236521) is a newer bootloader that can be used to boot any supported kernel. To setup Cocoboot, simply follow the additional steps:

- Copy `zImage` to the root of the SD card from the tx-bootbundle

- Copy [`cocoboot-0.4`](http://downloads.sourceforge.net/hackndev/cocoboot-0.4.prc?modtime=1184790475&big_mirror=0) to Palm/Launcher of the SD card

- Start the cocoboot application from the handheld and follow the steps

Next week, Linux powered toaster.
