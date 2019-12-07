Modern React 강의를 통해 새롭게 알게된 내용 위주로 정리합니다. 🙆🏻‍♀️

## axios

대표적인 메소드로는 4가지가 있다.

- **GET**: 데이터 조회
- **POST**: 데이터 등록
- **PUT**: 데이터 수정
- **DELETE**: 데이터 제거

+) [PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH), [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD) 와 같은 메서드들도 있음!

[사용법]

```react
import axios from 'axios';

// get 뒤에는 API의 주소를
axios.get('/users/1'); 

// 새 데이터를 추가할 때는 첫번째 파라미터에 API 주소를, 두번째 파라미터에 등록할 정보를!
axios.post('/users', {
  username: 'blabla',
  name: 'blabla'
});
```



## useState 와 useEffect 로 비동기 요청 보내기

서버에 요청을 보내는건 오래 걸린다 > 렌더링을 block 하지 않도록 비동기로 처리 w/useEffect

```react
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작할때 error 와 users 를 초기화하고
        setError(null);
        setUsers(null);
        // loading 상태를 true 로 바꾼다
        setLoading(true);
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
        setUsers(response.data); // 데이터는 response.data 안에 들어있음!
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);
```

