---
title: "Building a service mesh with Istio"
date: "2018-03-19"
path: "/building-a-service-mesh-with-istio"
excerpt: "If you're looking to build a modern microservices architecture that is highly scalable, observable, secure and resilient, it would make sense to consider some of the service mesh technologies that are rapidly evolving right now. At the time of this writing, Istio is one of the key frameworks that have been gaining a lot of traction, and a key contender in the service mesh race."
feature_image: "https://images.unsplash.com/photo-1590497008432-598f04441de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDZ8fGNvbnRhaW5lcnN8ZW58MHx8fHwxNzExMjIyMTY4fDA&ixlib=rb-4.0.3&q=80&w=2000"
---

If you’re looking to build a modern microservices architecture that is highly scalable, observable, secure and resilient, it would make sense to consider some of the service mesh technologies that are rapidly evolving right now. At the time of this writing, [Istio](http://www.istio.io) is one of the key frameworks that have been gaining a lot of traction, and a key contender in the service mesh race.

![](/images/2024/03/service-mesh.png)

*Source: [https://www.infoq.com/presentations/istio-service-mesh](https://www.infoq.com/presentations/istio-service-mesh)*

For those new to the subject, a service mesh is a layer of infrastructure between a service and a network that frees the developers from network and policy considerations and provides operators with controls for monitoring, policy enforcement, networking and resiliency concerns.

It does so by taking the existing pattern of the central reverse proxy that sits in front of a large number of services, and colocates a lighter variant of it with each individual service. In addition to being a reverse proxy, this “sidecar” proxy (so named due to the fact that it sits alongside each service in a tightly bound configuration), is able to perform traffic routing, inter-service communication, policy enforcement, throttling and a myriad of other capabilities that make this pattern very powerful.

![](/images/2024/03/1-w944xb2kpc2ninvpzjmcxq.png)

*Source: [https://www.infoq.com/presentations/istio-service-mesh](https://www.infoq.com/presentations/istio-service-mesh)*

All communication in and out of the service is mediated through the sidecar, which is now capable of performing a number of cross cutting capabilities that both free up the developer from networking aspects, and empower the operators to uniformly apply capabilities that concern them.

Istio builds upon a battle tested sidecar known as Envoy, developed and used in production at [Lyft](https://www.lyft.com/) for many years. Built using C++, it has a low memory footprint and supports dynamic configuration updates, zone aware load balancing, traffic splitting, routing, circuit breakers, timeouts, retries, fault injection, HTTP/2, gRPC and orchestrated across the network by a “Pilot”.

The Pilot, Mixer and CA constitute the control plane through which all the configuration, policy enforcement and control flows takes place. The data plane consists of all the Envoy proxies that mediates all the service requests and data communications.

Each Envoy publishes metrics to a “Mixer”, which has adapters for popular monitoring backends, [prometheus](https://prometheus.io/) being a popular one. The Mixer is also used for policy evaluation, implementing quotas, and rate limiting.

![](/images/2024/03/1-d3v53ldxktbknch1qb1dja.png)

*Source: [https://www.infoq.com/presentations/istio-service-mesh](https://www.infoq.com/presentations/istio-service-mesh)*

The Envoy, being both a Layer 4 and Layer 7 reverse proxy, is capable of performing complex traffic control based on rules pushed by the operators and can be made to take effect immediately without a restart. This makes the infrastructure extremely nimble for the operations team. For example, below is an example of how 1% of the traffic can be routed to an alternate route for A/B testing:

![](/images/2024/03/1-foh7a_kptjkqnrs_o0_dvw.png)

*Source: [https://www.infoq.com/presentations/istio-service-mesh](https://www.infoq.com/presentations/istio-service-mesh)*

This could be made possible by pushing out the following policy change to the Envoy:

![](/images/2024/03/1-gt5cfto782nf77tbuhbpsw.png)

*Source: [https://www.infoq.com/presentations/istio-service-mesh](https://www.infoq.com/presentations/istio-service-mesh)*

Envoy can also perform L7 routing for traffic steering based on HTTP headers as in the scenario below:

![](/images/2024/03/1-bkt41fq-uyohjeojn9yzew.png)

*Source: [https://www.infoq.com/presentations/istio-service-mesh](https://www.infoq.com/presentations/istio-service-mesh)*

Envoy also takes care of generating spans and integrating with tools such as Zipkin that provides distributed tracing capabilities which makes observing a complicated distributed interaction and correlating causality a feature of the service mesh, and not something developers have to individually account for and build into their services.

Metrics captured by the monitoring backends can be visualized through many of the existing tools available such as Grafana for a real time view into the state and health of the service mesh.

One of the key differences in this pattern compared to the centralized middle proxy is that the sidecar is bound to the same trust domain as the individual service, and in the case of a compromise, this reduces the attack surface. Secondly, this architecture also allows services to implement fine-grained policies around inter-service communication that uses cryptographically verifiable identities instead of elements that can be spoofed by a savvy insider.

For example, service A can be configured to only be allowed to invoke service B, and the interaction will be governed and mandated by the proxy through the use of mutual TLS certificates with the Istio CA. Previously, this type of policy enforcement was complicated in highly dynamic environments such as orchestration platforms where the IP addresses change frequently and the workload tends to be highly mobile. This made systems very difficult to protect from insider attack as there was no inherent identity bound to the service that can be cryptographically assured at the time of enforcement.

![](/images/2024/03/1-qgformcys-aq0yljucxamw.png)

*Source: [https://www.infoq.com/presentations/istio-service-mesh](https://www.infoq.com/presentations/istio-service-mesh)*

In the case of possible security compromise, the certificates bound to the identities can be can be individually revoked giving fine grained control over the blast radius.

At the time of writing, Istio is at version 0.6 and has not reached GA. Nevertheless, it’s definitely a technology to watch out for in 2018.
