const myLogger = store => next => action => {
    console.log(action); // 액션 출력
    const result = next(action); // 액션을 다음 미들웨어 (없을 시 리듀서)에게 전달
    // 액션이 리듀서로 전달된 이후의 상태
    console.log("\t", store.getState());
    return result; // 이 반환값은 dispatch(action) 의 결과물이 됨. default = undefined
};
export default myLogger;
