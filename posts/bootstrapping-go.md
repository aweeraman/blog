---
title: "Bootstrapping Go"
date: "2017-04-10"
path: "/bootstrapping-go"
excerpt: "Over the weekend, I came across a couple of videos on how the Go compiler was migrated from C to Go. The Go compiler was originally written…"
feature_image: "/images/2024/03/1-kneu6qbr0ghdb31etvrfqg-jpeg-1.jpg"
---

Over the weekend, I came across a couple of videos on how the [Go](https://golang.org/) compiler was migrated from C to Go. The Go compiler was originally written in C and after it reached a certain level of maturity, the creators were looking at how to bootstrap the compiler in Go so that the language can inherit some of the benefits of Go and to be able to do things that would not have been possible if still based on C.

Here’s the first video from the GopherCon where Russ Cox talks about his approach:

And here’s a session by Rob Pike the following year on how it went, with further details on the migration:

The approach is brilliant in theory and goes somewhat like this:

1. Parse the C code using a simple yacc parser

2. Generate parse tree. Tweak the tree to fix and re-write C-isms

3. Traverse the parse tree and output corresponding Go code

4. Compile Go code and validate output by comparing with C-based Go compiler

5. Repeat till both compilers generate the same output
A caveat is that the C parser from step 1 is a very specialized one built according to a very specific dialect followed by the original authors and not intended to be a general purpose converter which is a much bigger problem. Also, it was not a 100% automatic process and there’s still some code that needs to be hand rolled, but this makes the job of conversion easier, which would otherwise have been a tedious job.

Once converted to Go, the process of refactoring, profiling and restructuring can take place to evolve the code base using the Go toolchain.

And that's how it's done, folks.
