import os
import ast
from flask import Flask, request, jsonify
from flask_cors import CORS
from regretApi import RegretTrainer, Game

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
            trainer = RegretTrainer(game, 10000)  # make the regret trainer
            A, B = trainer.main()  # train it and get strategies
        except SyntaxError:
            matrix = "Ill formed input."
            A, B = [], []

        response = jsonify({
            "seriesA": A,
            "seriesB": B
        })
        response.headers.add('Access-Control-Allow-Origin',
                             'http://localhost:3000')
    return response


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", 8080)))

# Battle of Genders
# http://127.0.0.1:8080/train?matrix=[[[2,1],[0,0]],[[0,0],[1,2]]]

# Avatar
# http://127.0.0.1:8080/train?matrix=[[[0, 0],[1,-1],[0,0],[-1,1]],[[-1,1],[0,0],[1,-1],[0,0]],[[0,0],[-1,1],[0,0],[1,-1]],[[1,-1],[0,0],[-1,1],[0,0]]]
