---
title: "Lightweight Docker images with Alpine"
date: "2018-05-06"
path: "/lightweight-docker-images-with-alpine"
excerpt: "One of the challenges in building Docker images is keeping it small and lean. For example, let's take a simple app that prints a simple message to the console, and containerize it in Docker."
feature_image: "/images/2024/03/1-rijmo9q803d6uwxx8pmhoq-jpeg.jpg"
---

One of the challenges in building Docker images, is keeping it small and lean. For example, let’s take a simple app that prints a simple message to the console, and containerize it in Docker. Here’s the code of the application in Go:

```go
package main

import "fmt"

func main() {
 fmt.Println("lightweight docker go")
}
```
To containerize this, we have the following Dockerfile:

```
FROM golang:1.10
COPY . /app
RUN cd /app && go build -o hello hello.go
ENTRYPOINT /app/hello
```
Let’s build and run this Docker image:

```
$ docker build -t lightweight-docker-go .
Sending build context to Docker daemon  3.072kB
Step 1/4 : FROM golang:1.10
 ---> 9257089f13de
Step 2/4 : COPY . /app
 ---> Using cache
 ---> cc89ebc2e4e0
Step 3/4 : RUN cd /app && go build -o hello hello.go
 ---> Using cache
 ---> a2458fdd22f9
Step 4/4 : ENTRYPOINT /app/hello
 ---> Using cache
 ---> 836d07d36a8f
Successfully built 836d07d36a8f
Successfully tagged lightweight-docker-go:latest$ docker images | grep lightweight-docker-go
lightweight-docker-go  latest  836d07d36a8f  7 minutes ago  796MB
```
The simple Docker image that was created for this basic application is 796MB.

If that seems a little too excessive for you, please read on, and I’ll show you how to strip this container down to the bare essentials.

The default base images includes way more stuff than you really need, and while it may seem wasteful, it can also be quite insecure, as it can increase the attack surface for attackers. So what you’d need to do, is to only use the bare essentials and create a container which is optimized and secured for your application.

A good base for such a stripped down container is [Alpine Linux](https://alpinelinux.org/).

For this, we can leverage multi-stage builds in Docker 17.05+, so that we can build the binary using one base image, and copy it over to another more lightweight image. Here’s a Dockerfile that would do exactly that:

```
FROM golang:1.10 AS build-env
COPY . /app
RUN cd /app && go build -o hello hello.go

FROM alpine
WORKDIR /app
COPY --from=build-env /app/hello /app/hello

ENTRYPOINT /app/hello
```
Here, you’d notice that we have two “FROM” directives. The first one will be used for the base image for building the application and the second one for the final image. The built binaries are copied over from the first image over to the second and the application entrypoint defined.

The size of this new image is ~6MB.

Additionally, you may want to run the application as a non-root user, to reduce the attack surface even further. You can do that by switching the user to a non-root user as shown below:

```
FROM golang:1.10 AS build-env
COPY . /app
RUN cd /app && go build -o hello hello.go

FROM alpine
WORKDIR /app
COPY --from=build-env /app/hello /app/hello
RUN chown nobody:nogroup /app
USER nobody

ENTRYPOINT /app/hello
```
The Github repo with the code above is available [here](https://github.com/aweeraman/lightweight-docker-go).
