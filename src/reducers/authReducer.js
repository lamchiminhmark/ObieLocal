const initState = {
  err: undefined,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        err: undefined,
      };
    case 'SIGN_UP_ERROR':
      return {
        ...state,
        err: action.err,
      };
    default:
      return state;
  }
};
