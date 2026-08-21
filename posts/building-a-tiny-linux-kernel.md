---
title: "Building a tiny Linux kernel"
date: "2020-03-09"
path: "/building-a-tiny-linux-kernel"
excerpt: "Today we will go over the process of building a tiny Linux kernel, and booting into a shell. To start with, fetch the Linux source tree that you'd like to try this out on."
feature_image: "/images/building-a-tiny-linux-kernel/tiny-minimal-linux.jpg"
tags: [opensource]
---

Today we will go over the process of building a tiny Linux kernel, and booting into a shell. To start with, fetch the Linux source tree that you’d like to try this out on. I’m using staging tree for this post. You can get it here:

```
$ git clone git://git.kernel.org/pub/scm/linux/kernel/git/gregkh/staging.git
```
To get an initial config that’s very minimalist:

```
$ make tinyconfig
```
Here’s a comparison of the config options enabled by tinyconfig to a stock kernel that come with my Debian distribution:

```
$ grep "=y" .config | wc -l
247
$ grep "=m" .config | wc -l
0
$ grep "=y" /boot/config-5.4.0-4-amd64 | wc -l
2071
$ grep "=m" /boot/config-5.4.0-4-amd64 | wc -l
3401
```
Let’s try to build it:

```
$ time make -j16
scripts/kconfig/conf  --syncconfig Kconfig
  SYSTBL  arch/x86/include/generated/asm/syscalls_32.h
  SYSHDR  arch/x86/include/generated/uapi/asm/unistd_32.h
  SYSHDR  arch/x86/include/generated/uapi/asm/unistd_64.h
  SYSHDR  arch/x86/include/generated/uapi/asm/unistd_x32.h
  WRAP    arch/x86/include/generated/uapi/asm/bpf_perf_event.h
.
.
.
.
Setup is 13788 bytes (padded to 13824 bytes).
System is 417 kB
CRC 435fb428
Kernel: arch/x86/boot/bzImage is ready  (#1)real 0m15.468s
user 2m12.094s
sys 0m14.603s
```
The kernel builds to around ~430k. This is a 32-bit kernel by default, so let’s enable 64-bit support:

```
$ make menuconfig
```

![](/images/building-a-tiny-linux-kernel/kernel-menuconfig-64bit.png)

Enable the TTY for console support:

![](/images/building-a-tiny-linux-kernel/kernel-menuconfig-tty.png)

and support for printk to see console output as the kernel boots:

![](/images/building-a-tiny-linux-kernel/kernel-menuconfig-printk.png)

Build again:

```
Setup is 13596 bytes (padded to 13824 bytes).
System is 737 kB
CRC d273f4d
Kernel: arch/x86/boot/bzImage is ready  (#4)real 0m6.045s
user 0m40.808s
sys 0m3.958s
```
The size has gone up somewhat, nearly double what we started off with. If you’re only supporting a serial interface, even this additional bloat can be avoided to keep the size of the image down.

Boot the kernel with qemu:

```
$ qemu-system-x86_64 -kernel arch/x86/boot/bzImage
```

![](/images/building-a-tiny-linux-kernel/kernel-boot-panic.png)

The kernel boots and panics when attempting to start init, as expected. In order to boot into a shell as we originally set out to do, we will need a filesystem and a shell that can be started by the kernel as PID 1. Let us create a bare bones ram disk image that we can use to boot into a minimal busybox shell.

There are plenty of ways to achieve this, and here’s just one way:

```
$ git clone git@github.com:aweeraman/kernel-utils.git
$ kernel-utils/create-initrd.sh 
Creating initrd filesystem... ok
Building dependencies... 
Cloning into 'busybox'...
remote: Enumerating objects: 29, done.
remote: Counting objects: 100% (29/29), done.
remote: Compressing objects: 100% (23/23), done.
remote: Total 110424 (delta 16), reused 14 (delta 6), pack-reused 110395
Receiving objects: 100% (110424/110424), 37.05 MiB | 5.40 MiB/s, done.
Resolving deltas: 100% (87061/87061), done.
Building initrd... 4882 blocks
```
Before we can use this ram disk, we need to enable init RAM disk (initrd) support in the kernel:

![](/images/building-a-tiny-linux-kernel/kernel-menuconfig-initrd.png)

I have only included support for gzip compression and disabled the rest.

We will also need to enable ELF-support to be able to start up the shell:

![](/images/building-a-tiny-linux-kernel/kernel-menuconfig-elf-support.png)

This time, when booting the kernel, pass in the -initrd argument and specify the initrd image that we created earlier, in addition to an argument to the kernel to specify the binary that it should look for in the ram disk and execute once the kernel has finished booting, which is in this case is ‘/bin/sh’.

```
$ qemu-system-x86_64 -kernel arch/x86/boot/bzImage -initrd kernel-utils/initramfs.cpio.gz -append "init=/bin/sh"
```
And we have a shell.

Let’s enable the /proc filesystem so we can run some standard commands:

![](/images/building-a-tiny-linux-kernel/kernel-menuconfig-proc-filesystem.png)

Mount the proc file system after booting, so you can use commands like ‘ps’ and ‘free’:

![](/images/building-a-tiny-linux-kernel/kernel-shell-proc-mounted.png)

Here’s the size of the kernel that we just built:

```
Setup is 13788 bytes (padded to 13824 bytes).
System is 793 kB
```
Note that this is the size of the compressed kernel on disk and the actual memory used at boot time is comparable to the size of the generated vmlinux file, which in this case is 12MB. You would need at least that much memory to load the kernel into memory, plus 8–16MB additionally for the user space. Here’s the minimum memory configuration that allowed me to boot this kernel in qemu:

```
$ qemu-system-x86_64 -kernel arch/x86/boot/bzImage -initrd kernel-utils/initramfs.cpio.gz -append "init=/bin/sh" -m 29M
```
Just for kicks, I disabled printk and booted up the kernel, that put me into a shell almost immediately:

![](/images/building-a-tiny-linux-kernel/kernel-boot-instant-shell.png)

Finally, the compressed kernel size comes down to:

```
Setup is 13788 bytes (padded to 13824 bytes).
System is 749 kB
```
