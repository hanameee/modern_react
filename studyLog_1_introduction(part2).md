Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

## ⭐️ useEffect 관련
### 복습

`useEffect` 란? 기존에 배웠던 class기반 컴포넌트의 Llifecycle Hook에서 componentDidMount (처음 created = first rendered = **마운트** 되었을 때) 와 componentDidUpdate (**업데이트** 되었을 때) 가 합쳐진 것과 유사하다.

useEffect는 반드시 **function** 을 argument로 받음. 이 함수 = useEffect() 를 통해 전달된 함수 = effect 는 모든 render cycle마다 실행된다. 즉, 마운트 & 업데이트 되었을 때 실행된다는 것!

"React 는 effect 를 기억했다가 DOM update가 이뤄진 후에 effect 를 call 한다. 즉, React는 effect 가 실행된 시점에서 update가 이뤄져있는 것을 보장한다."

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

