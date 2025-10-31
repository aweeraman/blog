---
title: "Bootstrapping Go"
date: "2017-04-10"
path: "/posts/bootstrapping-go"
excerpt: "Over the weekend, I came across a couple of videos on how the Go compiler was migrated from C to Go. The Go compiler was originally written…"
feature_image: "/images/2024/03/1-kneu6qbr0ghdb31etvrfqg-jpeg-1.jpg"
---

Over the weekend, I came across a couple of videos on how the [Go](https://golang.org/) compiler was migrated from C to Go. The Go compiler was originally written in C and after it reached a certain level of maturity, the creators were looking at how to bootstrap the compiler in Go so that the language can inherit some of the benefits of Go and to be able to do things that would not have been possible if still based on C.

Here’s the first video from the GopherCon where Russ Cox talks about his approach:

And here’s a session by Rob Pike the following year on how it went, with further details on the migration:

The approach is brilliant in theory and goes somewhat like this:

1. $1
2. $1
3. $1
4. $1
5. $1
A caveat is that the C parser from step 1 is a very specialized one built according to a very specific dialect followed by the original authors and not intended to be a general purpose converter which is a much bigger problem. Also, it was not a 100% automatic process and there’s still some code that needs to be hand rolled, but this makes the job of conversion easier, which would otherwise have been a tedious job.

Once converted to Go, the process of refactoring, profiling and restructuring can take place to evolve the code base using the Go toolchain.

And that’s how it’s done, folks.

Lightweight Docker images with AlpineOne of the challenges in building Docker images, is keeping it small and lean. For example, let’s take a simple app…

![](/images/2024/03/1-rijmo9q803d6uwxx8pmhoq-jpeg-1.jpg)
