import React, { useState } from "react";
import Checkbox from "./components/Checkbox";

function App() {
    const [check, setCheck] = useState(false);
    const onChange = e => {
        setCheck(e.target.checked);
    };
    return (
        <div>
            <Checkbox onChange={onChange} checked={check} />
            <p>
                <b>check: </b>
                {check ? "true" : "false"}
            </p>
        </div>
    );
}

export default App;
