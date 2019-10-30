Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

## HOC 관련
### Fragment 단축 문법

Fragment란? JSX의 제약사항 중 하나인 "가장 상위에는 하나의 태그만 존재할 것" 을 만족시키기 위한 문법으로, **DOM에 별도의 노드를 추가하지 않고 (ex. <div>) 여러 자식을 그룹화**할 수 있다.

[공식 API](https://ko.reactjs.org/docs/fragments.html)

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

