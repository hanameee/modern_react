import React, { useState } from 'react';

function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);
    // reset 값은 항상 일정함 - setCount에서 값을 리턴 
    const reset = () => {
      setCount(initialCount);
    }
    // onDecrease와 onIncrease는 갱신된 값이 갱신되기 전 값을 바탕으로 계산되므로 setCount에서 함수를 리턴 (함수형 업데이트)
    const onDecrease = () => {
      setCount(prevCount => prevCount - 1);
    }
    const onIncrease = () => {
      setCount(prevCount => prevCount + 1);
    }
    return (
      <>
          Count: {count}
              <button onClick = {reset}>Reset</button>
              <button onClick = {onDecrease}>-</button>
              <button onClick = {onIncrease}>+</button>
      </>
    );
  }

  export default Counter;