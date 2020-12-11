import { BrowserRouter, Switch, NavLink, Route } from "react-router-dom"
import whitelotus from "./pictures/whitelotus.jpg"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar bg="light">
        <Nav className="mr-auto">
        <NavLink to="/">
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
        <Switch></Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
