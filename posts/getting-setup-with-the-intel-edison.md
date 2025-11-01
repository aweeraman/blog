---
title: "Getting setup with the Intel Edison"
date: "2015-10-03"
path: "/getting-setup-with-the-intel-edison"
excerpt: "Intel Edison is an adorable little system on a chip packed with all the wireless and processing capabilities to build wearables and smart things. It features a dual-core Intel Atom processor at 500 MHz, integrated Bluetooth 4 and wifi, USB controllers, 1GB of RAM and 4GB of eMMC flash memory, all in a tiny package."
feature_image: "/images/intel-edison-cover.jpg"
---

Intel Edison is an adorable little system on a chip packed with all the wireless and processing capabilities to build wearables and smart things. It features a dual-core Intel Atom processor @ 500 MHz, integrated Bluetooth 4 and wifi, USB controllers, 1GB of RAM and 4GB of eMMC flash memory, all in a tiny package. It also features a 32-bit onboard Intel Quark @ 100MHz that can be used as a micro-controller. Unlike the Raspberry Pi, it has no video output capabilities however. It runs Linux, specifically, [Yocto Linux](https://www.yoctoproject.org/) that is especially targetted for embedded systems.

If you’re interested in getting to know the Edison, I suggest purchasing a kit such as the [Xadow wearable kit for the Intel Edison](http://www.seeedstudio.com/depot/Xadow-Wearable-Kit-For-Intel-Edison-p-2428.html), which comes with a bunch of sensors and modules that you can use to build some useful applications. It comes with:

- mini expansion board (a much smaller alternative to the Arduino expansion board),
- barometer
- 0.96" OLED
- vibration motor
- NFC sensor with 3 programmable tags
- a touch sensor
- 3-axis accelerometer
- buzzer
- SD card module
- breakout board
- Li-Po battery
- LED strip
- FFC and power cables
All in all, a fairly comprehensive set of modules for a hobbyist connected device or wearables project. The kit does NOT include the Edison itself, which needs to be [purchased separately](http://www.seeedstudio.com/depot/Intel-Edison-p-2150.html). The folks at SparkFun has created a [stackable set of “blocks”](https://www.sparkfun.com/products/13095) that can be used to build small form factor devices in a quite ingenious manner.

Fun fact: the Edison is powered by 3.3 to 4.5v and supports 40 GPIO pins that use 1.8v logic.

Step 1: To get started, take out the Xadow expansion board from the kit. It features a 70-pin hirose connector on the back where the Edison can be attached.

![Expansion board and edison](/images/intel-edison-expansion-board.jpg)

Step 2: Place the Edison on top and press until you hear a click. You should then have a fairly firmly attached Edison to the Xadow expansion board.

![Edison attached to expansion board](/images/intel-edison-attached.jpg)

Step 3: Take the Xadow programmer module and a FFC (Flat Flexible Connector) cable from kit, flip open the connector locks on both the programmer module and expansion board. Place the FFC connector as shown below and close the connector lock to keep it in place. It should now look a little like what you see below. Flip the switch that’s highlighted in the red circle to the right, towards the “Device” label indicated by the arrow.

![Programmer module and expansion board](/images/intel-edison-programmer-module.jpg)

Step 4: Connect two micro-USB cables to the connectors on the programmer module and the other end to the computer. This should power up the Edison.

Step 5: Head over to Intel to [download and install the IoT Developer Kit](https://software.intel.com/en-us/iot/hardware/edison/downloads) for your operating system. As part of the installation process, it will flash your Edison with Yocto. I’ll be covering the flashing process and Yocto in a little bit more detail in a later post, but for now, let Intel do the magic for you.

Step 6: Your Edison should be mostly setup now. There’s one last thing you may want to do, which is configure it to connect to your home wifi. You should see the boards all lit up by now:

![Edison all set](/images/intel-edison-all-connected.jpg)

At this point, the only way to connect it to is via a serial connection made possible through the USB port by FTDI drivers installed with the IoT developer kit. In fact, on the mac, you should see a device such as */dev/cu.usbserial-** which will be used to initiate this serial connection.

To get a shell on the Edison, just run:

```
screen /dev/cu.usbserial-DA00ZEOX 115200 -L
```
Which will initiate a serial connection to the Edison at a baud rate of 115200. Press RETURN a couple times and you should see something like this:

```
Poky (Yocto Project Reference Distro) 1.6 edison ttyMFD2
edison login:
```

Enter 'root' for the login and you'll be dropped into a root shell on the Edison. By default it does not have a password. You may also notice that the first character that you type is lost in some occasions. This is due to the Edison being on low power mode at the time that causes the first character to be lost, before it spins up the device.

One thing to note is that exiting a 'screen' session is not as straightforward as a telnet or ssh session. You will need to type CTRL-a followed by CTRL-\ to get a prompt to exit the session.

Finally, to configure wifi on the Edison, run configure_edision --wifi command:

```
Configure Edison: WiFi Connection
Scanning: 1 seconds left
0 :     Rescan for networks
1 :     Manually input a hidden SSID
2 :     ZTE
3 :     ninsei
Enter 0 to rescan for networks.
Enter 1 to input a hidden network SSID.
Enter a number between 2 to 3 to choose one of the listed network SSIDs: 3
Is ninsei correct? [Y or N]: y
What is the network password?:********
Initiating connection to ninsei...
Done. Network access should be available shortly, please check 'wpa_cli status'.
Connected. Please go to 192.168.1.3 in your browser to check if this is correct.
root@edison:~# ping google.com
PING google.com (222.165.163.20): 56 data bytes
64 bytes from 222.165.163.20: seq=0 ttl=58 time=32.917 ms
^C
--- google.com ping statistics ---
1 packets transmitted, 1 packets received, 0% packet loss
round-trip min/avg/max = 32.917/32.917/32.917 ms
root@edison:~#
```

This allows you to ssh into your Edison over wifi using:

```
ssh root@192.168.1.3
```

And you're all set. Yocto comes preloaded with Node and gcc, so now you have in your hands a network enabled system on a chip for building that next great smart device.
