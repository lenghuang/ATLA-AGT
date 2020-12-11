import React, { useState } from "react"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import RenderTable from "./renderTable"

const Title = () => {
    return (
        <div className="title">
            <h1> Regret Matching in Avatar the Last Airbender </h1>
            <i><h4> Game theory, regret minimization, and two person normal form games </h4></i>
        </div>);
}

function Home() {

    const RPS = "[[[0,0],[-1,1],[1,-1]],[[1,-1],[0,0],[-1,1]],[[-1,1],[1,-1],[0,0]]]";
    const ATLA = "[[[0,0],[1,-1],[0,0],[-1,1]],[[-1,1],[0,0],[1,-1],[0,0]],[[0, 0],[-1, 1],[0, 0],[1,-1]],[[1,-1],[0,0],[-1,1],[0,0]]]"
    const [table, setTable] = useState(ATLA)

    const handleChange = (e) => {
        setTable(e.target.value)
    }

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
            <h3> A Two Player Normal Form Game </h3>
            <br />
            <RenderTable table={table} />
            <br />
            <Form>
                <Form.Label> Write Out Your Matrix </Form.Label>
                <Form.Control as="textarea" defaultValue={ATLA}
                              rows={3} onChange={handleChange} />
            </Form>
            <br/>
            Some examples of games you can try:
            <ul>
                <li>Prisoner's Dilemma: [[[-8,-8],[0,-10]],[[-10,0],[-1,-1]]]</li>
                <li>Rock Paper Scissors: [[[0,0],[-1,1],[1,-1]],[[1,-1],[0,0],[-1,1]],[[-1,1],[1,-1],[0,0]]]</li>
                <li>Aang vs Bang: [[[0,0],[1,-1],[0,0],[-1,1]],[[-1,1],[0,0],[1,-1],[0,0]],[[0, 0],[-1, 1],[0, 0],[1,-1]],[[1,-1],[0,0],[-1,1],[0,0]]]</li>
            </ul>
        </div>
        <div className="content">

        </div>
        <div className="empty"></div>
    </div>
  );
}

export default Home;
