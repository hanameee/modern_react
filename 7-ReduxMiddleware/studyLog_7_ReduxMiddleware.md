Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

# Redux Middleware란?

리덕스 미들웨어는 리덕스가 지니고 있는 핵심 기능으로, Context API 또는 MobX를 사용하는것과 차별화가 되는 부분이다.

리덕스 미들웨어를 사용하면 액션이 dispatch 된 다음, 리듀서에서 해당 액션을 받아와서 업데이트하기 전에 **추가적인 작업**을 할 수 있다.

#### 추가적인 작업

- 특정 조건에 따라 액션을 무시하기
- 액션을 콘솔에 출력하거나, 서버쪽에 로깅하기
- 액션이 디스패치 됐을 때 이를 수정해서 리듀서에게 전달하기
- 특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 하기
- 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행하기

가장 많이 사용하는 작업은 **비동기 작업을 처리 할 때** 이다. 예를 들어, 리액트 앱에서 백엔드 API 를 연동해야 된다면, 주로 리덕스 미들웨어를 사용하여 처리하곤 한다.

# Redux Middleware Library

일반적으로는 리덕스 미들에웨어 라이브러리를 설치하여 사용한다.

비동기 작업에 관련된 미들웨어 라이브러리는

-  [redux-thunk](https://github.com/reduxjs/redux-thunk) 
- [redux-saga](https://github.com/redux-saga/redux-saga), 
- [redux-observable](https://redux-observable.js.org/)
- [redux-promise-middleware](https://www.npmjs.com/package/redux-promise-middleware) 

등이 있다.