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

## 4. Link

HTML5 의 `<a href = "...">` 는 페이지를 이동시키며 페이지를 아예 새로 불러온다. 페이지를 새로 불러오면 리액트 앱의 state도 초기화되고, rendered 된 컴포넌트들도 다 전부 새로 렌더링되는 결과가 나타나겠지?

따라서 리액트에서는 a 태그 대신 Link 라는 컴포넌트를 사용한다. `Link` 컴포넌트는 [HTML5 History API](https://developer.mozilla.org/ko/docs/Web/API/History) 를 사용하여 브라우저의 주소만 바꾸고 페이지를 새로 불러오지 않는다.

[사용법]

```react
function App() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <hr />
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
        </div>
    );
}
```

## 5. URL 파라미터 사용하기

`Router`은 로드된 route에 대한 여러 유용한 extra information 을 props로 넘겨준다. history, location, match 등등... (react-study section 11참고)

이 중 `match` 객체 안의 params 값을 사용해서 파라미터를 사용할 수 있다. 

+) [match](https://reacttraining.com/react-router/web/api/match) 객체란?
match 객체 안에는 현재의 주소가 `Route` 컴포넌트에서 정한 규칙과 어떻게 일치하는지에 대한 정보가 들어있다. 아래 내용을 참고하자

```react
match: {
  isExact: true
  params: {username: "hannah"}
  path: "/profiles/:username"
  url: "/profiles/hannah"
  __proto__: Object
  staticContext: undefined  
}
```



`Profile.js`

```react
import React from "react";

const profileData = {
    hannah: {
        name: "이해나",
        description: "나아는 해나다아아아으아"
    },
    jeongho: {
        name: "남정호",
        description: "나아는 정호다아아아으아"
    }
};

// props로 제공된 extra information 중 우리가 사용할 것은 match 객체
const Profile = ({ match }) => {
    console.log(match);
  	// 파라미터를 받아올 때는 match 안에 들어있는 params 값을 참조
    const { username } = match.params;
    const profile = profileData[username];
    if (!profile) {
        return <div>존재하지 않는 유저입니다</div>;
    }
    return (
        <div>
            <h3>
                {username} ({profile.name})
            </h3>
            <p>{profile.description}</p>
        </div>
    );
};

export default Profile;

```

`App.js`

```react
<Route path="/profiles/:username" component={Profile} />
```

위와 같이 사용하고 주소에 직접 입력해보자 :)

## Query

**Parameter**이 match 객체의 params 값을 참조했다면, **Query**는 location 객체의 search 값을 참조한다! 

+) [location](https://reacttraining.com/react-router/web/api/location) 객체란?
location 객체 안에는 현재 앱이 갖고있는 주소에 대한 정보가 들어있다. 아래 내용을 참고하자.

```react
location: {
  hash: ""
	key: "gsgk6d"
	pathname: "/about"
	search: ""
	state: undefined
	__proto__: Object
}
```

`About.js`

qs (query string) 라이브러리를 사용해 문자열 형태의 search 값을 객체로 변환해 줄 것임!

```react
import React from "react";
import qs from "qs";

// About 컴포넌트에서 search 값에있는 detail 값을 받아와서
const About = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
   // 그 detail 값이 true 일때 추가정보를 보여주도록!
    const detail = query.detail === "true";
    return (
        <div>
            <h1>ABOUT</h1>
            <p>
                이곳은 어바웃이에요. 이 프로젝트는 리액트 라우터 기초를
                실습해보는 예제 프로젝트랍니다!
            </p>
            {detail && <p>추가적인 정보가 어쩌구 저쩌구</p>}
        </div>
    );
};

export default About;
```

# Subroute

서브라우트란? 라우트 내부의 라우트를 만드는 것을 의미

