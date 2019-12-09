import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Profiles from "./Profiles";

function App() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/profiles">Profile</Link>
                </li>
            </ul>
            <hr />
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/profiles" component={Profiles} />
        </div>
    );
}

export default App;
