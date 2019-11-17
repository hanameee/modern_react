import React from "react";
import classNames from "classnames";
import "./Button.scss";

function Button({ children, size, color, outline, fullWidth, ...rest }) {
    // return <button className={["Button", size].join(" ")}>{children}</button>;
    // join 말고 className = {`Button ${size}`} 이렇게 할 수도 있다!
    return (
        <button
            className={classNames("Button", size, color, {
                outline,
                fullWidth
            })}
            {...rest}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    size: "medium",
    color: "blue"
};

export default Button;
