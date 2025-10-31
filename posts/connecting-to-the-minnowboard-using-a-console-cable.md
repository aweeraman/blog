---
title: "Connecting to the Minnowboard over Serial"
date: "2019-03-17"
path: "/connecting-to-the-minnowboard-using-a-console-cable"
excerpt: "In this post, I will walk you through the process of connecting to a Minnowboard over a serial console connection, so that you can use it…"
feature_image: "https://images.unsplash.com/photo-1475903057958-80a11c1f01d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDV8fG1pbm5vd3xlbnwwfHx8fDE3MTExMjkyMDJ8MA&ixlib=rb-4.0.3&q=80&w=2000"
---

In this post, I will walk you through the process of connecting to a [Minnowboard](https://minnowboard.org/) over a serial console connection, so that you can use it without having to hook up a monitor or keyboard. For those of you that may be new to Minnowboards, they are single board computers that fall into the niche segment of SBCs that are based on Intel x86 processors unlike the ARM processors that are prevalent in the vast majority of Raspberry Pi and derivative single board computers out there. A few other alternatives in this category of boards are the [Latte Panda](https://www.lattepanda.com/) and the [Udoo](https://www.udoo.org/udoo-x86/).

![](/images/2024/03/minnowboard.png)

Minnowboards tend to be in the ~$200 price range on the high end, so not exactly in the price point of Raspberry Pi which is perfectly positioned for hobbyist and DIY work, but as I learnt, x86 SBC equivalents tend to be more expensive. This is compounded by the fact that Intel has discontinued its line of maker boards and chips, such as the Edison, Galileo and its Joule platform, cementing the chip giant’s loss on the war to ARM at the edge and in low power constrained environments.

Minnowboard themselves, seem to be pretty defunct at this point, and well on its way to follow Edison into the shadowy valley of single board computer death, so get your hands on one while you still can, particularly if you have an inclination to x86 and have issues with the proprietary Broadcom ecosystem and don’t want to spend $400 on the new Latte Panda. The eco-system is far from healthy, without much in the way of add-ons, extension boards, accessories or communities to speak of, so you’re pretty much on your own as far as I can see, but you my dear reader, do not need a support system. No, you will be fine. It’s x86 after all.

You can explore the components of the Minnowboard at the link below:

![](/images/2024/03/1-zglzsrlxk4ojv7ygjxwnpw.png)

*Source: [https://minnowboard.org/minnowboard-turbot/board-explorer](https://minnowboard.org/minnowboard-turbot/board-explorer)*

Just like the Raspberry Pi, you would need to connect it to a monitor using the mini-HDMI port available on the board, and a USB keyboard or mouse to begin using it. The operating system can be loaded on to a mico-SD card slot that it has available for the purpose of booting. Alternatively, you can connect to the board from a computer using a serial connection with a USB to Serial FTDI cable.

![](/images/2024/03/1-bnccb0wenj1gk6cq2se9xg-jpeg.jpg)

*Source: [https://www.amazon.com/gp/product/B00SK8LK1W/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1](https://www.amazon.com/gp/product/B00SK8LK1W/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1)*

For this example, we will be using Linux, specifically Arch Linux for the other computer that is used to connect to the Minnowboard, but the instructions should work just as well on any other distribution. As a first step, connect the FTDI cable to your host computer and take a look at the dmesg output to see what serial device is detected that you will need for subsequent steps.

```
$ dmesg | tail -n 9
[67533.445346] usb 1-1: new full-speed USB device number 7 using xhci_hcd
[67533.591778] usb 1-1: New USB device found, idVendor=0403, idProduct=6001, bcdDevice= 6.00
[67533.591821] usb 1-1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[67533.591826] usb 1-1: Product: FT232R USB UART
[67533.591830] usb 1-1: Manufacturer: FTDI
[67533.591834] usb 1-1: SerialNumber: AC01N551
[67533.597762] ftdi_sio 1-1:1.0: FTDI USB Serial Device converter detected
[67533.597819] usb 1-1: Detected FT232RL
[67533.598311] usb 1-1: FTDI USB Serial Device converter now attached to ttyUSB0
```
Most kernels should have FTDI support out of the box and should give you output similar to the above when the cable is connected. Based on the above output, the serial device that you will need to connect to is /dev/ttyUSB0.

Connect the other end of the cable to male jumper header on the board as shown in the photograph below with ground (Pin 1) as shown.

![](/images/2024/03/1-nvf2fy2s5w4gks9v_yi9cw-jpeg.jpg)

Prepare a micro-SD card with your operating system of choice. You can load up an image of Arch using the example below:

```
$ sudo dd if=archlinux-2019.03.01-x86_64.iso of=/dev/sdb bs=4M status=progress
616562688 bytes (617 MB, 588 MiB) copied, 3 s, 203 MB/s
150+1 records in
150+1 records out
631242752 bytes (631 MB, 602 MiB) copied, 18.435 s, 34.2 MB/s
```
Insert it into the SD-card slot on the board, and you should be ready to boot it up.

Pull up a terminal, and run the following command:

```
$ screen /dev/ttyUSB0 115200
```
The screen will be blank, until you power up the board.

The CPU fan will whir and spring into action and two blue LEDs, for power and CPU will light up and you should see the following on the terminal:

![](/images/2024/03/1-mge2p57xlkpg5bnxgxt8dq.png)

Hit <DEL> to enter setup.

![](/images/2024/03/1-etempp5lh7pua5opvbriaw.png)

Enter the Boot Manager and select the Boot Device to boot into. You should see the GRUB boot menu for the distro. In a few seconds it will automatically start to boot the OS, but before that, hit the ‘e’ key so that you see the parameters that are being passed into the kernel at the bottom of the screen:

![](/images/2024/03/1-fim3t4etho8le7hfivhyna.png)

Enter the the following string at the beginning of the line:

```
console=ttyS0,115200n8
```
so that you see something like this on the screen:

![](/images/2024/03/1-t9urmfti9m2gldqbowepvg.png)

and press Enter.

![](/images/2024/03/1-hjzrx7o9xyzph48tjeidla.png)

You will now begin to see messages indicating that the system is booting and finally see the login prompt, where you can use the system as you like.

![](/images/2024/03/1-9t4toylr5tfulxztymhscq.png)

Let me de-construct the argument that was passed into the kernel “console=ttyS0,115200n8” so that it’s clear what just happened. Without this argument, you will not see anything shown on your “screen” output. Screen is a CLI application available in most distros by default, and if not, can be installed quite easily with the distro-specific package managers available. Screen will interface with the serial port and communicate with the board over [TTL-232 serial communications](https://www.sparkfun.com/tutorials/215). Any key presses will be sent down the wire, and any output will be received and displayed on the screen, just as if you are connected to the board using a keyboard. By passing this argument to the kernel in the GRUB menu, we are instructing the kernel to use serial driver for the console communications with a baud rate of 115200 (which must match what you use on the host end when invoking the screen command). It also uses no parity bits, designated by the ’n’ and an 8-bit data payload in each frame.

![](/images/2024/03/0-2j4rzyes0_fknn7_.png)

This combination of baud rate, data size, parity bit and in some cases the stop bit form the parameters of the connection that both ends of the serial connection must match in order to establish the connection successfully. In this case its 115200 bps, 8 bits of data, NO parity bit, 1 stop bit. If you run into trouble in establishing a serial connection, or see random characters instead of proper console output, validate these settings and confirm that both ends of the serial connection are using the same settings.

To conclude, there’s one more thing you need to know, and that his how to exit screen. The magical key combination that you need to invoke is CTRL-a, followed by ‘\’ (back-slash) and enter ‘y’ at the prompt. Without this little tidbit of information, it’s quite possible to get stuck in the land of screen with nowhere else to go, just like all those beginning vi and Emacs users.

You should now be all set to hacking on the Minnowboard!
