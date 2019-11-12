// import { useState, useReducer, useCallback } from 'react';
// function useInputs(initialForm) {
//     const [form, setForm] = useState(initialForm);
//     const onChange = useCallback(e => {
//         const {name, value} = e.target;
//         // 함수형 업데이트
//         setForm(form => ({...form, [name] : value}));
//     }, []);
//     const reset = useCallback(() => setForm(initialForm), [initialForm]);
//     return [form,onChange,reset]
// }

import { useReducer, useCallback } from 'react';

function reducer(state,action){
    switch(action.type) {
        case 'CHANGE':
            console.log('[useInputs] onChange!');
            return {
                    ...state,
                    [action.name] : [action.value]
                };
        case 'RESET':
            // state 객체의 key들을 받아 다 value를 '' 로 바꿔준다
            return Object.keys(state).reduce((acc,current) => {
                acc[current] = '';
                return acc;
            },{});
        default:
            return state;
    }
}

function useInputs(initialForm) {
    const [form, dispatch] = useReducer(reducer, initialForm);
    //change
    const onChange = useCallback(e => {
        const {name, value} = e.target;
        dispatch({
            type :'CHANGE',
            name,
            value
        })
    }, []);
    //reset
    const reset = useCallback(() => dispatch({
        type : 'RESET'
    }), []);
    return [form, onChange, reset];
}


export default useInputs;