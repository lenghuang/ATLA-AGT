import os
import ast
from flask import Flask, request, jsonify
from flask_cors import CORS
from regret import RegretTrainer, Game

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources={r"/*": {"origins": "example.com"}})


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
    matrixEnc = request.args.get("matrix")  # string of a 2D list
    iterations = request.args.get("iterations")  # iterations
    i = 0 if iterations is None else int(iterations)

    try:
        matrix = ast.literal_eval(matrixEnc)  # get utility matrix
        game = Game(matrix)  # initialize the game
        trainer = RegretTrainer(game, i)  # make the regret trainer
        A, B = trainer.main()  # train it and get strategies
    except SyntaxError:
        matrix = "Ill formed input."
        A, B = [], []

    return jsonify({
        "iterations": i,
        "strategyA": A,
        "strategyB": B
    })


# print("\nRock Paper Scissors")
# rpsGame = RPS()
# trainerRPS = RegretTrainer(rpsGame)
# trainerRPS.main()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", 8080)))

# Battle of Genders
# http://127.0.0.1:8080/train?matrix=[[[2,1],[0,0]],[[0,0],[1,2]]]&iterations=10000

# Avatar
# http://127.0.0.1:8080/train?matrix=[[[0, 0],[1,-1],[0,0],[-1,1]],[[-1,1],[0,0],[1,-1],[0,0]],[[0,0],[-1,1],[0,0],[1,-1]],[[1,-1],[0,0],[-1,1],[0,0]]]&iterations=10000
