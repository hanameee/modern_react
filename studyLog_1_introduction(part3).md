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