Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

## ⭐️ useEffect 관련
### 복습

`useEffect` 란? 기존에 배웠던 class기반 컴포넌트의 Llifecycle Hook에서 componentDidMount (처음 created = first rendered = **마운트** 되었을 때) 와 componentDidUpdate (**업데이트** 되었을 때) 가 합쳐진 것과 유사하다.

useEffect는 반드시 **function** 을 argument로 받음. 이 함수 = useEffect() 를 통해 전달된 함수 = effect 는 모든 render cycle마다 실행된다. 즉, 마운트 & 업데이트 되었을 때 실행된다는 것!

"React 는 effect 를 기억했다가 DOM update가 이뤄진 후에 effect 를 call 한다. 즉, React는 effect 가 실행된 시점에서 update가 이뤄져있는 것을 [보장한다](###짜잔)."

### 사용법

- `useEffect` 의 첫번째 파라미터 = 함수 (effect)

  return을 통해 함수를 반환하면 해당 함수는 `cleanup` 함수 - deps가 비어있는 경우 컴포넌트가 언마운트 될 때 cleanup 함수가 호출된다.

- `useEffect` 의 두번째 파라미터 = 의존값이 들어있는 배열 (deps)

  - deps 배열으로 **빈 배열**을 주면? 컴포넌트가 처음 나타날 때만 effect 함수가 호출된다.
  - deps 배열에 **특정 값**을 주면? 처음 마운트 될 때, 해당 값이 바뀔 때, 언마운트 될 때, 값이 바뀌기 직전에 호출이 됨.
  - deps 배열 (= useEffect()의 두번째 파라미터)을 **생략**하면? 컴포넌트가 Virtual DOM에 리렌더링 될 때마다 호출됨

`useEffect` 안에서 사용하는 상태나, props 가 있다면, `useEffect` 의 `deps` 에 넣어주어야 합니다. 그렇게 하는게, 규칙입니다.

만약 `useEffect` 안에서 사용하는 상태나 props 를 `deps` 에 넣지 않게 된다면 `useEffect` 에 등록한 함수가 실행 될 때 최신 props / 상태를 가르키지 않게 됩니다.

### 마운트/언마운트 관리

**[ 마운트 시에 주로 하는 작업들 ]**

- props 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (ex. REST API)
- 라이브러리 사용 (D3, Video.js 등...)
- setInterval을 통한 반복작업 혹은 setTimeout을  통한 작업 예약

**[ 언마운트 시에 주로 하는 작업들 ]**

