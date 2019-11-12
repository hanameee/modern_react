import React, { useRef, useReducer, useState, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./hooks/useInputs"
function countActiveUsers(users) {
    console.log('활성 유저 수를 세는 중...');
    return users.filter(user => user.active).length;
}

// 초기 상태를 컴포넌트 밖으로 분리한다
const initialState = {
    inputs : {
        username : '',
        email : ''       
    },
    users : [
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
    ]
};

function reducer(state, action) {
    switch(action.type) {
        case 'CREATE_USER':
            return {users : state.users.concat(action.user)};
        case 'TOGGLE_USER':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? { ...user, active: !user.active} : user
                    )
            };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id != action.id)
            };
        default :
            return state;
    }
}

// contextAPI 사용부
export const UserDispatch = React.createContext(null);

function App() {
    // const { username, email } = state.inputs; 
    // inputs를 없애고 useInputs custom hook 로 대체
    const [{username, email}, onChange, reset] = useInputs({
        username :'',
        email : ''
    })
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const { users } = state;

    const onCreate = useCallback(() => {
        console.log(`나는 onCreate고, nextId.current는 ${nextId.current}`);
        dispatch({
            type : 'CREATE_USER',
            user : {
                id : nextId.current,
                username,
                email
            }
        });
        reset();
        nextId.current ++;
    }, [username, email]);

    // const onToggle = useCallback(id => {
    //     dispatch({
    //         type : 'TOGGLE_USER',
    //         id
    //     })
    // }, []);

    // const onRemove = useCallback(id => {
    //     dispatch({
    //         type : 'REMOVE_USER',
    //         id
    //     })
    // }, [])

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
            <UserList users = {users} onToggle = {onToggle} onRemove = {onRemove}/>
            <div>활성 사용자 수 : {count}</div>
        </>
    );
}

export default App;
