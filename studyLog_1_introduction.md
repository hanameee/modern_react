Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

## HOC 관련
### Fragment 단축 문법

Fragment란? JSX의 제약사항 중 하나인 "가장 상위에는 하나의 태그만 존재할 것" 을 만족시키기 위한 문법으로, **DOM에 별도의 노드를 추가하지 않고 (ex. <div>) 여러 자식을 그룹화**할 수 있다.

[📖공식 API 문서](https://ko.reactjs.org/docs/fragments.html)

`기존 방법` : `key` attribute를 사용해야 할 때는 반드시 기존 방법대로 fragment를 명시해줘야 함

```react
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

`새로운 단축 문법` - `<>, </> 로 사용 `

```react
<div id="root"/>
<script type="text/babel">
  function Example() {
    return (
      <>
        Some text.
        <h2>A heading</h2>
        More text.
        <h2>Another heading</h2>
        Even more text.
      </>
     );
  }
  ReactDOM.render(<Example />, document.getElementById('root'));
</script>
```



## Styling 관련

### Inline Styling in JSX - camelCase 네이밍

인라인 스타일은 **객체** 형태로 작성해야 하며, `background-color` 처럼 `-` 로 구분된 스타일들은 backgroundColor 처럼 **camelCase 로 네이밍**해줘야 한다.

```react
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
    </>
  );
}

export default App;
```



## Props 관련 
### 비구조화 할당 (구조 분해)

```react
import React from 'react';

function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
}

export default Hello;
```

Hello가 color, name 처럼 여러개의 prop을 받고 있다. Hello 컴포넌트 내에서 props의 값을 조회할때마다 `props.` 를 입력하고 있는데, 파라미터에서 비구조화 할당을 사용하면 조금 더 간결하게 작성할 수 있다.

```react
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

export default Hello;
```

### defaultProps

컴포넌트에 props를 지정하지 않았을 때 기본값을 설정하기 위해서는 `defaultProps` 값을 설정하면 된다.

`Hello.js`

```react
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

// 아래와 같이 defaultProps 값을 준다
Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
```

`App.js`

App.js에서 name props가 없는 Hello 컴포넌트를 렌더링하면,

```react
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </>
  );
}

export default App;
```

아래와 같이 [이름없음]이 기본값으로 나타난다.

![WXSoZyf](https://i.imgur.com/WXSoZyf.png)



## ⭐️useState 관련

[📖공식 API 문서](https://ko.reactjs.org/docs/hooks-reference.html#usestate)

`useState` 를 통해 함수형 컴포넌트에서 state를 관리할 수 있다.

[사용법]

`const [state, setState] = useState(initialState);`

최초 렌더링 시, 반환된 state(state)는 첫 번째 전달된 인자(initialState)의 값과 같다.

**useState** 를 호출하면 배열이 반환되는데, 첫번째 원소는 **현재 상태**, 두번째 원소는 **Setter 함수**이다

```react
const numberState = useState(0);
// useState(0)을 호출한다. state의 초기값은 0
const number = numberState[0];
// 반환된 배열의 첫번째 원소인 현재상태를 number에 저장하고
const setNumber = numberState[1];
// 반환된 배열의 두번째 원소인 Setter함수를 setNumber에 저장한다
```

원래는 위처럼 코드를 작성해야 하지만, 배열 비구조화 할당을 통해 아래처럼 한번에 간결하게 쓸 수 있음!

```react
const [number, setNumber] = useState(0);
```



### 동적인 값 끼얹기 - counter 예제

`Counter.js`

```react
import React, {useState} from 'react';

function Counter() {
    const [number, setNumber] = useState(0);
    const onIncrease = () => {
        setNumber(number + 1);
    }
    const onDecrease = () => {
        setNumber(number - 1);        
    }
    const style = {
        width : '100%',
        textAlign : 'center'
    }
    
    return(
        <div style = {style}>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;
```

`App.js`

```react
import React from "react";
import Counter from "./Counter";

function App() {
    return (
        <div className="App">
        	<Counter />
        </div>
    );
}

export default App;
```



### 함수형 업데이트

위에서는 `setNumber` 의 파라미터로 업데이트 하고 싶은 **값** 을 넘겨줬다.
이렇게 값을 넘겨주는 대신, 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도 값을 업데이트 할 수 있다.

```react
const onIncrease = () => {
  setNumber(prevNumber => prevNumber + 1);
}
const onDecrease = () => {
  setNumber(prevNumber => prevNumber - 1);
}
```

위의 코드를 보면, setNumber 를 사용 할 때 그 다음 상태(값)를 파라미터로 넘겨주지 않고, **값을 업데이트 하는 함수**를 파라미터로 넣어주었다.

이런 함수형 업데이트는 이후 **컴포넌트 최적화**를 위해 사용한다.

