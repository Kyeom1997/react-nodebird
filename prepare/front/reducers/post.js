export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "행갬",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://velog.velcdn.com/images/hang_kem_0531/post/da39edf1-77ba-410d-9a12-6dc814e5b5e2/image.jpg",
        },
        {
          src: "https://velog.velcdn.com/images/hang_kem_0531/post/f0259ee3-432e-498c-85ef-4b0ffa811050/image.jpg",
        },
        {
          src: "https://velog.velcdn.com/images/hang_kem_0531/post/80454002-839e-45e7-953f-26d883aacee5/image.jpeg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "banhera",
          },
          content: "정말 열심히 했구나!",
        },
        {
          User: {
            nickname: "hang_ke_mi",
          },
          content: "멋져요~",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    name: "행갬",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
