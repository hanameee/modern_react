import React, { useState, useRef } from "react";

function MultipleInputSample() {
    const [inputs, setInputs] = useState({
        name: "",
        nickname: ""
    });
    const nameInput = useRef(); // useRef를 사용해 ref 객체를 만들고 이를 nameInput 변수에 할당

    console.log(inputs);
    const { name, nickname } = inputs; // 비구조화 할당을 통해 inputs에서 값 추출

    const onChange = e => {
        const { value, name } = e.target; // e.target (=이벤트가 발생한 input 태그)에서 value와 name 추출
        setInputs({
            ...inputs, // immutable 을 위해 기존 inputs를 복사해 새로운 객체를 변화시키고, 이를 상태로 사용한다
            [name]: value // name 키를 가진 값을 value로 설정
        });
    };
    const onReset = () => {
        setInputs({
            name: "",
            nickname: ""
        });
        nameInput.current.focus()
    };
    return (
        <div>
            <input
                name="name"
                value={name}
                onChange={onChange}
                placeholder="이름"
                // nameInput ref객체를 우리가 선택하고 싶은 DOM의 ref 값으로 설정해준다 - 그럼 ref 객체의 .current 값은 이 DOM을 가르키게 된다
                ref={nameInput}
            />
            <input
                name="nickname"
                value={nickname}
                onChange={onChange}
                placeholder="닉네임"
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                이름: {name} 닉네임: {nickname}
            </div>
        </div>
    );
}

export default MultipleInputSample;
