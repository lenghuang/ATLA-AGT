import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from regretEq import RegretTrainer, RPS, ATLA

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources={r"/*": {"origins": "*"}})


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
    # Of form: 1,2,3;1,2,3;...
    matrixEnc = request.args.get('matrix')  # string of a 2D list
    matrix = []

    try:
        if matrixEnc is None:
            raise ValueError
        for r in matrixEnc.split(";"):
            row = []
            if len(r) <= 0:
                raise ValueError
            for c in r.split(","):
                row.append(int(c))
            matrix.append(row)
    except ValueError:
        matrix = "Matrix not encoded correctly"

    return jsonify(matrix)


# print("\nRock Paper Scissors")
# rpsGame = RPS()
# trainerRPS = RegretTrainer(rpsGame)
# trainerRPS.main()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", 8080)))
