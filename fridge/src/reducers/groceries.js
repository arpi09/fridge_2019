const initialState = {
  groceries: [],
}

const groceriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GROCERIES_SUCCESS':
      const groceries = action.data
      return {
        ...state,
        groceries: groceries
      }
    case 'GET_GROCERIES_ERROR':
      return {
        ...state,
      }
    case 'ADD_GROCERIES_SUCCESS':
      return {
        ...state,
      }
    case 'ADD_GROCERIES_ERROR':
      return {
        ...state,
      }
    case 'REMOVE_GROCERIES_SUCCESS':
      return {
        ...state,
      }
    case 'REMOVE_GROCERIES_ERROR':
      return {
        ...state,
      }
    default:
      return state
  }
}

export default groceriesReducer
