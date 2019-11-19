Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

## CSS in JS

CSS in JS란? JS안에 CSS를 작성하기!
styled-components 는 이 CSS in JS 기술을 사용하는 라이브러리 중 가장 인기있는 라이브러리.



## Tagged Template Literal

#### Template Literal

: 문자열 조합을 쉽게 할 수 있게 해주는 ES6 문법

```js
const name = 'react';
const message = `hello ${name}`;

console.log(message);
// "hello react"
```

[참고 링크 - zerocho blog](https://www.zerocho.com/category/ECMAScript/post/5aa7ecc772adcb001b2ed6f3)



## styled-components

Styled-components 를 사용하면 스타일을 입력함과 동시에 해당 스타일을 가진 컴포넌트를 만들 수 있다.

[사용 예시]

```react
import React from 'react';
import styled from 'styled-components';

// div를 스타일링 하고 싶으면 styled.div, input을 스타일링 하고 싶으면 styled.input
const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${props => props.color || 'black'};
  border-radius: 50%;
`;

function App() {
  // 이렇게 prop을 넣어줄 수도 있다
  return <Circle color="blue" />;
}

export default App;
```

여러줄의 CSS 코드를 조건부로 보여주고 싶다면, styled-components 라이브러리의 `css` 를 사용해야 함. css를 불러와서 사용해야 그 스타일 내부에서도 다른 props를 조회할 수 있음.

```react
import React from 'react';
// 이렇게 css를 불러온다!
import styled, { css } from 'styled-components';

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${props => props.color || 'black'};
  border-radius: 50%;
  ${props =>
    props.huge &&
    // 이렇게 css 를 사용해야 스타일 내부에서 다른 props를 조회할 수 있다!
    css`
      width: 10rem;
      height: 10rem;
    `}
`;
function App() {
  return <Circle color="blue" huge />;
}

export default App;
```

