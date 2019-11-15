import React, {
    useRef,
    useReducer,
    useState,
    useMemo,
    useCallback,
    createContext
} from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import produce from "immer";

window.produce = produce;

function countActiveUsers(users) {
    console.log("활성 유저 수를 세는 중...");
    return users.filter(user => user.active).length;
}

// 초기 상태를 컴포넌트 밖으로 분리한다
const initialState = {
    inputs: {
        username: "",
        email: ""
    },
    users: [
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
    switch (action.type) {
        case "CREATE_USER":
            // return {users : state.users.concat(action.user)};
            return produce(state, draft => {
                draft.users.push(action.user);
            });
        case "TOGGLE_USER":
            // return {
            //     ...state,
            //     users: state.users.map(user =>
            //         user.id === action.id ? { ...user, active: !user.active} : user
            //         )
            // };
            return produce(state, draft => {
                const user = draft.users.find(user => user.id === action.id);
                user.active = !user.active;
            });
        case "REMOVE_USER":
            // return {
            //     ...state,
            //     users: state.users.filter(user => user.id != action.id)
            // };
            return produce(state, draft => {
                const index = draft.users.findIndex(
                    user => user.id === action.id
                );
                draft.users.splice(index, 1);
            });
        default:
            return state;
    }
}

// contextAPI 사용부
export const UserDispatch = React.createContext(null);

function App() {
    // const { username, email } = state.inputs;
    const [state, dispatch] = useReducer(reducer, initialState);

    const { users } = state;

    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        <UserDispatch.Provider value={dispatch}>
            <h1>App.js</h1>
            <CreateUser />
            <UserList users={users} />
            <div>활성 사용자 수 : {count}</div>
        </UserDispatch.Provider>
    );
}

export default App;
