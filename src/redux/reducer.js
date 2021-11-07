const initialState = {
  login_user: null,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "login_user": {
      console.log(action.payload);
      return {
        ...state,
        login_user: action.payload,
      };
    }
    default:
      return state;
  }
}
