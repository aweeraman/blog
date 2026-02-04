---
title: "Linux on the Desktop: a cautionary tale of distributions, GPUs and encrypted filesystems"
date: "2019-09-27"
path: "/linux-on-the-desktop-a-cautionary-tale-of-distributions-gpus-and-encrypted-filesystems"
excerpt: "In the last 24 hours, I have been experimenting with this interestingly named and absolutely gorgeous Linux distribution called Pop!_OS by System76. An Ubuntu derivative, it features an extremely polished user experience and I was taken aback by its aesthetic and charming simplicity, which led me to some comparisons, quite unfairly with Debian."
feature_image: "/images/linux-on-the-desktop-a-cautionary-tale-of-distributions-gpus-and-encrypted-filesystems/linux-desktop-operating-system.jpg"
---

In the last 24 hours, I have been experimenting with this interestingly named and absolutely gorgeous Linux distribution called Pop!_OS by [System76](https://system76.com/) (a maker of Linux-friendly hardware). An Ubuntu derivative, it features an extremely polished user experience and I was taken aback by its aesthetic and charming simplicity, which led me to some comparisons, quite unfairly with Debian.

I first started using Debian back in 2000, when I got a few CDs of Debian 2.2 (the “Potato” release) from my good friend and namesake [Anuradha Ratnaweera](https://www.sayura.net/anuradha/). It was a time when distributions were passed around like joints in a tight circle of like-minded hipsters and rebels for whom Linux was the gateway drug to the expansive world of Unix, Free software and activism.

Debian has always been and will continue to be the uber-distribution. With hundreds of offshoots, it is a testament to its longevity, and the excellent foundation that it has built over the years. There was a period of time about ten years ago that I was actively contributing to Debian, but have since lapsed due to the time commitment needed. It was a fun time, special shout out to my Debian mentor [Niibe Yutaka](http://www.gniibe.org/).

![With Niibe at an FSF meetup at MIT, 2006.](/images/linux-on-the-desktop-a-cautionary-tale-of-distributions-gpus-and-encrypted-filesystems/fsf-meetup-mit-2006.jpg)

At the time, Debian had a stable curses installer, and installation meant pecking at the enter key about 20 times, enter a few details and passwords and you’re good to go — this was miles ahead of text mode installers. 20 years later, things haven’t changed much on this front for Debian. Enter Pop!_OS. While still based on Ubuntu, the whole design aesthetic is so much cleaner and elegant, required very little user input and before I knew it, the installation was done and I was dual-booting.

There used to be a time, when you install X, configure XF86Config by hand, run xinit, breathe a sigh of relief when you see the checkered background and decoration-less terminal and spend hours tweaking files, layering-in the right window manager, applets, backgrounds and themes until you have a desktop that you can truly be proud of and really call your own. No two desktops were alike. The process of getting an [Nvidia Optimus](https://wiki.debian.org/NvidiaGraphicsDrivers/Optimus) hardware setup on Debian, still feels a lot like those days, with Xorg configuration, xrandr, display managers requiring non-trivial time commitment to get things working on a dual-monitor setup the way you really want. This doesn’t take into account the myriad of ways this can be achieved through [Bumblebee](https://wiki.debian.org/Bumblebee), [nvidia-xrun](https://wiki.archlinux.org/index.php/Nvidia-xrun) and the like.

Pop!_OS (and Ubuntu as well for that matter) just works. I know it ain’t “Free”, yeah it uses blobs, and the kernel’s tainted, but the GPU does work, and power management is “better”, and I have two days back and can actually work rather than getting things to work. The activist in me would have balked at this ten years ago, but its a different time, and Free software is now the norm rather than the exception. There are still subtleties of “Freedom” and liberties that still concern and do matter, but for the most part, the battle is won.

But, as it is with all things, it’s not always that simple. For instance, while Pop! (I’ll just call it that) installs easily, its custom-mode installer doesn’t encrypt the root file system by default, nor is there an option to do so in 19.04. Sigh.

But here’s what I discovered. If you give Pop! a pre-encrypted root filesystem, it will happily mount it, install itself and upon booting, exit into an initrd shell when it fails to find root. To get around this, use the Pop! live distro on USB, and perform the following to get Pop! to boot with the encrypted filesystem. I had some help from [this link right here](https://support.system76.com/articles/bootloader/):

```
$ sudo bash
```
Cos I hate repeating myself and I never liked ‘su’ much.

```
# cryptsetup luksOpen /dev/nvmeXX cryptroot
# mount /dev/mapper/cryptroot /mnt
# mount /dev/nvmeYY /mnt/boot/efi
```
Yes, Pop! uses systemd-boot. LILO, Grub, and now systemd-boot. Still remember seeing LI and not LO and thinking “wtf just happened”, but it was a simpler time and troubleshooting was easier, better addressed in a different rant.

Next, mount the myriad of virtual filesystems and chroot into the rootfs:

```
# for i in /dev /dev/pts /proc /sys /run; do sudo mount -B $i /mnt$i; done
# chroot /mnt
```
Setup /etc/crypttab with the encrypted partitions:

```
cryptroot UUID=<UUID> none cipher=aes-xts-plain64,size=256,hash=sha1
crypthome UUID=<UUID> none cipher=aes-xts-plain64,size=256,hash=sha1
cryptswap UUID=<UUID> /dev/urandom swap,offset=1024,cipher=aes-xts-plain64,size=512
```
Configure /etc/fstab:

```
/dev/mapper/cryptswap none swap  defaults 0 0
/dev/mapper/crypthome /home ext4 noatime,errors=remount-ro 0 0
/dev/mapper/cryptroot / ext4  noatime,errors=remount-ro 0 0
```
Update /etc/initramfs-tools/conf.d/cryptroot:

```
target=cryptroot,source=/dev/nvmeX
```
Update the initrd and install systemd-boot in to the EFI system partition:

```
# update-initramfs -c -k all
# exit
# bootctl --path=/mnt/boot/efi install
```
With this in place, reboot and systemd-boot should unceremoniously request your input to unlock the encrypted disks and assuming you got all the UUIDs right, launch the Pop! desktop and request you to create a non-root user. Yes, Pop! does this after installation and not during installation.

It so happened that I did a software update afterwards and it once again dropped me into an initrd shell from where I had to crawl out and figure out that a new kernel had messed up the boot. I wondered why the triggers or hooks didn’t recreate the initrd and setup the bootloader when it did, but oh well, I went through the above process again to update-initramfs followed by bootctl and I was off to the races again.

For the record, I still do have a soft spot for Debian. Distros will come and go, but I believe Debian’s in it for the long haul, and while it may not be zippy and flashy like the new kids in town, its the ever reliable. If you’re running a server or anything mission critical, look no further than Debian stable. On the desktop however, Pop! is a good contender, or Debian unstable if you’re so inclined, or both, as I do.
