import React from 'react';

// function Hello(props) {
//   return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
// }

function Hello({color, name, isSpecial}) {
  return (
    <h1 style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </h1>
  );
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;