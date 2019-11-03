const initialState = {
  logedIn: false,
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const items = action.data
      return {
        ...state,
        logedIn: true,
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        logedIn: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        logedIn: false,
      }
    default:
      return state
  }
}

export default loginReducer
