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

서브라우트란? 라우트 내부의 라우트를 만드는 것을 의미함.

[사용법]

컴포넌트를 만들고 그 안에 또 Route 컴포넌트를 렌더링하면 됨 :)

```react
import React from "react";
// Route 컴포넌트 import
import { Link, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
    return (
        <div>
            <h3>유저 목록</h3>
            <ul>
                <li>
                    <Link to="/profiles/hannah">hannah</Link>
                </li>
                <li>
                    <Link to="/profiles/jeongho">jeongho</Link>
                </li>
            </ul>
            <Route
                path="/profiles"
                exact
                render={() => <div>유저를 선택해주세요</div>}
            />
            <Route path="/profiles/:username" component={Profile} />
        </div>
    );
};

export default Profiles;

```

`<Route path="/profiles" exact render={() => <div>유저를 선택해주세요</div>/>`

위와 같이 Route 컴포넌트에서 component 대신 **render**을 사용해 JSX를 리턴할 수도 있다. 이렇게 JSX 렌더링을 하게 되면, 상위에서 props나 기타 필요한 값들을 전달해 줄 수도 있다.

# Extra functions of Router

## history

History 객체는 라우트로 사용된 컴포넌트에게 match, location 과 함께 전달되는 props 중 하나로, History 객체를 통해 우리가 컴포넌트 내에 구현하는 메소드에서 라우터에 직접 접근을 할 수 있다. (뒤로가기, 특정 경로로 이동, 이탈 방지 등)

```react
import React, { useEffect } from "react";

function HistorySample({ history }) {
  	// 뒤로가기
    const goBack = () => {
        history.goBack();
    };
  	// 특정 경로로 이동
    const goHome = () => {
        history.push("/");
    };
    useEffect(() => {
        console.log(history);
      	// 이탈 방지 메세지
        const unblock = history.block("정말 떠나실건가요? T^T");
        return () => {
            unblock();
        };
    }, [history]);

    return (
        <div>
            <button onClick={goBack}>뒤로가기</button>
            <button onClick={goHome}>홈으로</button>
        </div>
    );
}

export default HistorySample;

```

## withRouter HOC

라우터 컴포넌트가 아닌 곳에서 match, location, history를 사용해야 할 때 withRouter HOC를 사용하면 된다.

withRouter을 사용하면 자신의 부모 컴포넌트 기준의 match 값이 전달되는 것에 유의!

## switch

switch는 여러 Route 들을 감싸서 그 중 규칙이 일치하는 라우트 단 하나만을 렌더링시켜준다. Switch 를 사용하면, 아무것도 일치하지 않았을때 보여줄 Not Found 페이지를 구현할 수도 있음.

## NavLink

NavLink는 Link와 유사하나, 만약 현재 경로와 Link에서 사용하는 경로가 일치할 경우 특정 스타일 혹은 클래스를 적용할 수 있는 컴포넌트!

```react
<ul>
  <li>
    <NavLink
      to="/profiles/hannah"
      activeStyle={{ background: "black", color: "white" }}
      >
      hannah
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/profiles/jeongho"
      activeStyle={{ background: "black", color: "white" }}
      >
      jeongho
    </NavLink>
  </li>
</ul>
```

요런 식으로 `activeStyle` 을 통해 현재 위치한 경로에 style을 줄 수 있고, 직접 스타일을 작성하는 것이 아니라 CSS 클래스를 적용하고 싶다면 `activeStyle` 대신 `activeClassName` 을 사용하면 됨!

## 기타

이 외의 리액트 라우터 기능들

- **[Redirect](https://reacttraining.com/react-router/web/example/auth-workflow)**: 페이지를 리다이렉트 하는 컴포넌트
- **[Prompt](https://reacttraining.com/react-router/web/example/preventing-transitions)**: 이전에 사용했던 history.block 의 컴포넌트 버전
- **[Route Config](https://reacttraining.com/react-router/web/example/route-config)**: JSX 형태로 라우트를 선언하는 것이 아닌 Angular 나 Vue 처럼 배열/객체를 사용하여 라우트 정의하기
- **[Memory Router](https://reacttraining.com/react-router/web/api/MemoryRouter)** 실제로 주소는 존재하지는 않는 라우터. 리액트 네이티브나, 임베디드 웹앱에서 사용하면 유용하다.

그 외의 것들은 [공식 매뉴얼](https://reacttraining.com/react-router/web/guides/philosophy) 참고!

