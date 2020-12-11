import React from "react"
import { BrowserRouter, Switch, NavLink, Route } from "react-router-dom"
import whitelotus from "./pictures/whitelotus.jpg"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Home from './components/home'
import Theory from './components/theory'
import Regret from './components/regret'
import Code from './components/code'
import About from './components/about'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar bg="light">
        <Nav className="mr-auto">
        <NavLink to="/home">
          <Navbar.Brand>
            <img
              alt=""
              src={whitelotus}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
              ATLA: Regret Matching
            </Navbar.Brand>
          </NavLink>
          </Nav>
          <Nav>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/theory" >Theory</Nav.Link>
            <Nav.Link href="/regret">Regret</Nav.Link>
            <Nav.Link href="/code">Code</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/theory" component={Theory}/>
          <Route exact path="/regret" component={Regret}/>
          <Route exact path="/code" component={Code}/>
          <Route exact path="/about" component={About}/>
          <Route component={Home} />
        </Switch>
      </div>
      <div className="footer">
        <a href="https://github.com/lenghuang/ATLA-AGT">
          Len Huang &#169; 2020
        </a>
      </div>
    </BrowserRouter>
  );
}

export default App;
