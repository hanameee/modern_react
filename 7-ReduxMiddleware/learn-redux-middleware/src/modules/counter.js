// 1. 액션 타입
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 2. 액션 생성 함수
export const increase = () => ({
    type: INCREASE
});
export const decrease = () => ({
    type: DECREASE
});

//3. 초기 state tjsdjs
const initialState = 0;

//4. 리듀서 선언
export default function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}
