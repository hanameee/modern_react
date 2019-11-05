import React, { useEffect } from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }){
    useEffect(() => {
        console.log("[UserList.js] 마운트됨")
        return () => {
            console.log("[UserList.js] 언마운트됨")
        }
    },[])
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
});

function UserList({users, onRemove, onToggle}) {
  return (
    <div>
        {users.map(user => (
            <User user = {user} onRemove = {onRemove} onToggle = {onToggle} key = {user.id} />
        ))}
    </div>
  );
}

export default React.memo(UserList);