from random import random


class RPSTrainer:
    def __init__(self):
        self.NUM_ACTIONS = 3
        self.regretSum = [0.0] * self.NUM_ACTIONS
        self.strategy = [0.0] * self.NUM_ACTIONS
        self.strategySum = [0.0] * self.NUM_ACTIONS
        self.oppStrategy = [0.5, 0.2, 0.3]

    """
    REQUIRES: True
    ENSURES:  Gets a strategy lol?
    """

    def getStrategy(self):
        normalizingSum = 0
        for a in range(self.NUM_ACTIONS):
            self.strategy[a] = self.regretSum[a] if self.regretSum[a] > 0 else 0
            normalizingSum += self.strategy[a]
        for a in range(self.NUM_ACTIONS):
            if normalizingSum > 0:
                self.strategy[a] /= normalizingSum
            else:
                self.strategy[a] = (
                    1.0 / self.NUM_ACTIONS
                )  # if all nonpositive, make uniform
            self.strategySum[a] += self.strategy[a]
        return self.strategy

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

        actionUtility = [0.0] * self.NUM_ACTIONS

        for _ in range(iterations):

            # 1) Get Regret-matched mixed-strategy actions
            strategy = self.getStrategy()
            myAction = self.getAction(strategy)
            otherAction = self.getAction(self.oppStrategy)

            # 2) Compute action utilities
            # This is some big brain stuff with modding.
            # May hardcode this later for elements
            actionUtility[otherAction] = 0
            actionUtility[
                0 if otherAction == self.NUM_ACTIONS - 1 else otherAction + 1
            ] = 1
            actionUtility[
                self.NUM_ACTIONS - 1 if otherAction == 0 else otherAction - 1
            ] = -1

            # 3) Accumulate action regrets
            for a in range(self.NUM_ACTIONS):
                self.regretSum[a] += actionUtility[a] - actionUtility[myAction]

            # if i % 10000 == 0:
            #     print("Iteration " + str(i))
            #     print(strategy)

    """
    REQUIRES: strategy is trained
    ENSURES:  returns a float list representing average strategy
    """

    def getAverageStrategy(self):

        avgStrategy = [0.0] * self.NUM_ACTIONS
        normalizingSum = 0

        for a in range(self.NUM_ACTIONS):
            normalizingSum += self.strategySum[a]
        for a in range(self.NUM_ACTIONS):
            if normalizingSum > 0:
                avgStrategy[a] = self.strategySum[a] / normalizingSum
            else:
                avgStrategy[a] = 1.0 / self.NUM_ACTIONS

        return avgStrategy

    def main(self):
        self.train(10000)
        # print("Iterations Averaged Out")
        print(self.getAverageStrategy())


if __name__ == "__main__":
    trainer = RPSTrainer()
    trainer.main()
