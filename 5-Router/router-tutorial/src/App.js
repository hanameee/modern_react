import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Profiles from "./Profiles";
import HistorySample from "./HistorySample";

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
                <li>
                    <Link to="/history">History</Link>
                </li>
            </ul>
            <hr />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/profiles" component={Profiles} />
                <Route path="/history" component={HistorySample} />
                <Route
                    render={({ location }) => (
                        <div>
                            <h2>
                                {location.pathname} 은 존재하지 않는 페이지에요!
                                :(
                            </h2>
                        </div>
                    )}
                />
            </Switch>
        </div>
    );
}

export default App;
