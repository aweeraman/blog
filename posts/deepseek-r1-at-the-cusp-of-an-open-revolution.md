---
title: "DeepSeek-R1, at the cusp of an open revolution"
date: "2025-02-02"
path: "/deepseek-r1-at-the-cusp-of-an-open-revolution"
excerpt: ""
feature_image: "https://images.unsplash.com/photo-1594267238512-d6d02583c5ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDI3Mnx8ZGVlcHxlbnwwfHx8fDE3Mzg0ODE2MTV8MA&ixlib=rb-4.0.3&q=80&w=2000"
---

DeepSeek R1, the new entrant to the Large Language Model wars has created quite a splash over the last few weeks. Its entrance into a space dominated by the Big Corps, while pursuing asymmetric and novel strategies has been a refreshing eye-opener.

GPT AI improvement was starting to show signs of slowing down, and has been observed to be reaching a point of diminishing returns as it runs out of data and compute required to train, fine-tune increasingly large models. This has turned the focus towards building "reasoning" models that are post-trained through reinforcement learning, techniques such as inference-time and test-time scaling and search algorithms to make the models appear to think and reason better. OpenAI's o1-series models were the first to achieve this successfully with its inference-time scaling and Chain-of-Thought reasoning.

## Intelligence as an emergent property of Reinforcement Learning (RL)

Reinforcement Learning (RL) has been successfully used in the past by Google's DeepMind team to build highly intelligent and specialized systems where intelligence is observed as an emergent property through rewards-based training approach that yielded achievements like AlphaGo (see my post on it here - [AlphaGo: a journey to machine intuition](__GHOST_URL__/alphago-a-journey-to-machine-intuition/)).

DeepMind went on to build a series of Alpha* projects that achieved many notable feats using RL:

- ***AlphaGo***, defeated the world champion Lee Seedol in the game of Go
- ***AlphaZero***, a generalized system that learned to play games such as Chess, Shogi and Go without human input
- ***AlphaStar***, achieved high performance in the complex real-time strategy game StarCraft II.
- ***AlphaFold***, a tool for predicting protein structures which significantly advanced computational biology.
- ***AlphaCode***, a model designed to generate computer programs, performing competitively in coding challenges.
- ***AlphaDev***, a system developed to discover novel algorithms, notably optimizing sorting algorithms beyond human-derived methods.
All of these systems achieved mastery in its own area through self-training/self-play and by optimizing and maximizing the cumulative reward over time by interacting with its environment where intelligence was observed as an emergent property of the system.

![](/images/2025/02/image-6.png)

The RL feedback loopRL mimics the process through which a baby would learn to walk, through trial, error and first principles.

## R1 model training pipeline

At a technical level, DeepSeek-R1 leverages a combination of Reinforcement Learning (RL) and Supervised Fine-Tuning (SFT) for its training pipeline:

![](/images/2025/02/image-1.png)

DeepSeek-R1 Model Training PipelineUsing RL and DeepSeek-v3, an interim reasoning model was built, called DeepSeek-R1-Zero, purely based on RL without relying on SFT, which demonstrated superior reasoning capabilities that matched the performance of OpenAI's o1 in certain benchmarks such as AIME 2024.

The model was however affected by poor readability and language-mixing and is only an interim-reasoning model built on RL principles and self-evolution.

DeepSeek-R1-Zero was then used to generate SFT data, which was combined with supervised data from DeepSeek-v3 to re-train the DeepSeek-v3-Base model.

The new DeepSeek-v3-Base model then underwent additional RL with prompts and scenarios to come up with the DeepSeek-R1 model.

The R1-model was then used to distill a number of smaller open source models such as Llama-8b, Qwen-7b, 14b which outperformed bigger models by a large margin, effectively making the smaller models more accessible and usable.

## Key contributions of DeepSeek-R1

### 1. RL without the need for SFT for emergent reasoning capabilities

R1 was the first open research project to validate the efficacy of RL directly on the base model without relying on SFT as a first step, which resulted in the model developing advanced reasoning capabilities purely through self-reflection and self-verification.

Although, it did degrade in its language capabilities during the process, its Chain-of-Thought (CoT) capabilities for solving complex problems was later used for further RL on the DeepSeek-v3-Base model which became R1. This is a significant contribution back to the research community.

The below analysis of DeepSeek-R1-Zero and OpenAI o1-0912 shows that it is viable to attain robust reasoning capabilities purely through RL alone, which can be further augmented with other techniques to deliver even better reasoning performance.

![](/images/2025/02/image-2.png)

*Source: [https://github.com/deepseek-ai/DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)*

Its quite interesting, that the application of RL gives rise to seemingly human capabilities of "reflection", and arriving at "aha" moments, causing it to pause, ponder and focus on a specific aspect of the problem, resulting in emergent capabilities to problem-solve as humans do.

### 2. Model distillation

DeepSeek-R1 also demonstrated that larger models can be distilled into smaller models which makes advanced capabilities accessible to resource-constrained environments, such as your laptop. While its not possible to run a 671b model on a stock laptop, you can still run a distilled 14b model that is distilled from the larger model which still performs better than most publicly available models out there. This enables intelligence to be brought closer to the edge, to allow faster inference at the point of experience (such as on a smartphone, or on a Raspberry Pi), which paves way for more use cases and possibilities for innovation.

![](/images/2025/02/image-3.png)

*Source: [https://github.com/deepseek-ai/DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)*

Distilled models are very different to R1, which is a massive model with a completely different model architecture than the distilled variants, and so are not directly comparable in terms of capability, but are instead built to be more smaller and efficient for more constrained environments. This technique of being able to distill a larger model's capabilities down to a smaller model for portability, accessibility, speed, and cost will bring about a lot of possibilities for applying artificial intelligence in places where it would have otherwise not been possible. This is another key contribution of this technology from DeepSeek, which I believe has even further potential for democratization and accessibility of AI.

![](/images/2025/02/image-4.png)

### Why is this moment so significant?

DeepSeek-R1 was a pivotal contribution in many ways:

1. The contributions to the state-of-the-art and the open research helps move the field forward where everybody benefits, not just a few highly funded AI labs building the next billion dollar model.

2. Open-sourcing and making the model freely available follows an asymmetric strategy to the prevailing closed nature of much of the model-sphere of the larger players. DeepSeek should be commended for making their contributions free and open.

3. It reminds us that its not just a one-horse race, and it incentivizes competition, which has already resulted in OpenAI o3-mini a cost-effective reasoning model which now shows the Chain-of-Thought reasoning. Competition is a good thing.

4. We stand at the cusp of an explosion of small-models that are hyper-specialized, and optimized for a specific use case that can be trained and deployed cheaply for solving problems at the edge. It raises a lot of exciting possibilities and is why DeepSeek-R1 is one of the most pivotal moments of tech history. Truly exciting times. What will you build?
