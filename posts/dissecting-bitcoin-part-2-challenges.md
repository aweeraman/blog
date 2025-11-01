---
title: "Dissecting Bitcoin, Part 2 — Challenges"
date: "2017-12-24"
path: "/dissecting-bitcoin-part-2-challenges"
excerpt: "In the previous part, we discussed the core technology behind Bitcoin and the concepts that make it tick. In this post, we will be covering some challenges Bitcoin faces as its adoption grows at a rapid rate."
feature_image: "/images/dissecting-bitcoin-part-2-challenges/crypto-cryptocurrency-blockchain.jpg"
featured: true
---

In the [previous part](/dissecting-bitcoin-part-1-the-technology), we discussed the core technology behind Bitcoin and the concepts that make it tick, namely:

1. Chain of transactions using hash-based proof-of-work

2. Distributed peer-to-peer network that doesn’t require trust

3. Coin creation and incentives for miners
These core capabilities are what drives the implementation of the transferrable asset known as Bitcoin on an immutable ledger that solves the problem of double spending with no central authority — what enables bitcoin to serve as a currency and a store of value. In this post, we will be covering some challenges Bitcoin faces as its adoption grows at a rapid rate.

#### Barriers to entry

For the folks who are non-conversant in elliptic curve cryptography and the secure management of encryption keys, present-day cryptocurrencies and blockchains can be a real barrier to entry.

