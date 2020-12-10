from random import random


# General class describing a game
class Game:
    def __init__(self, actions):
        self.NUM_ACTIONS = actions


# Sub class of game, Rock Paper Scissors
class RPS(Game):
    def __init__(self):
        super().__init__(3)

    """
    REQUIRES: Takes in an action profile, A is player A's action, same for B
    ENSURES:  Returns the utility for you (first index of tuple)
              Elements are lined up sequentially, so if we have (Water, Fire)
              we do Fire - Water = 2 - 1 = 1, which is the utility of A.
              Opposite for B and then everything else is 0.
    """
    # Maybe this can be refined?
    def utility(self, A, B):
        if abs(B - A) == 1:
            return B - A
        else:
            return 0


# Sub class of game, Avatar the Last Airbender
class ATLA(Game):
    def __init__(self):
        super().__init__(4)

    # Dumb testing change later
    def utility(self, A, B):
        if abs(B - A) == 1:
            return B - A
        elif abs(B - A) == 2:
            return B - A
        else:
            return 0


# Generalize players
class Player:
    def __init__(self, NUM_ACTIONS):
        self.regretSum = [0.0] * NUM_ACTIONS
        self.strategy = [0.0] * NUM_ACTIONS
        self.strategySum = [0.0] * NUM_ACTIONS


# Regret trainer class
class RegretTrainer:
    def __init__(self, game):
        self.game = game
        self.NUM_ACTIONS = self.game.NUM_ACTIONS
        self.A = Player(self.NUM_ACTIONS)
        self.B = Player(self.NUM_ACTIONS)

    """
    REQUIRES: True
    ENSURES:  Gets a strategy lol?
    """

    def getStrategy(self, player):
        normalizingSum = 0
        for a in range(self.NUM_ACTIONS):
            player.strategy[a] = player.regretSum[a] if player.regretSum[a] > 0 else 0
            normalizingSum += player.strategy[a]
        for a in range(self.NUM_ACTIONS):
            if normalizingSum > 0:
                player.strategy[a] /= normalizingSum
            else:
                player.strategy[a] = (
                    1.0 / self.NUM_ACTIONS
                )  # if all nonpositive, make uniform
            player.strategySum[a] += player.strategy[a]
        return player.strategy

    """
    REQUIRES: strategy is a float list
    ENSURES:  a is a randomly picked action according
              to our mixed strategy distribution
    """

    def getAction(self, strategy):
        # COME BACK TO THIS ?????
        r = random()  # we do 1 - since python random gives [0,1)
        a = 0
        cumulativeProb = 0.0
        while a < self.NUM_ACTIONS - 1:
            cumulativeProb += strategy[a]
            if r < cumulativeProb:
                break
            a += 1
        return a

    """
    REQUIRES: iterations the int number of times u wanna run this
    ENSURES:  void, updates the things accordingly ??
    """

    def train(self, iterations):

        actionUtilityA = [0.0] * self.NUM_ACTIONS
        actionUtilityB = [0.0] * self.NUM_ACTIONS

        for _ in range(iterations):

            # 1) Get Regret-matched mixed-strategy actions
            actionA = self.getAction(self.getStrategy(self.A))
            actionB = self.getAction(self.getStrategy(self.B))

            # 2) Compute action utilities
            for a in range(self.NUM_ACTIONS):
                actionUtilityA[a] = self.game.utility(a, actionB)
                actionUtilityB[a] = self.game.utility(a, actionA)

            # 3) Accumulate action regrets
            for a in range(self.NUM_ACTIONS):
                self.A.regretSum[a] += actionUtilityA[a] - actionUtilityA[actionA]
                self.B.regretSum[a] += actionUtilityB[a] - actionUtilityB[actionB]

            # if i % 10000 == 0:
            #     print("Iteration " + str(i))
            #     print(strategy)

    """
    REQUIRES: strategy is trained
    ENSURES:  returns a float list representing average strategy
    """

    def getAverageStrategy(self, player):

        avgStrategy = [0.0] * self.NUM_ACTIONS
        normalizingSum = 0

        for a in range(self.NUM_ACTIONS):
            normalizingSum += player.strategySum[a]
        for a in range(self.NUM_ACTIONS):
            if normalizingSum > 0:
                avgStrategy[a] = player.strategySum[a] / normalizingSum
            else:
                avgStrategy[a] = 1.0 / self.NUM_ACTIONS

        return avgStrategy

    def main(self):
        self.train(10000)  # Trains both A and B
        print("A's strategy:")
        print(self.getAverageStrategy(self.A))
        print("B's strategy:")
        print(self.getAverageStrategy(self.B))


if __name__ == "__main__":

    print("\nRock Paper Scissors")
    rpsGame = RPS()
    trainerRPS = RegretTrainer(rpsGame)
    trainerRPS.main()

    print("\nAang vs Bang")
    avatarGame = ATLA()
    trainerATLA = RegretTrainer(avatarGame)
    trainerATLA.main()
