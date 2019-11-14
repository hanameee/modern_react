Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

## 불변성을 위한 immer 라이브러리 관련
### 복습

리액트에서 배열/객체를 업데이트 할때는 직접 수정하면 안되고 불변성을 지키며 업데이트를 해줘야 한다. spread 연산자나 concat, filter, map, reduce 등 배열 내장함수를 사용해서!

하지만 데이터 구조가 까다로워지면, 불변성을 지키며 새로운 데이터를 생성하는 것이 복잡하다. 예를 들어, `posts` 배열 안의 id = 1 인 `post` 객체의 `comments` 속성에 새로운 댓글 객체를 추가해줘야 한다면?

```react
const state = {
  posts: [
    {
      id: 1,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 1,
          text: '와 정말 잘 읽었습니다.'
        }
      ]
    }
   ],
  selectedId: 1
}
// 대충 이런 데이터 구조
```

그렇다면 아래와 같은 코드로 업데이트 할 수 있다.

```react
const nextState = {
  ...state,
  posts: state.posts.map(post =>
    // id 가 1인 post만 아래의 comments를 새롭게 concat 
    post.id === 1
      ? {
          ...post,
          comments: post.comments.concat({
            id: 3,
            text: '새로운 댓글'
          })
        }
      : post
  )
};
```

조금 복잡해서 한눈에 들어오지 않지! 이럴 때 사용하면 편리한 것이 **Immer** 라이브러리.

```react
const nextState = produce(state, draft => {
  // draft 에다가 불변성을 신경쓰지 않고 그냥 작성해도 immer가 대신 불변성 유지를 해준다
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '와 정말 쉽다!'
  });
});
```

### 사용법

```bash
yarn add immer
```

```react
import produce from 'immer'; // 보통 produce란 이름으로 불러온다
```

데이터 구조가 복잡해져서 불변성을 유지하기 힘들어졌을때 immer를 쓰자! 가급적 데이터구조가 복잡해지지 않게 하는 것이 먼저겠지? 🤔

immer를 사용한다고 해도, 필요한 곳에만 쓰는 것이 좋다!



## Class based Component - custom 메서드 this 문제

```react
import React, { Component } from 'react';

class Counter extends Component {
  	// custom method 에서
    handleIncrease() {
        console.log('increase');
        console.log(this) // this가 undefined로 뜬다
    }
    handleDecrease() {
        console.log('decrease');
    }
    render() {
        return (
            <>
                <h1>number</h1>
                <button onClick = {this.handleIncrease}>+1</button>
                <button onClick = {this.handleDecrease}>-1</button>
            </>
        )
    }
}

export default Counter;
```

왜 메서드 내에서 호출한 this가 undefined로 뜰까? 그 이유는 우리가 만든 메서드들을 각 button 들의 이벤트로 등록하게 되는 과정에서 각 메서드와 컴포넌트 인스턴스의 관계가 끊겨버리기 때문!

### 해결법 1) 생성자 메서드 constructor 에서 bind 작업 해주기

```react
class Counter extends Component {
    constructor(props){
        super(props); // super을 호출하는 이유 : 클래스가 컴포넌트로서 작동할 수 있게 해주는 Component쪽의 생성자 함수를 먼저 실행해주고 우리가 할 작업을 하겠다는 뜻
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    }
  ...
```

이렇게 `bind` 작업을 진행해주면 해당 함수에서 가르킬 this를 직접 설정해줄 수 있다. 가장 일반적인 방법 👍

### 해결법 2) arrow function syntax 를 사용해 커스텀 메서드 만들기

⚠️ **주의 : 정식 JS 뭄법이 아니며, Create-React-App 으로 만든 프로젝트에 적용되어있는 문법임**

```react
import React, { Component } from 'react';

class Counter extends Component {
  handleIncrease = () => {
    console.log('increase');
    console.log(this);
  }
  

  handleDecrease = () => {
    console.log('decrease');
    console.log(this)
  };

  render() {
    return (
      <div>
        <h1>0</h1>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
```



## Useful tools - Snippet

코드 조각 =  자주 사용되는 코드에 대하여 단축어를 만들어서 코드를 빠르게 생성해내기!

```react
import React from 'react';

function ${TM_FILENAME_BASE}() { //파일 이름 변수
  return (
  	<div>
    	${1} {/* 코드 생성했을때 텍스트 커서가 맨 처음 위치할 곳*/}
    </div>
  )
}

export default ${TM_FILENAME_BASE};
```

[Snippet Generator 사이트](https://snippet-generator.app/) 에서 변환한 뒤

`Code` > `Preference` > `User Snippets` 의 javascriptreact.json 에 붙여넣기!

이후 prefix (Tab Trigger) 로 등록한 단축키로 사용하면 된다. 언어 설정을 javascriptreact 로 바꿔줘야 한다는 것 유의.