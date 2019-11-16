import React from "react";
import "./Button.scss";

function Button({ children, size }) {
    return <button className={["Button", size].join(" ")}>{children}</button>;
    // join 말고 className = {`Button ${size}`} 이렇게 할 수도 있다!
}

Button.defaultProps = {
    size: "medium"
};

export default Button;
