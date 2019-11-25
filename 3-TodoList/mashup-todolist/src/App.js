import React from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <TodoTemplate>
                <TodoHead />
            </TodoTemplate>
        </>
    );
}

export default App;
