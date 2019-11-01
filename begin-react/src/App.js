import React from "react";
import Wrapper from "./Wrapper";
import UserList from "./UserList";

function App() {
    return (
        <div className="App">
            <Wrapper>
                {/* <MultipleInputSample />
                 */}
                 <UserList/>
            </Wrapper>
        </div>
    );
}

export default App;
