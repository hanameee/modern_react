Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

# 프로젝트에 Router 적용하기

## 1. 설치

```bash
$ yarn add react-router-dom
```

## 2. index.js 수정

```react
import React from "react";
import ReactDOM from "react-dom";
// 1. BrowserRouter 불러오기
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  	// 2. App 컴포넌트를 BrowserRouter 컴포넌트로 감싸기기 
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();

```

`BrowserRouter` 로 라우터를 적용할 프로젝트를 감싸준다.

## 3. Route

특정 주소에 컴포넌트 연결하기

[사용법]

```react
import React from 'react';
import { Route } from 'react-router-dom';

const App = () => {
  return (
  	<div>
    	<Route path = "주소규칙" component = {보여주고 싶은 컴포넌트}/>
    </div>
  )
}
```

[라우터 주소 규칙]

```react
<Route path="/" component={Home} />
<Route path="/about" component={About} />
```

`/about` 경로는 `/` 규칙과도 일치하기 때문에, 위처럼 설정하면 `/about` 을 입력했을 때 home과 about 컴포넌트가 모두 보여지게 된다. (더 범용적인 주소가 더 세부적인 주소의 부분집합으로 포함되는 것)

이는 각각의 컴포넌트만 보여지게 하려는 우리의 의도와 맞지 않음!  

이럴 때는 `exact` props 를 설정해준다.

```react
<Route path="/" exact={true} component={Home} />
<Route path="/about" component={About} />
```

이러면 정확히 `/` 일때만 (경로가 완벽히 일치할때만) home 컴포넌트가 보여지게 된다.