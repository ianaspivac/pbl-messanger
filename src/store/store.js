import {createStore} from "redux";

const initialState = {
  isLoggedIn: !!localStorage.getItem("userId"),
  userId: localStorage.getItem("userId"),
  token: localStorage.getItem("token")
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload.id,
        token: action.payload.token,
        isLoggedIn: true
      };

    case "LOGOUT":
      return {
        ...state,
        userId: "",
        token: "",
        isLoggedIn: false
      };

    default:
      return state;
  }
};

const store = createStore(authReducer);
export default store;