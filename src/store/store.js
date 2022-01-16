import {createStore} from "redux";

const initialState = {
  isLoggedIn: !!localStorage.getItem("userId"),
  userId: localStorage.getItem("userId")
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload,
        isLoggedIn: true
      };

    case "LOGOUT":
      return {
        ...state,
        userId: "",
        isLoggedIn: false
      };

    default:
      return state;
  }
};

const store = createStore(authReducer);
export default store;