Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

## createGlobalStyle

[공식 API 문서](https://www.styled-components.com/docs/api#createglobalstyle)

styled component에서 특정 component를 styling하는게 아니라, 글로벌 스타일을 추가하고 싶을 때 `createGlobalStyle` 을 사용한다.

```react
import React from 'react';
import { createGlobalStyle } from 'styled-components';

// 이렇게 createGlobalStyle 함수를 사용하면 컴포넌트가 만들어짐
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
    	// 이 컴포넌트를 렌더링하면 됨
      <GlobalStyle />
      <div>안녕하세요</div>
    </>
  );
}

export default App;
```



## Component Selector

[공식 API 문서](https://www.styled-components.com/docs/advanced#referring-to-other-components)

`TodoItemBlock.js`

```react
const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;
```

Styled component는 자동으로 unique한 className이 생성되기에, 선택자의 중첩에 대해 걱정할 필요 없이 className을 가지고 targeting이 가능하다.

단, 이건 styled로 감싸진 **styled component** 에 대해서만 성립한다는 것에 유의할 것!

예제에서는 TodoItemBlock 에서 hover 될 시 Remove가 보이는 것으로 짰는데, 나는 이 코드가 Remove에 함께 작성되어 있는 것이 더 직관적이라고 생각되어 아래와 같이 수정했다. 

```react
const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #ff6b6b;
    }
    display: none;
    ${TodoItemBlock}:hover & {
            display: block;
        }
    }
`;
```



## Context API를 활용한 상태 관리

 ### Context API 복습

[용도]

프로젝트 안에서 전역적으로 사용할 수 있는 값 관리.

[사용법]

1) `React.createContext` 함수를 사용해 context 를 생성

```react
const ContextName = react.createContext(null);
// createContext의 파라미터 = context의 default 값
```

2) 생성한 context 안의 `Provider` 컴포넌트를 통해 context의 value 설정 가능

```react
<ContextName.Provider value = {valuename}>...</ContextName.Provider>
```

이후 Provider에 의해 감싸진 컴포넌트라면 어디서든 Context의 값을 바로 조회해서 사용 가능 (props 를 타고타고 넘길 필요 없이)

```react
// context 생성 및 export
export const ContextName = React.createContext(null);
```

```react
// useContext hook import 해오기
import React, { useContext } from 'react';
// 타 파일에서 context import 해오기
import { ContextName } from './...'

// useContext hook을 사용해 컴포넌트 내부에서 context 조회 가능
function Sample() {
  const state = useContext(ContextName);
}
```

