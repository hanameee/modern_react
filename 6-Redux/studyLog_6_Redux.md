Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

# Redux란?

리액트 생태계에서 가장 사용률이 높은 상태관리 라이브러리.
리덕스를 사용해 상태관리를 하는 방식은 기존에 우리가 Context API + useReducer Hook 를 사용해 개발했던 방식과 매우 유사함! 리덕스에서도 reducer과 action이라는 개념을 사용하기 때문.

# Redux와 Context API 의 차이는 뭘까? 🤔

## 1. 미들웨어

리덕스에는 미들웨어라는 개념이 존재함. 이 미들웨어를 사용하면 액션 객체가 리듀서에서 처리되기 전에 우리가 원하는 작업들을 수행할 수 있음.

- 특정 조건에 따라 액션이 무시되게 만들기
- 액션을 콘솔에 출력하거나, 서버쪽에 로깅하기
- 액션이 디스패치 됐을 때 이를 수정해서 리듀서에게 전달하기
- 특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 하기
- 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행시키기

이런 미들웨어는 주로 비동기 작업 처리를 할 때 많이 사용됨.

## 2. 유용한 함수들과 Hooks

context API에서는 기능별로 새로 context를 만들고, provider 설정도 하고, context를 편리하게 사용하기 위해 전용 custom hooks도 따로 만들기도 했다.

리덕스에는 이런 작업들을 편리하게 해줄 수 있는 여러 기능들 (함수, hooks들) 이 존재함! 차차 알아boza.

## 3. 하나의 커다란 상태

Context API 를 사용해서 글로벌 상태를 관리 할 때에는 일반적으로 기능별로 Context 를 새롭게 만들어서 사용하는 것이 일반적이다. 반면, 리덕스에서는 모든 글로벌 상태를 하나의 커다란 상태 객체에 넣어서 사용하는 것이 필수!

따라서 매번 Context를 새로 만드는 수고로움을 덜 수 있다.

## 4. 그래서 뭘 써야해? 🤯

주로 프로젝트의 규모가 크거나, 비동기 작업을 많이 해야 할 때 리덕스를 사용하는 편. 일단, 리덕스를 배워봐야 context API를 사용할지 redux를 사용할지 판단할 수 있으니 배워보자!

# 리덕스에서 사용되는 키워드들

`useReducer` 을 사용했을 때 접해본 개념들과 유사하다 :)

## 1. 액션 (Action)

상태에 어떤 변화가 필요할 때, 우리는 **액션**을 발생시킨다. 액션은 하나의 객체이며, 형식은 아래와 같다.

```react
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
```

액션 객체는 `type` 필드를 필수적으로 가지고 있어야 하며, 그 외의 값들은 개발자 맘대로 넣어줄 수 있다!

## 2. 액션 생성함수 (Action Creator)

액션 생성함수는 액션을 만드는 함수! 파라미터를 받아와서 액션 객체 형태로 만들어준다.

```react
export function addTodo(data) {
  return {
    type: 'ADD_TODO',
    data
  };
}
// 화살표 함수로도 만들 수 있다
export const changeInput = text => ({
  type: 'CHANGE_INPUT',
  text
})
```

이런 액션 생성함수를 만들어 사용하는 이유는 나중에 컴포넌트에서 더욱 쉽게 액션을 발생시키기 위해서! 그래서 보통 함수 앞에 export 를 붙여서 다른 파일에서 불러와서 사용함.

## 3. 리듀서 (Reducer)

리듀서는 변화를 일으키는 함수로, 두가지의 파라미터를 받아온다.

```react
function reducer(state,action) {
  // 상태 업데이트 로직
 	return alteredState;
}
```

리듀서는 **현재의 상태**와, **전달 받은 액션**을 참고하여 **새로운 상태를 만들어서 반환**한다.

Ex. 카운터를 위한 리듀서

```react
function counter(state,action) {
  switch(action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
}
```

⚠️ `useReducer` hook 에선 일반적으로 `default:` 부분에 `throw new Error('Unhandled Action')`과 같이 에러처리를 하지만, 리덕스의 리듀서에서는 기존 `state`를 그대로 반환하도록 작성해야한다!

또한, 리덕스를 사용 할 때는 여러개의 리듀서 (Sub Reducer) 들을 만들고 이를 합쳐서 루트 리듀서 (Root Reducer)를 만들 수 있다.

## 4. 스토어 (Store)

리덕스에서는 한 애플리케이션 당 하나의 스토어를 만든다. 스토어 안에는 (1) 현재의 앱 상태와 (2) 리듀서가 들어가 있고, 추가적으로 몇가지 내장 함수들이 있다!

## 5. 디스패치 (Dispatch)

디스패치는 스토어의 내장함수 중 하나로, 액션을 발생시키는 함수다. dispatch(action) 이런식으로 액션을 파라미터로 전달해 호출하고, 이렇게 호출을 하면 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어준다.

## 6. 구독 (subscribe)

