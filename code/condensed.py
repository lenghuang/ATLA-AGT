# Condensed 1 file version hosted on pythonanywhere.com

import ast
from flask import Flask, request, jsonify
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
        # additional thing to create canvasJS object
        self.series = [[] for _ in range(actions)]


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
                player.strategy[a] = (
                    1.0 / player.actions
                )  # if all nonpositive, make uniform
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

        for i in range(iterations + 1):

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
                self.A.regretSum[a] += actionUtilityA[a] - \
                    actionUtilityA[actionA]
            for b in range(self.B.actions):
                self.B.regretSum[b] += actionUtilityB[b] - \
                    actionUtilityB[actionB]
            # 4) Log information
            if (i % 500 == 0):
                stratA = self.getAverageStrategy(self.A)
                for a in range(self.A.actions):
                    self.A.series[a].append(stratA[a])
                stratB = self.getAverageStrategy(self.B)
                for b in range(self.B.actions):
                    self.B.series[b].append(stratB[b])

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
        return self.A.series, self.getAverageStrategy(self.A), self.B.series, self.getAverageStrategy(self.B)


app = Flask(__name__)
app.config["DEBUG"] = True


@app.route("/", methods=["GET"])
def home():
    return """
        <!DOCTYPE html>
        <body style="width: 880px; margin: auto;">
        <h1> Regret Matching </h1>
        <p>Welcome to Len's API for implementing Regret Matching</p>
        </body>
            """


@app.route("/train", methods=["GET"])
def train():
    origin = request.environ.get('HTTP_ORIGIN')
    if origin is None:
        response = jsonify({
            "seriesA": "no",
            "seriesB": "u"
        })
    else:
        matrixEnc = request.args.get("matrix")  # string of a 2D list

        try:
            matrix = ast.literal_eval(matrixEnc)  # get utility matrix
            game = Game(matrix)  # initialize the game
            trainer = RegretTrainer(game, 50000)  # make the regret trainer
            # Capital data series, a is most recent
            A, a, B, b = trainer.main()  # train it and get strategies
        except SyntaxError:
            matrix = "Ill formed input."
            A, a, B, b = [], [], [], []

        response = jsonify({
            "seriesA": A,
            "stratA": a,
            "seriesB": B,
            "stratB": b
        })
        response.headers.add('Access-Control-Allow-Origin',
                             'https://atla-agt.web.app')

    return response
