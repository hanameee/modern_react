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

#### ThemeProvider

[공식 API 문서](ThemeProviderhttps://www.styled-components.com/docs/api#themeprovider)

ThemeProvider을 사용해서 **styled-components 로 만드는 모든 컴포넌트에서 조회하여 사용 할 수 있는 전역적인 값을 설정**할 수 있다.

⚠️ ThemeProvider 내부는 하나의 리액트 엘리먼트로 감싸져있어야 한다.

[사용법]

`App.js`

```react
// ThemeProvider import 해오기
import styled, { ThemeProvider } from 'styled-components';
...

function App() {
  return (
    // ThemeProvider로 전역 값 (객체) 설정
    <ThemeProvider
      theme={{
        palette: {
          blue: '#228be6',
          gray: '#495057',
          pink: '#f06595'
        }
      }}
    >
      <AppBlock>
        <Button>BUTTON</Button>
      </AppBlock>
    </ThemeProvider>
  );
}
...
```
ThemeProvider 에서 theme으로 설정한 값은 ThemeProvider 컴포넌트 내부에 렌더링된 styled-components로 만든 컴포넌트에서 palette를 조회해서 사용할 수 있다!

`Button.js`

```react
import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const StyledButton = styled.button`
	...
  /* 이런 식으로 props.theme.palette 를 조회해서 사용할 수 있다 */
  ${props => {
    const selected = props.theme.palette.[props.color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }}

```

#### nested CSS 문법

DialogBlock 안에 h3과 p 태그가 있을 때, 굳이 각각을 styled component로 만들지 않고도 **Nested CSS 문법**을 사용해 한꺼번에 특정 스타일을 줄 수 있다.

```react
const DialogBlock = styled.div``;
const Title = styled.h3``;
const Description = styled.p``;
// 위처럼 하나하나 선언해줄 필요가 없고

const DialogBlock = styled.div`
h3 {}
p {}
`
// 이렇게 DialogBlock 내에서 한꺼번에 작성해서 h3과 p에게 특정 스타일을 줄 수 있다!
```



## polished 라이브러리

```bash
$ yarn add polished
```

SCSS 에서 사용했던 `lighten()` `darken()` 같은 유틸함수를 styled component 에서도 사용할 수 있게끔 해주는 라이브러리 **polished**!



