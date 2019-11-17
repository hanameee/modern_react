import React from "react";
import "./App.scss";
import Button from "./components/Button";

function App() {
    return (
        <div className="App">
            <div className="buttons">
                <Button size="small" onClick={() => console.log("클릭됐다!")}>
                    BUTTON
                </Button>
                <Button>BUTTON</Button>
                <Button size="large">BUTTON</Button>
            </div>
            <div className="buttons">
                <Button size="small" color="gray">
                    BUTTON
                </Button>
                <Button color="gray">BUTTON</Button>
                <Button size="large" color="gray">
                    BUTTON
                </Button>
            </div>
            <div className="buttons">
                <Button size="small" color="pink">
                    BUTTON
                </Button>
                <Button color="pink">BUTTON</Button>
                <Button size="large" color="pink">
                    BUTTON
                </Button>
            </div>
            <div className="buttons">
                <Button size="small" outline>
                    BUTTON
                </Button>
                <Button color="gray" outline>
                    BUTTON
                </Button>
                <Button size="large" color="pink" outline>
                    BUTTON
                </Button>
            </div>
            <div className="buttons">
                <Button size="large" color="gray" fullWidth>
                    BUTTON
                </Button>
                <Button size="large" fullWidth>
                    BUTTON
                </Button>
                <Button size="large" color="pink" fullWidth>
                    BUTTON
                </Button>
            </div>
        </div>
    );
}

export default App;
