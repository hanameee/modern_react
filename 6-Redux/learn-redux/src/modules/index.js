// 두개의 리듀서를 루트 리듀서로 합치기 위해 Redux의 combineReducers 함수 사용
import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
    counter,
    todos
});

export default rootReducer;
