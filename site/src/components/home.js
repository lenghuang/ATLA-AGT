import React, { useState } from "react"
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'

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
    if(table.length === 0){
        return (
            <div> Ill-formed Table</div>
        )
    } else {
        var first = []
        for(var i = 0; i < table[0].length; i++) {
            first.push("B action " + String(i + 1))
        }
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {[<th key={"HeaderFirst"}></th>].concat(
                            first.map((s,i) => <th key={"Header" + i}>{s}</th>)
                        )}
                    </tr>
                </thead>
                <tbody>
                {table.map((row, i) =>
                    <tr key={i}>
                        {[<td key={"BodyFirst" + i}><b>A action {i}</b></td>].concat(
                            row.map((e,j) => <td key={"BodyRow" + i + "Col" + j}>{String(e)}</td>)
                        )}
                    </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}

function Home() {

    const RPS = [[[0, 0], [-1, 1], [1, -1]], [[1, -1], [0, 0], [-1, 1]], [[-1, 1], [1, -1], [0, 0]]]
    const ATLA = [[[0, 0], [1, -1], [0, 0], [-1, 1]], [[-1, 1], [0, 0], [1, -1], [0, 0]], [[0, 0], [-1, 1], [0, 0], [1, -1]], [[1, -1], [0, 0], [-1, 1], [0, 0]]]
    const [table, setTable] = useState(ATLA)
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
            <RenderTable table={table} />
        </div>
    </div>
  );
}

export default Home;
