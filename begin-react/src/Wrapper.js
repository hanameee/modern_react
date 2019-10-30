import React from 'react';

function Wrapper({children}) {
    const style = {
        border : '2px solid black',
        width : '80%',
        padding: '10px',
        margin : '10px auto'
    };

    return (
        <div style = {style}>
            {children}
        </div>
    )
}

export default Wrapper;