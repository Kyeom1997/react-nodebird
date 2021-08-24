const initialState = {
  name: "kyeom",
  age: 25,
  password: "!godroa0531",
};

const changeNickname = (data) => {
  return {
    type: "CHANGE_NICKNAME",
    data,
  };
};

// (이전상태, 액션) => 다음상태
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_NICKNAME":
      return {
        ...state,
        name: action.data,
      };
  }
};

export default rootReducer;
