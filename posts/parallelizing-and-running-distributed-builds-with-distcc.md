---
title: "Parallelizing and running distributed builds with distcc"
date: "2023-01-08"
path: "/parallelizing-and-running-distributed-builds-with-distcc"
excerpt: "Parallelizing the compilation of a large codebase is a breeze with distcc, which allows you to spread the load across multiple nodes and speed up the compilation time."
feature_image: "/images/parallelizing-and-running-distributed-builds-with-distcc/workers-distributed-computing.jpg"
---

Parallelizing the compilation of a large codebase is a breeze with [distcc](https://www.distcc.org/), which allows you to spread the load across multiple nodes and speed up the compilation time.

Here’s a sample network topology for a distributed build:

![](/images/parallelizing-and-running-distributed-builds-with-distcc/distcc-network-topology.png)

Install distcc on the three Debian/Ubuntu-based nodes:

```sh
# apt install distcc
```
Edit /etc/default/distcc and set:

```sh
STARTDISTCC="true" 
 
# Customize for your environment 
ALLOWEDNETS="192.168.2.0/24" 
 
# Specify your network device 
LISTENER="192.168.2.146"
```
Additionally, the JOBS and NICE variables can be tweaked to suit the compute power that you have available.

Start distcc:

```sh
# systemctl start distcc
```
Do the same all the nodes, and if you have a firewall enabled with ufw, you will need to open up the port 3632 to the master node.

```sh
# ufw allow 3632/tcp
```
Additionally, if you’d like to use ssh over untrusted networks so code and communication with the worker nodes happen over a secure channel, ensure that SSH is running and is opened up to the master node in the same manner as above with the key of the master node in ~/.ssh/authorized_keys of the worker nodes. Opening port 3632 in this manner is a security hole, so take precautions over untrusted networks.

Back in the master node, setup a DISTCC_HOSTS environment variable that lists the worker nodes, including the master node. Note the order of the hosts, as it is important. The first host will be more heavily used, and distcc has no way of knowing the capacity and capability of the hosts, so specify the most powerful host first.

```sh
export DISTCC_HOSTS='localhost 192.168.2.107 192.168.2.91'
```
At this point, you’re ready to compile.

Go to your codebase, in this case we use the Linux kernel source code for the purpose of example.

```sh
$ make tinyconfig 
$ time make -j$(nproc) CC=distcc bzImage
```
On another terminal, you can monitor the status of the distributed compilation with distmoncc-text or tools such as top or bpytop.

Network throughput and latency will be a big factor in how much distcc will help speed up your build process. Using ssh may additionally introduce overhead, so play with the variables to see how much distcc can help speed up or optimize the build for your specific scenario. You may want to additionally consider ccache to speed up the build process.

There are some aspects of the build process that are not effectively parallizable in this manner, such as the final linking step of the executable, for which you will not see any performance improvement with distcc.

Give distcc a spin, and put any spare compute you have lying around in your home lab to good use.
