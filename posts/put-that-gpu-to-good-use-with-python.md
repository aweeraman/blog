---
title: "How to put that GPU to good use with Python"
date: "2017-09-18"
path: "/put-that-gpu-to-good-use-with-python"
excerpt: "Graphics chip manufacturers such as NVIDIA and AMD have been seeing a surge in sales of their graphics processors (GPUs) thanks mostly to…"
feature_image: "/images/2024/03/1-rx1bct5g8dhycr92q53bjw-jpeg.jpg"
---

Graphics chip manufacturers such as [NVIDIA](http://www.nvidia.com) and [AMD](http://www.amd.com/) have been seeing a surge in sales of their graphics processors (GPUs) thanks mostly to cryptocurrency miners and machine learning applications that have found uses for these graphics processors outside of gaming and simulations. Primarily, this is because GPUs offer capabilities for parallelism that are not found in general purpose processors that happens to be a good match for operations such such as large scale hashing and matrix calculations which are the foundations of mining, and machine learning workloads.

[CUDA](https://www.youtube.com/watch?v=IzU4AVcMFys) from NVIDIA provides a massively parallel architecture for graphics processors that can be used for numerical computation. While a typical general purpose Intel processor may have 4 or 8 cores, an NVIDIA GPU may have thousands of CUDA cores and a pipeline that supports parallel processing on thousands of threads, speeding up the processing considerably. This can be used to considerably reduce training time in machine learning applications, which increases the number of experiments and iterations that can be run while tuning a model.

![](/images/2024/03/0-xzpjwmqxc0nb6d69.jpg)

Source: [http://graphicscardhub.com/cuda-cores-vs-stream-processors/](http://graphicscardhub.com/cuda-cores-vs-stream-processors/)One of the challenges of CUDA and parallel processing was that it required the use of specialized technologies and skills and its use was therefore limited. In recent years, this space has become increasingly democratized and the technology made more accessible for folks with limited programming skills to pick it up and optimize their applications to make use of the massive parallelism capabilities that GPUs provide.

In the example below, I’ve demonstrated how this can be done using Python in a way that doesn’t require deep knowledge of CUDA and its intricacies. For this example, I suggest using the [Anaconda Python distribution](https://www.anaconda.com/distribution/), which makes managing different Python environments a breeze. Follow the download and setup instructions for Anaconda as given [here](https://www.anaconda.com/download/) for your specific operating system.

In this example, we will be using Numba and NumPy for simulating a simple operation that can be executed in parallel using CPU cores as well as CUDA cores.

You’re also going to need [Anaconda Accelerate](https://developer.nvidia.com/anaconda-accelerate), which is a collection of packages for large scale data processing that also supports CUDA for parallelism. To pull down Accelerate for Anaconda along with its dependencies, execute the following in your conda environment:$ conda install accelerate

Here’s a simple program that creates two vectors with 100 million entries that are randomly generated. A computation is then performed such that each entry from one vector is raised to the power of the corresponding entry in the other and stored in a third vector, which is returned as the results of the computation. Programming this linearly, we would use a for loop to perform this calculation and return back the answer. We’ve added a bit of timing code here to see how long it takes.

On an Intel Core i5, this program takes about 35 seconds.

We take the same program and modify it slightly for parallelism with CUDA.

**Line 3:** Import the numba package and the vectorize decorator

**Line 5:** The vectorize decorator on the pow function takes care of parallelizing and reducing the function across multiple CUDA cores. It does this by compiling Python into machine code on the first invocation, and running it on the GPU. The vectorize decorator takes as input the signature of the function that is to be accelerated, along with the target for machine code generation. In this case, ‘cuda’ implies that the machine code is generated for the GPU. It also supports targets ‘cpu’ for a single threaded CPU, and ‘parallel’ for multi-core CPUs. Developers can use these to parallelize applications even in the absence of a GPU on standard multi core processors to extract every ounce of performance and put the additional cores to good use. And all of this, with no changes to the code.

**Line 6: **We then convert the pow function to operate on a scalar instead of the entire vector. This would be an atomic task performed by one of the CUDA cores which Numba takes care of parallelizing.

**Line 16:** The function invocation is changed to receive the third vector instead of passing it in as a parameter.

Apart from these changes, the rest of the code remains unchanged. In this manner, so long as a problem can be decomposed to map a scalar function over an array, the massive parallelism of a GPU can be exploited to dramatically improve the performance.

What took **35 seconds** previously, now takes only **0.36 seconds **on a GeForce GTX 1050Ti. That’s nearly a **100x** improvement with minimal changes.

![](/images/2024/03/1-ceeynyjad7vt0x4wkjk1qq.png)

Performance comparisonWith the death of Moore’s law, developers have to increasingly rely on parallel computing for scaling the performance of applications and for optimum use of the available hardware. High level frameworks with support from technologies like CUDA are making this easier than ever to unlock the supercomputer that is sitting on your desktop. With that out of the way, let’s go build something useful.If you want free GPUs right now, check out [Saturn Cloud](http://www.saturncloud.io), a flexible, scalable platform for data science.

AlphaGo: a journey to machine intuitionWhen IBM’s Deep Blue beat Gary Kasparov, I was fifteen years old. I didn’t know the significance of the event at the…

![](/images/2024/03/1-wnhme1llj80wpbhfxhptnq-1.png)

For the love of chessNearly twenty years to this day, in May 1997, a machine that IBM built challenged then world chess champion Garry…

![](/images/2024/03/1-dkqxrmcqxvbnehhxqs2tig-jpeg-1.jpg)

Machine learning for fun and profitMachine learning and artificial intelligence has been going through a phase of democratization to the point that in…

![](/images/2024/03/1-ggcalx43tz-7heh3a407da.png)
