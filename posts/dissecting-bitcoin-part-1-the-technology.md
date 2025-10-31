---
title: "Dissecting Bitcoin, Part 1 — The Technology"
date: "2017-07-22"
path: "/dissecting-bitcoin-part-1-the-technology"
excerpt: "Recently, I decided to pull up Satoshi Nakamoto’s paper with the hope of getting a deeper appreciation for Bitcoin and the machinations of…"
feature_image: "/images/2024/03/1-qkeglmhjnyzqqrkdqjobpg-1.png"
---

Recently, I decided to pull up Satoshi Nakamoto’s [paper](https://www.semanticscholar.org/paper/Bitcoin-A-Peer-to-Peer-Electronic-Cash-System-Nakamoto/22718d4694e51a78a70899cda24ec321869f9a43) with the hope of getting a deeper appreciation for Bitcoin and the machinations of a protocol that’s driving speculators insane watching a candlestick chart.

In the paper, Satoshi puts forward a solution to an [old problem](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance#Byzantine_Generals.27_Problem) in distributed computing circles using Cryptography.

What’s even more interesting is, who is Satoshi Nakamoto, the mysterious creator behind Bitcoin and the originator of the [genesis block](https://en.bitcoin.it/wiki/Genesis_block)? This is best left for a crypto thriller set in the backdrop of the dystopian, anarchic subculture of cryptographers, underground hack computer scientists and modern day alchemists.

### Part 1: Technology

At its heart, the peer to peer system proposed by Satoshi Nakomoto is meant to address the [double spending problem](https://en.wikipedia.org/wiki/Double-spending) of digital currency that is completely decentralized and does not require trust between entities in the network in order to function. It does so by maintaining a public chain of transactions whose integrity is assured by hash-based proof-of-work that is nearly impossible to tamper with using present-day technologies. This block chain acts as an immutable ledger where transactions can be recorded using public key cryptography for maintaining integrity.

![](/images/2024/03/1-d2odgp9ix6jlxai5noz08q.png)

Reference: Nakamoto, Satoshi. “Bitcoin: A Peer-to-Peer Electronic Cash System.” (2008).At its foundation, the protocol relies on the following concepts.

**Proof-of-Work**

In this system where the base unit is a block of transactions, a new block is created approximately every ten minutes through a process known as mining and involves solving a [very difficult math problem](https://en.bitcoin.it/wiki/Proof_of_work) that requires considerable compute cycles but is very easy to verify once solved. For example, the string “Hello, world” hashes to the following using SHA256:

315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3

That’s pretty simple to compute. In fact, [hashing](https://en.wikipedia.org/wiki/Cryptographic_hash_function) has been used to verify whether data has been modified or been tampered with for decades and is the basis for digital signatures in conjunction with [public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography).

If we were to add a random string to “Hello World”, such as a zero at the end, and hash it again, we get a completely different output. The math problem that Bitcoin provides is to “discover” a suitable hash that has a predefined list of leading zeros. The number of zeros in this case is indicative of how difficult the problem is, and is determined by the average time that is required to solve this problem. The network regulates it such that it takes approximately 10 minutes to solve this problem and if it appears that the problem is being solved faster, the network automatically increases the number of zeros to slow things down. Bitcoin requires 18 leading zeros in the proof of work, based on the [latest block as of this writing](https://blockchain.info/block/00000000000000000025e99e7e2373f592745e17ff6fcd3da74d725f2fdcb6b9).

The reason that proof-of-work is compute intensive is because it requires brute forcing every known permutation till an answer is reached that can be verified. Whoever reaches the answer first gets to create a new block and through that process receives Bitcoins for the effort. This process is known as mining and is how new Bitcoins enter circulation. You could be doing this in your own basement, in contrast to fiat currencies, which could get you in trouble.

To further illustrate, here’s a simple Python script that demonstrates a simplified version of the concept:

The key point here is that the problem is hard to solve, but easy to verify. As part of the mining process, each block is validated for consistency and correctness, and invalid blocks are simply discarded by the network as it makes its way. This provides the self regulatory framework in the network to circumvent malicious actors.

Modifying a particular block requires completing the proof-of-work on each subsequent block and therefore gets increasingly difficult due to the proof of work that needs to be done.

**Distributed Network**

Fundamentally, Bitcoin solves a distributed computing problem, and so requires a geographically distributed peer-to-peer network that doesn’t require trust, much like Bittorrent. Each node in the network has a copy of the entire block chain and is capable of computing the proof-of-work needed to create new blocks. When it finds a new block, it is broadcast to the network and it is verified by its peers and propagates across the network.

As this network is completely decentralized, multiple versions of the blockchain can exist at any given time, but the network is designed to pick the longest chain from the different variants and so eventually gravitates to that.

The network assumes no trust in its peers and validates each block for consistency and erroneous or malformed blocks are discarded.

**Incentives**

Mining is a critical part of the running Bitcoin network, and there are incentives in the protocol to make it worthwhile for miners to solve these computationally intensive problems that are required to keep the network in operation. Each mined block has a reward associated with it, so whoever wins the race to generate the correct block gets 50 Bitcoins. This number halves every 210,000 blocks.

As of today, the reward for mining a Bitcoin is 12.5 BTC.

![](/images/2024/03/1-deub_ulydlka735lwdj8ea.png)

Source: [https://en.bitcoin.it/wiki/Controlled_supply](https://en.bitcoin.it/wiki/Controlled_supply)When mining is no longer possible, the miner who successfully generates a new block is also incentivized with transaction fees. This is the difference between the input and the output of a transaction.

![](/images/2024/03/1-ba8k-16cpqh8euhm7dqq8w.png)

Reference: Nakamoto, Satoshi. “Bitcoin: A Peer-to-Peer Electronic Cash System.” (2008).Armed with this knowledge, [proceed to part 2](/dissecting-bitcoin-part-2-challenges) of this three part series on Dissecting Bitcoin that will cover some challenges in Bitcoin.
