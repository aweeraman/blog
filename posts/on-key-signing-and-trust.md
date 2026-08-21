---
title: "On key signing and trust"
date: "2015-01-11"
path: "/on-key-signing-and-trust"
excerpt: "Key signing is a hallowed tradition in the open source world with a very specific protocol for validating and confirming an identity before accepting someone to the web of trust."
feature_image: "/images/on-key-signing-and-trust/gpg-key-signing-cover.jpg"
tags: [opensource]
---

Key signing is a hallowed tradition in the open source world with a very specific protocol for validating and confirming an identity before accepting someone to the web of trust. It’s almost never done without meeting the person being admitted into the trust relationship and it goes like this:

1. Individuals meet for a beer, or at a key signing party (for those who just went wtf, yes, these things are real, and they are crazy fun! see below for the type of shenanigans that take place at these reality-altering parties)

2. They exchange strips of paper or business cards with their name, email address, key fingerprint and key ID

3. They validate each other’s identity using Government issued photo IDs

4. Once cleared, they pull down each other’s key from the key servers

5. They validate that the fingerprint of the downloaded key matches what’s written on the piece of paper and the photo IDs exchanged at introduction

6. If everything checks out, they sign each other’s key

7. For additional security, the signed key is encrypted using the public key of the recipient and emailed to the address indicated in the key
Let’s look at this unnerving and highly nerdy exchange that has replaced the “Hi, I’m Tom” with “Hi, I’m Tom and here’s my fingerprint and Government issued photo Id”. Here’s the rationale for some of the steps in this workflow.

The key is a personal identification and privacy instrument that is backed by strong science to assure [non-repudiation](http://en.wikipedia.org/wiki/Non-repudiation). I will not go into the science in this post, but [here’s](http://en.wikipedia.org/wiki/RSA_%28cryptosystem%29) where you may want to get started if you’re curious. An aspect about this workflow is that nothing is trusted until verified and the protocol is there to make sure that no compromise takes place.

At the beginning of the process, the public key is expected to be on a public key server network (such as [pgp.mit.edu](http://pgp.mit.edu/)) and the meeting in person is to make sure that the key you’re signing (which is on a public system) belongs to the correct individual and not to an individual (or three letter agency) who’s masquerading as someone else. The most secure way to ensure that is in person (because we’re a paranoid bunch), as that will eliminate any chance of a malicious man in the middle. When one produces the piece of paper with the key fingerprint (again backed by strong science) the signer is able to confirm by comparing the fingerprint on the public server with the fingerprint that’s presented in person along with the official photo id, that the public key really belongs to the individual before him/her. The connection has now been made and technology has once again prevailed in mathematically assured validation of another’s identity. The party is just getting started.

Once identity is validated this way, the signer signs the key and uploads the key back to the key server or emails a copy of it. This can be done after the party in a more subdued setting without crazy paper shuffling and photo id validation madness. The astute and more paranoid amongst us, would encrypt it using the public key of the key being signed and email it to the address specified in the key because that’s a good way to validate the email address is correct and belongs to the right user. For the gnupg commands that make this workflow possible, check out the [Debian Key signing](https://wiki.debian.org/Keysigning) howto.

In communities such as [Debian](http://www.debian.org), this process is mandatory to assure the trust in a system that is largely de-centralized. The [Web of Trust](http://en.wikipedia.org/wiki/Web_of_trust) that this creates gives rise to a truly magnificent network, which is difficult to subvert so long as the protocol is followed to ensure no compromise.

While this is good for cryptographically assured validation of one’s identity in a global network and non-repudiation of one’s contributions and electronic communications, trust is ultimately a very subjective attribute and probably can never be assured through a hash, because trust can be broken by people even though strong science says otherwise.
