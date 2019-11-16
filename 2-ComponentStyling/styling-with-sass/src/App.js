import React from "react";
import "./App.scss";
import Button from "./components/Button";

function App() {
    return (
        <div className="App">
            <div className="buttons">
                <Button size="small">BUTTON</Button>
                <Button>BUTTON</Button>
                <Button size="large">BUTTON</Button>
            </div>
        </div>
    );
}

export default App;
