import React, { useRef, useState, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
    console.log('활성 유저 수를 세는 중...');
    return users.filter(user => user.active).length;
}

function App() {
    const [inputs, setInputs] = useState({
        username : '',
        email : ''
    });
    const {username, email} = inputs;
    //최적화를 위한 함수형 업데이트 사용
    const onChange = useCallback(
        e => {
            const { name, value } = e.target;
            setInputs(inputs => ({
                ...inputs,
                [name] : value
            }));
        }, []
    );
    // const onChange = useCallback(
    //     e => {
    //         const { name, value } = e.target;
    //         setInputs({
    //             ...inputs,
    //             [name] : value
    //         });
    //     }, [inputs]
    // );

    const [users, setUsers] = useState([
        {
            id: 1,
            username: "velopert",
            email: "public.velopert@gmail.com",
            active: true
        },
        {
            id: 2,
            username: "tester",
            email: "tester@example.com",
            active: false
        },
        {
            id: 3,
            username: "liz",
            email: "liz@example.com",
            active: false
        }
    ]);

    const nextId = useRef(4);
    const onCreate = useCallback(
        () => {
            console.log("전 onCreate입니다")
            const user = {
                id : nextId.current,
                username,
                email
            };
            // 함수형 업데이트 사용
            setUsers(users =>users.concat(user));
            // setUsers([...users, user]);
            // setUsers(users.concat(user));
            setInputs({
                username : '',
                email : ''
            });
            nextId.current += 1;
        }, [username,email]);

    const onRemove = useCallback(
        id => {
            // user.id 가 파라미터와 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
            // = 즉, user.id 가 id 인 것을 제거
            setUsers(users => users.filter(user => user.id !== id));
        },[]
    )

    const onToggle = useCallback(
        id => {
            setUsers(users => 
                // 클릭한 id와 같은 user만 active의 상태를 반대로 바꿔준다
                users.map(user => (user.id === id) ? {...user, active: !user.active} : user)
            )
        },[]
    )

    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        <>
            <h1>App.js</h1>
            <CreateUser 
                username = {username}
                email = {email}
                onChange = {onChange}
                onCreate = {onCreate}
            />
            <UserList users = {users} onRemove = {onRemove} onToggle = {onToggle} />
            <div>활성 사용자 수 : {count}</div>
        </>
    );
}

export default App;
