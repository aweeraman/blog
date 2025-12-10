---
title: "AlphaGo: a journey to machine intuition"
date: "2018-01-01"
path: "/alphago-a-journey-to-machine-intuition"
excerpt: "When IBM's Deep Blue beat Gary Kasparov, I was fifteen years old. I didn't know the significance of the event at the time, nor was I even interested in the epic battle that was to define the technology advancements in AI in that decade."
feature_image: "/images/alphago-a-journey-to-machine-intuition/go-game-board.jpg"
featured: true
---

When [IBM’s Deep Blue beat Gary Kasparov](/for-the-love-of-chess), I was fifteen years old. I didn’t know the significance of the event at the time, nor was I even interested in the epic battle that was to define the technology advancements in AI in that decade. It was a really huge deal, as it proved that machines were capable of accomplishing something that was clearly the domain of humans, requiring ingenuity and skill that nobody expected an algorithm, much less a machine, to match.

Less than twenty years later, a similar feat was achieved when AlphaGo beat Lee Sedol in the game of Go, an achievement ten years ahead of its time. AlphaGo, a system built on the foundations of supervised and reinforcement learning and a state-of-the-art Monte Carlo tree search algorithm that combed through many generations of self-play, faced Lee Sedol, a 9 dan professional widely acclaimed to be the best in the game.