- setInterval, setTimeout을 사용하여 등록한 작업들 clear하기 (using clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거



## useMemo 관련

Memo 는 "memoized" - 이전에 계산 한 값을 재사용한다는 의미!

### 사용법

첫번째 파라미터로 어떻게 연산할 지 정의하는 함수를, 두번째 파라미터로 deps 배열을 넣어준다.

- **Deps 배열 안에 넣은 내용이 바뀌면?** 우리가 등록한 함수를 호출해서 값을 연산해주고
- **Deps 배열 안에 넣은 내용이 바뀌지 않았으면?** 이전에 연산한 값을 재사용한다.

`App.js`

```react
function countActiveUsers(users) {
    console.log('활성 유저 수를 세는 중...');
    return users.filter(user => user.active).length;
}
...
// [users]를 deps로 넣어준다!
const count = useMemo(() => countActiveUsers(users), [users])
....
```

이렇게 memo를 사용하지 않으면, users.activer가 바뀔 때 뿐만 아니라 input값이 바뀌어 컴포넌트가 리렌더링 될 때도 항상 countActiveUsers가 실행되게 된다.

memo를 사용해 users가 변경될 때만 함수를 호출해 값을 연산함으로써 성능 최적화가 가능하다.



## useCallback 관련

useCallback은 useMemo와 비슷한 Hook!

|             useMemo             |                     useCallback                      |
| :-----------------------------: | :--------------------------------------------------: |
| 특정 결과값을 재사용 할 때 사용 | 특정 함수를 새로 만들지 않고 재사용 하고 싶을때 사용 |

`App.js`

```react
const onCreate = () => {
  ...
};

const onRemove = id => {
  ...
};
const onToggle = id => {
  ...
};
```

App.js의 `onCreate`, `onRemove`, `onToggle` 은 App 컴포넌트가 리렌더링 될 때마다 새로 만들어진다. (chrome의 render - paint flashing으로 확인 가능)useCallback을 사용해 이 함수들을 재사용할 수 있다.

### 사용법

```react
// 첫번째 파라미터 - 원래 함수, 두번째 파라미터 - deps 배열
const onToggle = useCallback(
  id => {
    setUsers(
      users.map(user => (user.id === id) ? {...user, active: !user.active} : user)
    )
  },[users]
)
```

⚠️ 주의 - 함수 안에서 사용하는 state나 props (props로 받아온 함수 포함)가 있다면 꼭 deps 배열 안에 포함시켜야 함! 넣지 않는다면, 함수 내에서 해당 값들을 참조할 때 가장 최신 값을 참조 할 것이라고 보장할 수 없다.

🤔 **deps에 빈 배열을 넣는거랑, 아예 생략하는거랑 차이가 있나?**

[참고 링크 - What's the difference between `useCallback` with an empty array as inputs and `useCallback` without a second parameter? ](https://stackoverflow.com/questions/55026139/whats-the-difference-between-usecallback-with-an-empty-array-as-inputs-and-u)

정리하자면, `useMemo` 나 `useCallback` 모두 

- 두번째 파라미터인 deps 배열이 빈배열로 주어지면 value는 memoized 된다.
- deps 배열이 생략되면 value는 memoized 되지 않고 어떠한 역할도 하지 못하게 된다.

따라서 deps 배열은 mandatory라고 할 수 있겠다 :)

## React.memo 관련

`React.memo` 를 통해 컴포넌트의 props가 바뀌지 않았다면 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있다. (= 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록)

### 사용법

그냥 해당 함수를 React.memo로 감싸주면 된다. (export 할 때, 혹은 선언할 때)

`UserList.js`

```react
import React, { useEffect } from 'react';

// 이렇게 감싸준다!
const User = React.memo(function User({ user, onRemove, onToggle }){
  ...
});

function UserList({users, onRemove, onToggle}) {
  return (
    <div>
        {users.map(user => (
            <User user = {user} onRemove = {onRemove} onToggle = {onToggle} key = {user.id} />
        ))}
    </div>
  );
}
// 요렇게 감싸준다!
export default React.memo(UserList);
```

+)추가적으로, React.memo 에서 두번째 파라미터에 `propsAreEqual` 이라는 함수를 사용하여 특정 값들만 비교를 하는 것도 가능함

```javascript
export default React.memo(
  UserList,
  (prevProps, nextProps) => prevProps.users === nextProps.users
);
```

하지만, 이걸 잘못사용한다면 오히려 의도치 않은 버그들이 발생하기 쉽습니다. 예를 들어서, 함수형 업데이트로 전환을 안했는데 이렇게 users 만 비교를 하게 된다면, onToggle 과 onRemove 에서 최신 users 배열을 참조하지 않으므로 심각한 오류가 발생 할 수 있다.

## 함수형 업데이트 관련

모든 함수(onCreate, onToggle, onRemove)의 useCallback에 `users` 가 deps에 포함되어 있기 때문에, users 배열 중 하나라도 변경되면 모든 user 들이 변경되고, 각 함수들이 새로 만들어지게 된다.

이걸 최적화 하기 위해선 함수들의 deps에서 users를 지우고, 대신 setUsers 에 다음 상태를 파라미터로 넣어주는 것이 아니라, 값을 업데이트 하는 함수를 파라미터로 넣어준다! (=함수형 업데이트)

이렇게 하면 setUsers 에 등록하는 콜백함수의 파라미터에서 최신 `users` 를 참조할 수 있기에 deps에 users를 넣지 않아도 됨. 따라서 하나의 user가 바뀌었다고 매번 모든 users가 리렌더링 되지 않음.



### ⚠️ 최적화 관련 주의사항

`useCallback`, `useMemo`, `React.memo` 는 컴포넌트의 성능을 실제로 개선할수있는 상황에서만 해라!

