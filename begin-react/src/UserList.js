import React, { useEffect, useContext } from 'react';
import { UserDispatch } from './App'; // 왜 얘는 괄호 안에서 불러오지?
const User = React.memo(function User({ user }){
    useEffect(() => {
        console.log("[UserList.js] 마운트됨")
        return () => {
            console.log("[UserList.js] 언마운트됨")
        }
    },[])
    const { username, email, id, active} = user;
    const dispatch = useContext(UserDispatch)
    return (
        <div>
            <b style = {{
                cursor: 'pointer',
                color: active ? 'green' : 'black' 
                }}
               onClick = {() => dispatch({
                   type :'TOGGLE_USER',
                   id
               })}
            >
               {username}
            </b>
            <span>({email})</span>
            <button onClick = {() => dispatch({
                type :'REMOVE_USER',
                id
            }) }>삭제</button>
        </div>
    )
});

function UserList({users}) {
  return (
    <div>
        {users.map(user => (
            <User 
                user = {user} 
                key = {user.id} />
        ))}
    </div>
  );
}

export default React.memo(UserList);