import React, { useState } from "react"
import { Link } from "react-router-dom"

const Title = () => {
    return (
        <div className="title">
            <h1> Regret Matching in Avatar the Last Airbender </h1>
            <i><h4> Game theory, regret minimization, and two person normal form games </h4></i>
        </div>);
}

// Takes in a 2D array and renders its elements
const RenderTable = ({table}) => {
    var matrix = []
    for(var i = 0; i < table.length; i++){
        matrix.push([String(i)].concat(table[i].map(x => String(x))))
    }
    console.log(matrix)
    return (
        <span>lol</span>
    )
}

function Home() {
    const RPS = [[[0, 0], [-1, 1], [1, -1]], [[1, -1], [0, 0], [-1, 1]], [[-1, 1], [1, -1], [0, 0]]]
  return (
    <div className="central-card">
        {Title()}
        <div className="content">
            If you would like to learn more about what this is, be sure to first read up
            on <Link to="/theory">game theory</Link>. After that, explore how the algorithm
            works by exploring the notion of <Link to="/regret">regret</Link>. Finally, feel
            free to explore the <Link to="/code">code</Link> for this implementation and learn
            more what this project was for in the <Link to="/about">about</Link> section.
        </div>
        <div className="content">
            <RenderTable table={RPS} />
        </div>
    </div>
  );
}

export default Home;
