import React, { useState } from "react";
import Checkbox from "./components/Checkbox";

function App() {
    const [check, setCheck] = useState(false);
    const onChange = e => {
        setCheck(e.target.checked);
    };
    return (
        <div>
            <Checkbox onChange={onChange} checked={check}>
                다음 약관에 모두 동의
            </Checkbox>
            <p>
                <b>check: </b>
                {check ? "true" : "false"}
            </p>
        </div>
    );
}

export default App;