구독 또한 스토어의 내장함수 중 하나다. subscribe 함수는, 함수 형태의 값을 파라미터로 받아온다. subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출된다.

리액트에서 리덕스를 사용할 때 보통 subscribe 함수를 직접 사용하는 일은 별로 없고, 그 대신 react-redux 라는 라이브러리에서 제공하는 `connect` 함수 또는 `useSelector` Hook 을 사용하여 리덕스 스토어의 상태를 구독한다.



# 리덕스의 3가지 규칙 🤝

## 1. 하나의 어플리케이션 안엔 하나의 스토어가 있다.

하나의 애플리케이션에선 단 한개의 스토어를 만들어서 사용한다.

## 2. 상태는 "읽기 전용" 이다

상태변화시, 기존의 상태를 건드리지 않고 새로운 상태를 생성하여 업데이트 해주는 방식으로 해야 한다. 이렇게 불변성을 유지하면 나중에 개발자 도구를 통해서 뒤로 돌릴 수도 있고 다시 앞으로 돌릴 수도 있습니다.

리덕스에서 불변성을 유지해야하는 이유는 리덕스에서 내부적으로 데이터가 변경 되는 것을 감지하기 위하여 [shallow equality](https://redux.js.org/docs/faq/ImmutableData.html#how-redux-uses-shallow-checking) 검사를 하기 때문! 이를 통하여 객체의 변화를 감지 할 때 객체의 깊숙한 안쪽까지 비교를 하는 것이 아니라 겉핥기 식으로 비교를 하여 좋은 성능을 유지할 수 있다.

우리는 Immutable.js 혹은 Immer.js 를 사용하여 불변성을 유지하며 상태를 관리하는 방법에 대해서 다뤄볼 것임.

## 3. 변화를 일으키는 함수, 리듀서는 순수함수여야 한다

순수함수란? same input, same output.

- 리듀서 함수는 이전 상태 (state) 와, 액션 객체 (action) 를 파라미터로 받는다.
- 이전의 상태는 절대 건드리지 않고, 변화를 일으킨 새로운 상태 객체를 만들어서 반환한다.
- 똑같은 파라미터로 호출된 리듀서 함수는 **언제나** 똑같은 결과값을 반환해야만 한다.

위 3가지를 반드시 만족해야 함.

실행 할 때마다 다른 결과값이 나타나는 new Date() 나,  난수 생성, 혹은 네트워크에 요청 하는 작업 등은 순수하지 않은 작업이므로, 리듀서 함수의 바깥에서 처리해줘야 함! 그런것을 하기 위해서, [리덕스 미들웨어](https://velopert.com/3401) 를 사용하는 것. 이는 나중에 다룬다.



#리덕스 모듈 만들기

## 리덕스 모듈이란?

리덕스를 사용하기 위해 필요한 다음 항목들이 모두 들어있는 자바스크립트 파일을 의미한다.

- 액션 타입
- 액션 생성함수
- 리듀서

 각 항목들은 각각 별개의 파일에 작성할 수도 있다. 한번에 몰아서 작성해도 무방한데 이렇게 리듀서와 액션 관련 코드들을 하나의 파일에 몰아서 작성하는 것을 [Ducks 패턴](https://github.com/erikras/ducks-modular-redux)이라고 한다.

## 1. 액션 타입 만들기

```react
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주는 것이 좋다. (다른 모듈과 액션 이름이 중복되는 것을 방지)
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
```

## 2. 액션 생성 함수 만들기

```react
// export 키워드를 사용하여 내보내기
export const setDiff = diff => ({
  type: SET_DIFF,
  diff
});

export const increase = () => ({
  tyle: INCREASE
})

export const decrease = () => ({
  tyle: DECREASE
})
```

## 3. 초기 상태 선언하기

```react
const initialState = {
  number: 0,
  diff: 1
}
```

## 4. 리듀서 선언하기

```react
// 리듀서는 export default를 사용하여 내보내기
export default function counter(state = initialState, action){
  switch(action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff
      }
    ...
  }
}
```

# Presentational / Container component

## 프리젠테이셔널 컴포넌트란?

리덕스 스토어에 직접적으로 접근하지 않고, **필요한 값 또는 함수를 props 로만 받아와서 사용**하는 컴포넌트를 의미한다.

 따라서 프리젠테이셔널 컴포넌트에선 주로 보여지는 UI를 선언하는 것에 집중하게 된다.

## 컨테이너 컴포넌트란?

**리덕스 스토어의 상태를 조회하거나, 액션을 디스패치**하는 컴포넌트를 의미한다.

HTML 태그를 직접 사용하지 않고, 다른 프리젠테이셔널 컴포넌트들을 불러와서 prop 또는 함수를 넘겨주어 사용한다.

하나의 패턴일 뿐, 궂이 이렇게 나눌 필요는 없다고 한다. 다만, 아직까진 정석이므로 튜토리얼에서 앞으로의 코드는 이렇게 작성한다고!

