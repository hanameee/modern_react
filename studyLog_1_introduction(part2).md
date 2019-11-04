Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

## ⭐️ useEffect 관련
#### 복습

`useEffect` 란? 기존에 배웠던 class기반 컴포넌트의 Llifecycle Hook에서 componentDidMount (처음 created = first rendered = **마운트** 되었을 때) 와 componentDidUpdate (**업데이트** 되었을 때) 가 합쳐진 것과 유사하다.

useEffect는 반드시 **function** 을 argument로 받음. 이 함수 = useEffect() 를 통해 전달된 함수 = effect 는 모든 render cycle마다 실행된다. 즉, 마운트 & 업데이트 되었을 때 실행된다는 것!

"React 는 effect 를 기억했다가 DOM update가 이뤄진 후에 effect 를 call 한다. 즉, React는 effect 가 실행된 시점에서 update가 이뤄져있는 것을 보장한다."

#### 사용법

- `useEffect` 의 첫번째 파라미터 = 함수 (effect)

  return을 통해 함수를 반환하면 해당 함수는 `cleanup` 함수 - deps가 비어있는 경우 컴포넌트가 언마운트 될 때 cleanup 함수가 호출된다.

- `useEffect` 의 두번째 파라미터 = 의존값이 들어있는 배열 (deps)

  - deps 배열으로 빈 배열을 주면? 컴포넌트가 처음 나타날 때만 effect 함수가 호출된다.
  - deps 배열에 특정 값을 주면? 처음 마운트 될 때, 해당 값이 바뀔 때, 언마운트 될 때, 값이 바뀌기 직전에 호출이 됨.
  - deps 배열 (= useEffect()의 두번째 파라미터)을 생략하면? 컴포넌트가 Virtual DOM에 리렌더링 될 때마다 호출됨

`useEffect` 안에서 사용하는 상태나, props 가 있다면, `useEffect` 의 `deps` 에 넣어주어야 합니다. 그렇게 하는게, 규칙입니다.

만약 `useEffect` 안에서 사용하는 상태나 props 를 `deps` 에 넣지 않게 된다면 `useEffect` 에 등록한 함수가 실행 될 때 최신 props / 상태를 가르키지 않게 됩니다.

#### 마운트/언마운트 관리

**[ 마운트 시에 주로 하는 작업들 ]**

- props 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (ex. REST API)
- 라이브러리 사용 (D3, Video.js 등...)
- setInterval을 통한 반복작업 혹은 setTimeout을  통한 작업 예약

**[ 언마운트 시에 주로 하는 작업들 ]**

- setInterval, setTimeout을 사용하여 등록한 작업들 clear하기 (using clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거

