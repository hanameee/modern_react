import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";

function App() {
    return (
        <div>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
        </div>
    );
}

export default App;
