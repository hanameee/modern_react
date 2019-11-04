import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }){
    useEffect(() => {
        console.log("[UserList.js] user 값이 설정됨")
        console.log(user)
        return () => {
            console.log("[UserList.js] user 이 바뀌기 전?")
            console.log(user)
        }
    })
    return (
        <div>
            <b style = {{
                cursor: 'pointer',
                color: user.active ? 'green' : 'black' 
                }}
               onClick = {() => onToggle(user.id)}
            >
               {user.username}
            </b>
            <span>({user.email})</span>
            <button onClick = {() => onRemove(user.id)}>삭제</button>
        </div>
    )
}

function UserList({users, onRemove, onToggle}) {
  return (
    <div>
        {users.map(user => (
            <User user = {user} onRemove = {onRemove} onToggle = {onToggle} key = {user.id} />
        ))}
    </div>
  );
}

export default UserList;