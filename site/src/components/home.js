import React, { useState } from "react"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import axios from "axios"
import Button from 'react-bootstrap/Button'
import RenderTable from "./renderTable"
import LineGraph from "./linegraph"


const Title = () => {
    return (
        <div className="title">
            <h1> Regret Matching in Avatar the Last Airbender </h1>
            <i><h4> Game theory, regret minimization, and two person normal form games </h4></i>
        </div>);
}

function Home() {

    const ATLA = "[[[0,0],[1,-1],[0,0],[-1,1]],[[-1,1],[0,0],[1,-1],[0,0]],[[0, 0],[-1, 1],[0, 0],[1,-1]],[[1,-1],[0,0],[-1,1],[0,0]]]"
    const [table, setTable] = useState(ATLA)
    const [data, setData] = useState(null)

    const getData = () => {
        axios.get("http://127.0.0.1:8080/train?matrix=" + table)
        .then((response) => {
            setData(response.data)
        });
    }

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
                <li>Battle of Genders: [[[2,1],[0,0]],[[0,0],[1,2]]]</li>
                <li>Prisoner's Dilemma: [[[-8,-8],[0,-10]],[[-10,0],[-1,-1]]]</li>
                <li>Rock Paper Scissors: [[[0,0],[-1,1],[1,-1]],[[1,-1],[0,0],[-1,1]],[[-1,1],[1,-1],[0,0]]]</li>
                <li>Aang vs Bang: [[[0,0],[1,-1],[0,0],[-1,1]],[[-1,1],[0,0],[1,-1],[0,0]],[[0, 0],[-1, 1],[0, 0],[1,-1]],[[1,-1],[0,0],[-1,1],[0,0]]]</li>
                <li>Longboi: [[[-8,-8],[0,-10]],[[-10,0],[-1,-1]],[[4,3],[-2,-10]],[[5,7],[3,2]]]</li>
            </ul>
        </div>
        <div style={{paddingTop: "2rem", paddingBottom: "2rem", textAlign: "center", margin: "auto"}}>
            <Button variant="light" size="lg" onClick={getData}>
                Visualize the Learning!
            </Button>{' '}
        </div>
        {data ? <LineGraph data={data} dummy={false}/> : <LineGraph dummy={true}/>}
        <div className="content">
            What you're seeing here is the probability a player picks each action over time according to a regret matching algorithm.
            Want to learn more? Get started by reading up on some <Link to="/theory">game theory</Link>.
        </div>
        <div style={{paddingTop: "2rem", textAlign: "center", margin: "auto"}}>
            <Button variant="light" size="lg" href="/theory">
                Read up on some game theory
            </Button>{' '}
        </div>
        <div className="empty"></div>
    </div>
  );
}

export default Home;
