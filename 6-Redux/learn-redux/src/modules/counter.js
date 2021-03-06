/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주는 것이 좋다. (다른 모듈과 액션 이름이 중복되는 것을 방지)
const SET_DIFF = "counter/SET_DIFF";
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 해주기 - dispatch 를 좀 더 편리하게 하기 위해서 만들어 주는 것
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* 초기 상태 선언 */
// 리듀서의 초기 상태는 꼭 객체타입일 필요는 없음. 배열이여도 되고, 원시 타입 (숫자, 문자열, 불리언 이여도 상관 없음.
const initialState = {
    number: 0,
    diff: 1
};

/* 리듀서 선언 */
// 리듀서는 default 로 export 해주기
export default function counter(state = initialState, action) {
    switch (action.type) {
        case SET_DIFF:
            return {
                ...state,
                diff: action.diff
            };
        case INCREASE:
            return {
                ...state,
                number: state.number + state.diff
            };
        case DECREASE:
            return {
                ...state,
                number: state.number - state.diff
            };
        default:
            return state;
    }
}
