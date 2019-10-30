import React, { useState } from "react";

function MultipleInputSample() {
    const [inputs, setInputs] = useState({
        name: "",
        nickname: ""
    });

    console.log(inputs);
    const { name, nickname } = inputs; // 비구조화 할당을 통해 inputs에서 값 추출

    const onChange = e => {
        const { value, name } = e.target; // e.target (=이벤트가 발생한 input 태그)에서 value와 name 추출
        setInputs({
            ...inputs,
            [name]: value // name 키를 가진 값을 value로 설정
        });
    };
    const onReset = () => {
        setInputs({
            name: "",
            nickname: ""
        });
    };
    return (
        <div>
            <input
                name="name"
                value={name}
                onChange={onChange}
                placeholder="이름"
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
