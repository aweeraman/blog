---
title: "Building Android from source"
date: "2016-05-15"
path: "/building-android-from-source"
excerpt: ""
feature_image: "/images/2024/03/1-p5nna6monwk97lcwjnw34a-jpeg.jpg"
---

Building Android from source seems like a daunting task at first, but it’s really not that hard. I’ll walk through the steps as simply as possible to get your first AOSP build running on your handset. This is a rite of passage for many, and guaranteed to give insights on the inner workings of Android. First, let’s do a few push-ups and jumping jacks to mentally and physically prepare for the journey, and at the end of it, you’d wonder why you even had to do that.

What you need:

- A 64-bit environment
- ~150 GB of disk space
- A working Linux installation (I use Debian, but take your pick). I suggest going with bare metal over virtual machines in the interest of sanity and general well being
- A decent broadband connection (to download a significant portion of the internet)
- Some time and patience
- A healthy belief in the supernatural, and their inevitable involvement in the building of large complex codebases
Everything you need to know about the process is [right here](http://source.android.com/source/index.html). Feel free to skimp through these docs first to get an overview of the entire process. What’s below is mostly a summary + a few things not explicitly mentioned that would stump the newbies.

**Step 1**

Prep your OS and install any dependencies. At the minimum you’re going to need java, python, C/C++, make, and git so make sure they’re installed using your favorite package manager. If you’re on Debian/Ubuntu, you’d run something similar to below:

```
sudo apt-get install openjdk-8-jdk git-core gnupg flex bison gperf build-essential zip curl zlib1g-dev gcc-multilib g++-multilib libc6-dev-i386 lib32ncurses5-dev x11proto-core-dev libx11-dev lib32z-dev ccache libgl1-mesa-dev libxml2-utils xsltproc unzip
```
If you find that you need something else down the line that’s not mentioned above, be a man/woman, and just apt-get it. Also, your package names may vary depending on your choice of distribution.

Run the commands manually to do a quick sanity test that things are installed properly.

**Step 2**

Linux may require some configuration to udev to allow non-root users to work with USB devices, which is going to be required later on, so execute this command:

```
wget -S -O - http://source.android.com/source/51-android.rules | sed "s/&lt;username&gt;/$USER/" | sudo tee &gt;/dev/null /etc/udev/rules.d/51-android.rules; sudo udevadm control --reload-rules
```
**Step 3 (Optional)**

Setup ccache to get extract some performance out of the build, by putting the following into your .bashrc:

```
export USE_CCACHE=1
export CCACHE_DIR=/path/to/empty/ccache/directory/where/cache/is/kept
```
Set the cache size to 50G using the following:

```
prebuilts/misc/linux-x86/ccache/ccache -M 50G
```
**Step 4**

The Android Open Source Project is a behemoth of a code base with multiple third party open source components and frameworks included such that it required its own layer on top of git just to manage the dependencies. That’s what **repo** is. On the positive side, it’s quite easy to get it working.

Download the repo tool to your ~/bin directory as follows:

```
$ curl https://storage.googleapis.com/git-repo-downloads/repo &gt; ~/bin/repo
$ chmod a+x ~/bin/repo
```
Make sure that ~/bin is in your $PATH. Type repo a few times and watch it barf in your face while saying:

```
error: repo is not installed.  Use "repo init" to install it here.
```
Do not fret, this is normal.

You see, you have to initialize repo and give it a manifest which will tell repo where to download the source from and help it initialize itself. You do this by navigating to an empty directory and executing:

```
repo init -u https://android.googlesource.com/platform/manifest
```
If you do not specify a branch name with -b parameter, it will fetch the master branch, which is what we’re going to do here.

You should now see an empty directory, apart from a .repo with the metadata that it downloaded from the manifest file. Now I’m assuming that you’re probably at home and do not have complicated proxy arrangements to get to the internet so I’m going to avoid talking about the HTTP_PROXY environment variable that you have to set if you do, but I guess it’s all redundant now that I’ve already said it, so I’m just going to move on:

```
repo sync
```
This will download the internet. This will run for an inordinate amount of time. A few things you can do while this executes:

- knit
- write a book
- have kids
- watch the poles melt
A rough approximation, and the internet is very divided on this topic, is that it will require anywhere from 12 to 15 GB which will automatically expand to around 34GB on disk after it’s downloaded. In my experience, I’ve only been awake till about the 13GB mark, so didn’t quite get to see the transformation to its final glory. Add 50GB for the ccache and with some room to spare and you see why you need a lot of disk space to go through this.

Now you wait.

**Step 5**

In my case, I needed to run the build on my Nexus 5. The AOSP source tree doesn’t have everything you need to build images specifically for Nexus 5, so I had to go to [this link](https://developers.google.com/android/nexus/drivers), scroll down to Nexus 5 and download the Broadcom, LG and Qualcomm binary blobs for the hardware on the Nexus 5. Put them in the root of the Android source tree, and execute it, where it self extracts. This is a needed step if you want to run the image on the device later on.

**Step 6**

Now comes the compilation step. This is actually the easiest part.

Initialize the build environment by sourcing a script, you can use the bash source command or the good old dot command — whatever strikes your fancy:. build/envsetup.sh

This will inject a bunch of build related environment variables to your current shell. Note that you have to run this in every shell that you want to run a build from.

Next…

```
lunch
```
This will give a list of targets and allow you to select one. In my case, I selected “aosp_hammerhead-userdebug”. Hammerhead being the code name for the Nexus 5.

One more step, and that’s to start the build.time make -j4

You could easily just say “make”, but I would like to know how long the build took when it eventually finished running, and with the -j4 flag indicate the concurrency level for make (rule of thumb: 2 x number of cores). Now you can go for lunch.

Things to do while this runs:

- Read Game of Thrones (all the books)
- Have a fabulous mid-life crisis
- Watch Lawrence of Arabia
To be fair, it’s not that bad, just a few hours depending on your setup.

**Step 7**

Once the building is done, you will have a bunch of files under out/target/product/{device} which you can now start flashing.

Connect your Android phone to the computer and assuming that all the drivers and Android SDK is setup (a dependency that I somehow failed to mention before), you should be able to run the following command:

```
adb reboot bootloader
```
This can also be achieved by shutting down the device and starting it while pressing a combination of buttons (such as volume down + power on the Nexus 5). This would put you into fastboot mode. On the fastboot screen, pay attention to whether the bootloader is locked or not, if it is, execute the following to unlock it:fastboot oem unlock

This would wipe the data on the device. To further clean things up, execute the following:

```
fastboot format cache
fastboot format userdata
```
**Step 8**

Navigate once again to the out/target/product/{device} directory and execute the following to flash the built images to the device:

```
fastboot flash boot boot.img
fastboot flash system system.img
fastboot flash userdata userdata.img
fastboot flash recovery recovery.img
```
Reboot the device and you’re all set.

This is just the tip of the iceberg, and hopefully you’ll be able to now play with the internals of Android to understand how things are really stitched together. Good luck on your journey.
