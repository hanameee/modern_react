import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Profile from "./Profile";

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
            <Route path="/profiles/:username" component={Profile} />
        </div>
    );
}

export default App;
