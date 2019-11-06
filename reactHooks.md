# React Hook 정리

## 1. useState

### useState 쓰임새

- 함수형 컴포넌트에서 state를 관리하기 위해 사용
- **리턴값** : 상태 유지 값(`state`)과,  그 값을 갱신하는 함수(`setState`)를 리턴
- **파라미터** : 첫 번째 전달된 파라미터(`initialState`)는 최초 렌더링 시 반환되는 state 값

### useState 사용법

```react
// state에는 initialState가 저장됨
const [state, setState] = useState(initialState)
// 초기 렌더링 이후 렌더링 시에 initialState는 무시됨
```

### setState 사용법

**setState** 는 state를 갱신할 때 사용하며, 새 state 값을 받아 컴포넌트 리렌더링을 queue에 등록.

1) 새로운 state를 값으로 전달

```react
setState(newState);
```

2) 이전 state를 사용해서 새로운 state를 계산하는 함수를 전달 (함수형 업데이트)

```react
setState(prevState => prevState+1);
```

+) *함수형 업데이트는 setState에 등록하는 콜백함수의 파라미터에서 최신 state를 참조할 수 있기에 이후 useCallback을 사용할 때 deps에 state를 포함하지 않아도 됨* - <u>완벽히 이해 안됨</u>

+) 다음 리렌더링 시에 `useState` 를 통해 반환받은 첫 번째 값은 항상 갱신된 최신 state임

1), 2)를 모두 사용한 카운터 컴포넌트 예시

```react
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
```

```react
// 이렇게 initialCount를 설정해 가져다 쓸 수 있음
<Counter initialCount = {0} />
```



state의 불변성 (immutability) 을 지키기 위해 주로 **spread 연산자**  or **concat** 활용

```react
// spread 연산자 활용
setState(prevState => ({
  ...prevState,
  updatedValues
	})
);

// concat 활용
setState(prevState => prevState.concat(updatedValues))
```



## 2. useEffect



## 3. useRef



## 4. useMemo



## 5. useCallback



## 6. useReducer

