import React from 'react';

function Wrapper({children}) {
    const style = {
        border : '2px solid black',
        display : 'flex',
        flexWrap : 'wrap',
        justifyContent :'center'
    };

    return (
        <div style = {style}>
            {children}
        </div>
    )
}

export default Wrapper;