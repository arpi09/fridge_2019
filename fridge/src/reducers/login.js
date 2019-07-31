import moment from 'moment'

const initialState = {
  logedIn: false,
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        logedIn: true,
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
