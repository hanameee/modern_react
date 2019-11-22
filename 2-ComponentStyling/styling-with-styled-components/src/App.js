import React from "react";
import styled, { css, ThemeProvider } from "styled-components";
import Button from "./Button";

// const Circle = styled.div`
//     width: 5rem;
//     height: 5rem;
//     background: ${props => props.color || "black"};
//     border-radius: 50%;
//     ${props =>
//         props.huge &&
//         css`
//             width: 10rem;
//             height: 10rem;
//         `}
// `;

const AppBlock = styled.div`
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
`;

const ButtonGroup = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

function App() {
    return (
        <ThemeProvider
            theme={{
                palette: {
                    blue: "#228be6",
                    gray: "#495057",
                    pink: "#f06595"
                }
            }}
        >
            <AppBlock>
                <ButtonGroup>
                    <Button size="large" outline>
                        BUTTON
                    </Button>
                    <Button>BUTTON</Button>
                    <Button size="small">BUTTON</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button color="gray" size="large">
                        BUTTON
                    </Button>
                    <Button color="gray">BUTTON</Button>
                    <Button color="gray" size="small">
                        BUTTON
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button color="pink" size="large">
                        BUTTON
                    </Button>
                    <Button color="pink">BUTTON</Button>
                    <Button color="pink" size="small">
                        BUTTON
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button size="large" fullWidth>
                        BUTTON
                    </Button>
                    <Button size="large" color="gray" fullWidth>
                        BUTTON
                    </Button>
                    <Button size="large" color="pink" fullWidth>
                        BUTTON
                    </Button>
                </ButtonGroup>
            </AppBlock>
        </ThemeProvider>
    );
}

export default App;
