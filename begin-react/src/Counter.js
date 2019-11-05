import React, { useReducer } from 'react';

// reducer이란? 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
function reducer(state, action){
    switch (action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

function Counter() {
    // dispatch = 액션을 발생시키는 함수로, dispatch({ type:'INCREMENT'}) 와 같이 사용
    const [number,dispatch] = useReducer(reducer,0);
    const onIncrease = () => {
        dispatch({ type : 'INCREMENT' });
    }
    const onDecrease = () => {
        dispatch({ type : 'DECREMENT' });
    }

    return (
        <>
            <h1>{number}</h1>
            <button onClick = {onIncrease}>+1</button>
            <button onClick = {onDecrease}>-1</button>
        </>
    )
}
export default Counter;
// import React, { useState } from "react";

// function Counter() {
//     const [number, setNumber] = useState(0);

//     const onIncrease = () => {
//         // setNumber(number + 1);
//         setNumber(prevNumber => prevNumber + 1);
//     }
//     const onDecrease = () => {
//         // setNumber(number - 1);    
//         setNumber(prevNumber => prevNumber - 1);
//     }
//     const style = {
//         width : "100%",
//         textAlign : "center"
//     }
//     return(
//         <div style = {style}>
//             <h1>{number}</h1>
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>
//         </div>
//     )
// }


// export default Counter;