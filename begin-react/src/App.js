import React from "react";
import Hello from "./Hello";
import Wrapper from "./Wrapper";
import Counter from "./Counter";

function App() {
    return (
        <div className="App">
            <Wrapper>
                <Hello color="skyblue" name="해나" isSpecial />
                <Counter />
            </Wrapper>
        </div>
    );
}

export default App;