예를 들어서, User 컴포넌트에 `b` 와 `button` 에 `onClick` 으로 설정해준 함수들은, 해당 함수들을 `useCallback` 으로 재사용한다고 해서 리렌더링을 막을 수 있는것은 아니므로, 굳이 그렇게 할 필요 없다.

추가적으로, **렌더링 최적화 하지 않을 컴포넌트에 React.memo 를 사용하는것은, 불필요한 props 비교만 하는 것**이기 때문에 실제로 렌더링을 방지할 수 있는 상황이 있는 경우에만 사용하자!



## useReducer 관련

상태를 관리할 때 useState 말고도 useReducer을 사용할 수 있다. 이 Hook 함수를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있다. (컴포넌트 바깥에 작성하거나, 다른 파일에 작성 후 불러와서 사용하거나)

[참고] Reducer이란? 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수.

```react
function reducer(state, action) {
  // 새로운 상태를 만드는 로직
  // const nextState = ...
  return nextState;
}
```

Reducer에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 됨.

- state는 현재 상태:
- action은 업데이트를 위한 정보를 가지고 있으며 주로 type 값을 지닌 객체 형태로 사용함 

예시는 아래와 같음.

```react
// 카운터에 1을 더하는 액션
{
  type: 'INCREMENT'
}
// 카운터에 1을 빼는 액션
{
  type: 'DECREMENT'
}
// input 값을 바꾸는 액션
{
  type: 'CHANGE_INPUT',
  key: 'email',
  value: 'tester@react.com'
}
// 새 할 일을 등록하는 액션
{
  type: 'ADD_TODO',
  todo: {
    id: 1,
    text: 'useReducer 배우기',
    done: false,
  }
}
```

### 사용법

```react
const [state, dispatch] = useReducer(reducer, initialState);
```

- state = 우리가 앞으로 컴포넌트에서 사용할 수 있는 상태
- dispatch = 액션을 발생시키는 함수 `dispatch({ type:'INCREMENT'})` 와 같이 사용

useReducer에 넣는 첫번째 파라미터는 **reducer 함수**, 두번째 파라미터는 **초기 상태**



### useReduce 코드 적용 예시

```react
function reducer(state, action) {
  	// action 선언부
    switch(action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                inputs : {
                    ...state.inputs,
                    [action.name] : action.value
                }
            };
        case 'CREATE_USER':
            return {
                inputs : initialState.inputs,
                users : state.users.concat(action.user)
            };
        case 'TOGGLE_USER':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? { ...user, active: !user.active} : user
                    )
            };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id != action.id)
            };
        default :
            return state;
    }
}

function App() {
    const { username, email } = state.inputs; 
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const { users } = state;
		// dispatch 로 액션을 발생시켜 사용하는 부분
    const onChange = useCallback(e => {
        const {name, value} = e.target;
        dispatch({
            type : 'CHANGE_INPUT',
            name,
            value
        });
    }, [])

    const onCreate = useCallback(() => {
        console.log(`나는 onCreate고, nextId.current는 ${nextId.current}`);
        dispatch({
            type : 'CREATE_USER',
            user : {
                id : nextId.current,
                username,
                email
            }
        });
        reset();
        nextId.current ++;
    }, [username, email]);
```



## custom Hooks 관련

input을 관리하는 코드처럼, 컴포넌트를 만들때 특정 로직이 반복되는 경우, custom hooks를 만들어서 반복되는 로직을 쉽게 재사용할 수 있다. 

### 사용법

useState, useEffect, useCallback 등 Hooks를 사용하여 원하는 기능을 구현해주고, 컴포넌트에서 사용하고 싶은 값들을 반환해주면 된다 :)

`useInputs.js`  보통 커스텀 hooks는 이렇게 `use` 라는 키워드로 시작하는 파일을 만들고 그 안에 함수를 작성한다.

```react
import { useState, useCallback } from 'react'

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  // change
  const onchange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({...form, [name]: value}));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;
```

이렇게 Input과 관련된 로직 (onChange, reset) 을 분리했으니,  `App.js` 에서도 기존 Input과 관련된 로직을 지워주고 useInputs로 대체한다.

