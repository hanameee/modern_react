import React, {useState} from 'react';

function SingleInputSample() {
    const [text, setText] = useState('');

    //이벤트 객체 e를 파라미터로 받아와서 사용할 수 있다.
    const onChange = (e) => {
        //e.target은 이벤트가 발생한 DOM(=input DOM), e.target.value는 그 target의 value값
        setText(e.target.value);
    }

    const onReset = () => {
        setText('')
    }
    return(
        <div>
            <input onChange = {onChange} value = {text}/>
            <button onClick = {onReset}>초기화</button>
            <div>
                <b>값 : {text}</b>
            </div>
        </div>
    )
}

export default SingleInputSample;