Some of the tectonic shifts that have been taking place in the world Bitcoin recently, such as [segregated witness](https://blockgeeks.com/guides/what-is-segwit/), [Segwit2X (New York Agreement)](https://bravenewcoin.com/news/segwit2x-the-new-york-agreement/), [Bitcoin Cash](https://blockgeeks.com/guides/what-is-bitcoin-cash/) and the possibilities of hard forks and the implications they have on dealing with Bitcoin, pose a steep learning curve for those not conversant with Bitcoin’s technical details.

#### Security

With traditional fiat currencies, consumers have come to trust the institution that mediates transactions, aka the Bank, who is also responsible for making sure your money does not get stolen from their vaults. In cryptocurrencies there is no such mediator, and all security becomes the responsibility of the user. This puts more incentive on the user to protect his/her encryption keys, use strong passwords for the wallets, multi signatures and other cryptographic concepts that would seem alien to the ordinary user. A hacker simply needs access to your private key to siphon away your life’s savings in Bitcoin and there’s nothing that can be done. Even exchanges are not immune to this as was evident in the [Mt. Gox hack](https://www.wired.com/2014/03/bitcoin-exchange/) that emptied the wallets of many in an instant. Solutions like [Trezor](https://trezor.io/) attempt to simplify and secure key management in an easy to use device.

#### Privacy and anonymity

Unlike traditional bank transactions, all Bitcoin transactions are in the public record and every transaction since the genesis block is viewable by anyone. There’s no reference or link to the identities in any of these transactions so we just don’t know who is behind them.

![](/images/dissecting-bitcoin-part-2-challenges/bitcoin-transaction-privacy.png)

*Reference: Nakamoto, Satoshi. "Bitcoin: A Peer-to-Peer Electronic Cash System." (2008).*

Here's a transaction of 300 BTC between two parties:

![](/images/dissecting-bitcoin-part-2-challenges/bitcoin-transaction-example.png)

*Source: [https://blockchain.info/tx/e07734c68f8dccb4e0b7406988b5b0890812acae4bca24abc24ce092f21b7339](https://blockchain.info/tx/e07734c68f8dccb4e0b7406988b5b0890812acae4bca24abc24ce092f21b7339)*

Its not completely anonymous as most tend to believe. Exchanges already know a great deal of information about their users that they can link to known Bitcoin wallets. It would be possible for anyone to analyze the blockchain and start working out the transaction graph to monitor, correlate and infer the activity, and even tie it back to identities with the help of exchanges, law enforcement and even retailers. People who know what they're doing will know enough to cover their tracks if they want to, but anonymity is an illusion for the casual user. Currencies like [Monero](https://getmonero.org/) and [zCash](https://z.cash/) are designed to protect information that can be used to trace individuals and transactions and provide stronger privacy protections than Bitcoin.

#### 51% problem

Anyone who controls more than 51% of the hash rate in the system will have an upper hand in the Bitcoin network and can essentially prevent the confirmation of Bitcoin transactions, as well as break the double spending guarantee by reversing their own transactions.

They would still not be able to create new coins, alter the previous transactions or steal from wallets, but it would give someone willing to build a mining rig worthy of garnering 51% of the compute power in the Bitcoin network which is [collectively more than 256 times powerful than all the supercomputers combined](https://www.forbes.com/sites/reuvencohen/2013/11/28/global-bitcoin-computing-power-now-256-times-faster-than-top-500-supercomputers-combined/#7f58a5146e5e), the ability to bully the network for however long they can afford to sustain it. I wouldn’t rule a few well-meaning governments out.

#### Volatility and uncertainty

A recent change that was adopted by Bitcoin miners was Segwit2X, which is a change to optimize Bitcoin protocol to change the block structure by moving the signature portion of a transaction which accounts for 65% of the size of the transaction to a separate [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree). This results in increasing the number of transactions that can be accommodated in a single block and improves the scalability of Bitcoin and its ability to handle a larger number of transactions and improves its overall throughput.

A competing attempt known as Bitcoin Cash (BCH) is also underway that is a hard fork of the blockchain which increases the block size to 8MB and supports adjustable proof-of-work. All of these changes happening at the core of Bitcoin technology and the uncertainty around which direction it’s going to take based on the consensus of the miners and users creates volatility in the system and uncertainty in the eyes of the casual users.

#### Transaction fees

Today a credit card processing network includes a flat transaction fee for the merchant for the benefits of using its network and associated services such fraud protection. In the Bitcoin world, fees are included with each transaction and would be borne by the party that initiates the transaction in order to incentivize the miners to pick up the transaction for confirmation.

Once mining rewards have dried out, miners would rely solely on transaction fees to drive its operations Even today, mining is becoming unprofitable purely on the reward, requiring the economies of scale that large-scale mining farms and specialized ASICs can provide. Miners who control the majority of the hash rate have the option of selecting transactions with higher fees and eventually push the transaction fees up affecting consumers. Already, [Bitcoin transaction fees are up 1280% since 2015](https://news.bitcoin.com/bitcoin-transaction-fees-1200-past-two-years/) and are expected to climb further. So, expect to pay more for the privilege of using Bitcoin to pay for your coffee.

#### Performance

Today, Bitcoin transactions can take anywhere from 10 minutes to several hours to be confirmed. [Here is a view of the median confirmation time of Bitcoin transactions in the last 60 days](https://blockchain.info/charts/median-confirmation-time?timespan=60days). Segwit’s block size increase will help this situation with its increase in block size from 1MB to 4MB. But there’s still a long way to go in terms of performance of traditional payment instruments.

Bitcoin Cash, which is a hard fork of Bitcoin core, was created to address some of these problems of scalability. It did that by increasing the block size to 8MB so that more transactions can be crammed into a single block, which means smaller fees and faster transaction processing times. There was also mechanisms built into Bitcoin Cash to adjust the proof-of-work difficulty to incentivize miners, which in recent months has resulted in dramatic swings in the confirmation times as miners have figured out [ways to make more money](https://bitcoinmagazine.com/articles/miners-are-milking-bcashs-difficulty-adjustments-and-why-problem1/) by switching back and forth with the original chain to maximize profits.

#### Power consumption

Maintaining the Bitcoin networks consumes an enormous amount of power. Just for perspective, [each Bitcoin transaction consumes 250kWh, enough to power homes for nine days](https://arstechnica.com/tech-policy/2017/12/bitcoins-insane-energy-consumption-explained/).

The last few months have been a great ride for Bitcoin, with prices hitting $19,000, and at the time of this writing back down to $14,000 in a matter of few days. Are we in a Bitcoin Bubble? Is it due for a crash? Let’s wait and see what 2018 brings.