```react
import React, { useRef, useReducer, useState, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./hooks/useInputs"
function countActiveUsers(users) {
    console.log('활성 유저 수를 세는 중...');
    return users.filter(user => user.active).length;
}

...

function reducer(state, action) {
    switch(action.type) {
        // *case 'CHANGE_INPUT' 삭제
        case 'CREATE_USER':
        		// *state.inputs를 initialState로 돌려놓던 로직 삭제
            return {users : state.users.concat(action.user)};
        case 'TOGGLE_USER':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? { ...user, active: !user.active} : user
                    )
            };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id != action.id)
            };
        default :
            return state;
    }
}

function App() {
    // const { username, email } = state.inputs; 
    // inputs를 없애고 useInputs custom hook 로 대체
    const [{username, email},onChange,reset] = useInputs({
        username :'',
        email : ''
    })
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const { users } = state;

    const onCreate = useCallback(() => {
 
      console.log(`나는 onCreate고, nextId.current는 ${nextId.current}`);
        dispatch({
            type : 'CREATE_USER',
            user : {
                id : nextId.current,
                username,
                email
            }
        });
      	// onCreate에 useInputs 커스텀 hook의 reset 추가
        reset();
        nextId.current ++;
    }, [username, email]);

... // 이후 코드 동일

```



## Context API 관련

리액트의 `Context API` 를 사용하면, 프로젝트 안에서 전역적으로 사용 할 수 있는 값을 관리 할 수 있다. 

앞서 배운 dispatch와 Context API를 사용해 특정 함수를 원하는 컴포넌트에게 전달하기 위해 여러개의 컴포넌트를 거쳐야 하는  복잡한 구조를 해결할 수 있다.

### 사용법

1) `React.createContext` 함수를 사용해 context를 생성한다

```javascript
const UserDispatch = React.createContext(null);
```

- 파라미터 -  Context 의 기본값 (Context 를 쓸 때 값을 따로 지정하지 않을 경우 사용되는 디폴트값)

2) Context를 만든 이후에는 Context 안의 `Provider` 컴포넌트를 통해 Context의 값을 정할 수 있다. ( `value` 라는 값 설정)

```react
<UserDispatch.Provider value={dispatch}>...</UserDispatch.Provider>
```

이렇게 설정해주고 나면, Provider 에 의하여 감싸진 컴포넌트라면 어디서든 Context 의 값을 다른 곳에서 바로 조회해서 사용할 수 있다.

```react
// contextAPI 생성
export const UserDispatch = React.createContext(null);
```

```React
// contextAPI 사용
import { UserDispatch } from './App';
...
// useContext hook 을 사용해서 컴포넌트 내부에서 context를 바로 조회할 수 있다
const text = useContext(MyContext);
// 값 변경 시에는 Provider 사용
<text.Provider value = {something}>...</text.Provider>
```

 

### 예제

text ('Hello?') Props 를 ContextSample 에서  > GrandParent > Parent > Child 로 넘기는 예제

```react
function Child({text}) {
    return <div>안녕하세요? {text}</div>
}

function Parent({text}) {
 return <Child text = {text}/>
}

function GrandParent({text}) {
 return <Parent text = {text}/>
}

function ContextSample() {
   return <GrandParent text = 'Hello?'/>
}
```

이걸 Context API를 사용해서 한꺼번에 넘겨보기

```react
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext('defaultValue')

function Child() {
    const text = useContext(MyContext); // 이 hook 덕분에 Child 내부에서 context를 바로 조회 가능
    return <div>안녕하세요? {text}</div>
}

function Parent() {
    return <Child />
}

function GrandParent() {
    return <Parent />
}

function ContextSample() {
    const [value, setValue] = useState(true);
    return (
        <MyContext.Provider value = {value ? 'GOOD' : 'BAD'}>
            <GrandParent/>
            <button onClick = {()=> setValue(!value)}>CLICK ME</button>
        </MyContext.Provider>
    );
}

export default ContextSample;
```

이렇게 Context API를 사용하면 여러 Child에서 바로 MyContext를 참조할 수 있다.

특정 함수를 여러 component를 거쳐 전달해줘야 한다면, dispatch를 관리해주는 context를 만들어서 사용하면 구조도 깔끔해지고 사용하기 편리하다! 코드는 tutorial 참고.