// n milisecond 동안 기다리는 Promise를 만들어주는 함수
const sleep = n => new Promise(resolve => setTimeout(resolve, n));

// fake post 목록 데이터
const posts = [
    {
        id: 1,
        title: "title1",
        body: "body1"
    },
    {
        id: 2,
        title: "title2",
        body: "body2"
    },
    {
        id: 3,
        title: "title3",
        body: "body3"
    }
];

// post 목록을 가져오는 비동기 함수
export const getPosts = async () => {
    await sleep(500);
    return posts;
};

export const getPostById = async id => {
    await sleep(500);
    return posts.find(post => post.id === id);
};
