const initialState = {
  logedIn: false,
  data: null
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const items = action.data
      return {
        ...state,
        logedIn: true,
        data: items
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
