import React from "react"
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import gfm from 'remark-gfm'
import Button from 'react-bootstrap/Button'

const renderers = {
    code: ({language, value}) => {
      return <SyntaxHighlighter language={language} children={value} />
    }
  }

const Title = () => {
    return (
        <div className="title">
            <h1> Implementing Two Player Regret Matching </h1>
            <i><h4> A learning algorithm to reach a correlated equilibrium. </h4></i>
        </div>);
}

const regretEq = `
~~~python
from random import random


# General class describing a two player game
class Game:
    def __init__(self, utility):
        self.utility = utility
        # Number of actions player A has. Have 1 to prevent div 0
        self.actionsA = 1 if len(utility) == 0 else len(
            utility)
        # Number of actions player B has. Have 1 to prevent div 0
        self.actionsB = 1 if len(utility) == 0 and len(
            utility[0]) == 0 else len(utility[0])


# Generalize players data structures
class Player:
    def __init__(self, actions):
        self.actions = actions
        self.regretSum = [0.0] * actions
        self.strategy = [0.0] * actions
        self.strategySum = [0.0] * actions


# Regret trainer class
class RegretTrainer:
    def __init__(self, game, iterations):
        self.utility = game.utility
        self.iterations = iterations
        self.A = Player(game.actionsA)
        self.B = Player(game.actionsB)

    """
    REQUIRES: True
    ENSURES:  Gets a strategy
    """

    def getStrategy(self, player):
        normalizingSum = 0
        for a in range(player.actions):
            player.strategy[a] = player.regretSum[a] if player.regretSum[a] > 0 else 0
            normalizingSum += player.strategy[a]
        for a in range(player.actions):
            if normalizingSum > 0:
                player.strategy[a] /= normalizingSum
            else:
                player.strategy[a] = (1.0 / player.actions)# if all nonpositive, make uniform
            player.strategySum[a] += player.strategy[a]
        return player.strategy

    """
    REQUIRES: player has a strategy prop thats a float list
    ENSURES:  a is a randomly picked action according
              to our mixed strategy distribution
    """

    def getAction(self, player):
        r = 1 - random()  # we do 1 - since python random gives [0,1)
        a = 0
        strategy = self.getStrategy(player)
        cumulativeProb = 0.0
        while a < player.actions - 1:
            cumulativeProb += strategy[a]
            if r < cumulativeProb:
                break
            a += 1
        return a

    """
    REQUIRES: 0 < A < A.actions, 0 < B < B.actions
    ENSURES:  if me, return A's else return B
    """

    def getUtility(self, A, B, me):
        a, b = self.utility[A][B]
        return a if me else b

    """
    REQUIRES: iterations the int number of times u wanna run this
    ENSURES:  void, updates both players, training them on each other
    """

    def train(self, iterations):

        actionUtilityA = [0.0] * self.A.actions
        actionUtilityB = [0.0] * self.B.actions

        for _ in range(iterations):

            # 1) Get Regret-matched mixed-strategy actions
            actionA = self.getAction(self.A)
            actionB = self.getAction(self.B)

            # 2) Compute action utilities
            for a in range(self.A.actions):
                actionUtilityA[a] = self.getUtility(a, actionB, True)

            for b in range(self.B.actions):
                actionUtilityB[b] = self.getUtility(actionA, b, False)

            # 3) Accumulate action regrets
            for a in range(self.A.actions):
                self.A.regretSum[a] += actionUtilityA[a] - actionUtilityA[actionA]
            for b in range(self.B.actions):
                self.B.regretSum[b] += actionUtilityB[b] - actionUtilityB[actionB]

    """
    REQUIRES: strategy is trained
    ENSURES:  returns a float list representing average strategy
    """

    def getAverageStrategy(self, player):

        avgStrategy = [0.0] * player.actions
        normalizingSum = 0

        for a in range(player.actions):
            normalizingSum += player.strategySum[a]
        for a in range(player.actions):
            if normalizingSum > 0:
                avgStrategy[a] = player.strategySum[a] / normalizingSum
            else:
                avgStrategy[a] = 1.0 / player.actions

        return avgStrategy

    def main(self):
        self.train(self.iterations)  # Trains both A and B
        A = self.getAverageStrategy(self.A)
        B = self.getAverageStrategy(self.B)
        print("A's strategy:")
        print(A)
        print("B's strategy:")
        print(B)
        return A, B

~~~

`

function Code() {
  return (
    <div className="central-card">
        {Title()}
        <div className="content">
            The below is my attempt at exercise 2.5 from{" "}
            <a href="http://modelai.gettysburg.edu/2013/cfr/cfr.pdf">
                Neller and Lanctot's paper on Counterfactual Regret Minimization.
            </a>.
            They provide the groundwork for a single player Regret Matching learning algorithm,
            and I built upon that to implement a two player one, where either players are learning
            with (or training against) one another to reach an equilibrium. While the resulting strategy
            may not be exactly the nash equilibrium, one can see that it often converges on some sort of
            correlated equilibrium. Check out the rest of my code on
            <a href="https://github.com/lenghuang/ATLA-AGT">
                Github.
            </a>
        </div>
        <div className="content">
            <ReactMarkdown plugins={[gfm]} renderers={renderers}>
                {regretEq}
            </ReactMarkdown>
        </div>
        <div style={{paddingTop: "2rem", textAlign: "center", margin: "auto"}}>
            <Button variant="light" size="lg" href="/home">
                Test this code out!
            </Button>{' '}
        </div>
        <div className="empty"></div>
    </div>
  );
}

export default Code;