The [AlphaGo documentary](https://www.alphagomovie.com/) did a great job in chronicling this amazing face off and is a must watch for those interesting in a riveting AI techno-thriller with smash cuts to developers coding set against the most epic battle of Go that will leave you at the edge of your seat.

What’s different about Go, that it took nearly twenty years for computers to be able to crack, is the fact that unlike Chess that has a branching factor of 35, which means that for each legal position, a player has about 35 moves that can be made, Go has 250. This means that a system based purely on brute force search is impossible.

In addition, Go players are known to work very intuitively when it comes to gameplay, and sometimes a player would characterize a certain move as one that “felt right”, which is something very difficult to model algorithmically. As a result of this high branching factor, and “open-ended” gameplay, solving Go through brute force, minimax search through handcrafted evaluation functions as was used by Deep Blue in Chess was deemed impossible.

The approach that the team at Deep Mind working on AlphaGo took, was very different. In place of a handcrafted evaluation function, AlphaGo uses deep neural networks and Monte Carlo Tree Search (MCTS) of simulations for gameplay. An in-depth treatment of the techniques and results are available in the Deep Mind paper [“Master the game of Go with deep neural networks and tree search”](https://www.semanticscholar.org/paper/Mastering-the-game-of-Go-with-deep-neural-networks-Silver-Huang/1740eb993cc8ca81f1e46ddaadce1f917e8000b5).

![](/images/alphago-a-journey-to-machine-intuition/alphago-game-tree-complexity.png)

Next, I will dive into the salient aspects of this paper.

### How was AlphaGo built?

Taking a brute force approach is intractable for the reason that the search space tends to be very large for Go. The number of positions that would need to be searched through is represented by the equation **b^d** (b raised to the power of d), where **b** is the branching factor or the number of legal moves, and **d** is the game length. In the case of Chess, this comes to 35⁸⁰ possible permutations, whereas in Go, this comes to 250¹⁵⁰ possible permutations, hence the intractability of solving through brute force.

The solution that AlphaGo provides, is a deep convolutional neural network that is trained through supervised and reinforcement learning on the backdrop of an MCTS algorithm.

![](/images/alphago-a-journey-to-machine-intuition/alphago-training-pipeline.png)

*Source: [https://www.semanticscholar.org/paper/Mastering-the-game-of-Go-with-deep-neural-networks-Silver-Huang/1740eb993cc8ca81f1e46ddaadce1f917e8000b5](https://www.semanticscholar.org/paper/Mastering-the-game-of-Go-with-deep-neural-networks-Silver-Huang/1740eb993cc8ca81f1e46ddaadce1f917e8000b5)*

In the first stage of the training pipeline, a Supervised Learning (SL) policy network of 13 layers, is trained with 30 million positions from the KGS Go Server achieving an accuracy of 55.7% using only raw board positions and move history as inputs. This was an improvement over 44.4% which was the state-of-the-art at the time. This was however expensive to compute, so an additional less accurate but more performant fast rollout policy network was trained to achieve an accuracy of 24.2% and which was capable of executing in 2 microseconds as opposed to 3 milliseconds to select an action.

In the second stage of the pipeline, a Reinforcement Learning (RL) policy network that is identical in structure to the SL policy network is initialized with the same weights. It is then made to play with a randomly selected previous iteration of the policy network with an attached reward function that is used to maximize the expected outcome. When the RL policy network is made to play against the SL policy network, the former won 80% of the time. It also played against an open source Go engine, [Pachi](http://pachi.or.cz/), that is based on MCTS and which executes 100,000 simulations per move. AlphaGo won 85% of the games against Pachi. The previous state of the art was only capable of winning 11% of the games with Pachi, for comparison.

The third and final stage of the pipeline focuses on the problem of evaluating a position on whether it leads to a winning outcome. As training on the KGS dataset alone lead to overfitting and less generalization, this network was trained on 30 million distinct positions sampled from self-play of the RL policy network. This value function proved to be consistently more accurate than MCTS rollouts using the fast rollout policy. It also consumed 15,000 times less computation as compared to MCTS rollouts using the RL policy network.

The policy and value networks are then combined in an MCTS algorithm that searches a tree of simulations in four phases:

![](/images/alphago-a-journey-to-machine-intuition/alphago-mcts-phases.png)

*Source: [https://www.semanticscholar.org/paper/Mastering-the-game-of-Go-with-deep-neural-networks-Silver-Huang/1740eb993cc8ca81f1e46ddaadce1f917e8000b5](https://www.semanticscholar.org/paper/Mastering-the-game-of-Go-with-deep-neural-networks-Silver-Huang/1740eb993cc8ca81f1e46ddaadce1f917e8000b5)*

- **Selection** — selecting an edge with the maximum action value and stored prior probability for that edge
- **Expansion** — leaf node is expanded and processed by the policy network and stored as prior probabilities for each action
- **Evaluation** — the leaf node is then evaluated using the value network and by rolling out to the end of the game using the fast rollout policy
- **Backup** — action values are updated for the already run evaluations

A great deal of computation power is required to efficiently combine MCTS and deep neural networks. To achieve this scale, AlphaGo finally used a distributed system of 48 CPUs, 8 GPUs, 40 search threads to perform an asynchronous multi-threaded search of simulations.

### How does AlphaGo compare with others?

AlphaGo was made to compete against several other Go engines, both free and commercial and it proved to be several dans stronger than any other program by winning 494 out of 495 games at a staggering 99.8% win rate.

![](/images/alphago-a-journey-to-machine-intuition/alphago-win-rate-comparison.png)

Comparison of AlphaGo vs Free and commercial Go programs. Source: [https://www.semanticscholar.org/paper/Mastering-the-game-of-Go-with-deep-neural-networks-Silver-Huang/1740eb993cc8ca81f1e46ddaadce1f917e8000b5](https://www.semanticscholar.org/paper/Mastering-the-game-of-Go-with-deep-neural-networks-Silver-Huang/1740eb993cc8ca81f1e46ddaadce1f917e8000b5)

It was then sparred with Fan Hui, a 2 dan professional and European champion which AlphaGo won 5–0. This was the first time that AlphaGo won against a human professional.

During 9–15 March 2016, [AlphaGo played against Lee Sedol](https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol) in a competition of 5 matches and won the tournament 4–1, and was awarded an honorary 9 dan for its efforts.

### Creativity

In game 2, AlphaGo displayed a surprising creative streak with its move 37 which displayed an unconventional approach, yet somehow masterful in hindsight.

https://www.youtube.com/watch?v=JNrXgpSEEIE

It was one that scored a low probability as a human move but somehow had scored a high action value through RL self-play over millions of games. In effect, AlphaGo has discovered a new technique that challenged the existing knowledge of Go norms by learning from more games than we have ever played in the aggregate of all human existence.

Another aspect that this highlighted was the fact that our conventional assessment of what is a good or a bad move is based on moves that lead to higher scores, and yet AlphaGo was less concerned purely on material advantage and tended to favor outcome and less on the degree of victory, which often led to “unconventional” moves and new strategies.

In summary, what AlphaGo achieved was a landmark in machine intelligence and while AlphaGo is still considered “narrow” AI, it opened up techniques that can be easily adapted and generalized to board games such as Chess, Shogi, and others. There have been additional advances in this area such as AlphaZero which achieves this tabula rasa, and best left for another post.
