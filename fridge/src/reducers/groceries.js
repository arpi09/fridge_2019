const initialState = {
  groceries: [],
  groceryHistory: []
}

const groceriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GROCERIES_SUCCESS':
      const groceries = action.data
      let expired = 0
      let close = 0

      for(let i = 0; i < groceries.length; i++) {
        const today = Date.now()
        const currentDate = new Date(groceries[i]['expireDate'])
        const diffTime = currentDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays <= 0) {
          expired++
        }
        if (diffDays < 3 && diffDays > 0) {
          close++
        }
      }
      return {
        ...state,
        expired: expired,
        close: close,
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
    case 'FETCH_FRIDGE_HISTORY_SUCCESS':
      return {
        ...state,
        groceryHistory: action.data
      }
    case 'FETCH_FRIDGE_HISTORY_ERROR':
      return {
        ...state,
      }
    default:
      return state
  }
}

export default groceriesReducer
