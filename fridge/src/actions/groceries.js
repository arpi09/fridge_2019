export const fetchGroceriesSuccess = (data) => ({
  type: 'GET_GROCERIES_SUCCESS',
  data
})

export const fetchGroceriesError = () => ({
  type: 'GET_GROCERIES_ERROR',
})

export const getGroceries = (id) => (dispatch) => {
  fetch('/api/groceries/' + id)
    .then(res => res.json())
    .then(result => {
      dispatch(fetchGroceriesSuccess(result.data))
    },
      (error) => {
        dispatch(fetchGroceriesError())
      })
}

export const fetchAddGroceriesSuccess = (data) => ({
  type: 'ADD_GROCERIES_SUCCESS',
  data
})

export const fetchAddGroceriesError = () => ({
  type: 'ADD_GROCERIES_ERROR',
})

export const addGroceries = (name, weight, category, expireDate, fridgeID) => (dispatch) => {
  fetch('/api/groceries/' + name + '/' + weight + '/' + category + '/' + fridgeID + '/' + expireDate, {
    method: 'post'
  })
    .then(res => res.json())
    .then(result => {
      dispatch(fetchAddGroceriesSuccess(result.data))
    },
      (error) => {
        dispatch(fetchAddGroceriesError())
      })
}

export const fetchRemoveGroceriesSuccess = (data) => ({
  type: 'REMOVE_GROCERIES_SUCCESS',
  data
})

export const fetchRemoveGroceriesError = () => ({
  type: 'REMOVE_GROCERIES_ERROR',
})

export const removeGroceries = (id) => (dispatch) => {
  fetch('/api/groceries/' + id, {
    method: 'delete'
  })
    .then(res => res.json())
    .then(result => {
      dispatch(fetchRemoveGroceriesSuccess(result.data))
    },
      (error) => {
        dispatch(fetchRemoveGroceriesError())
      })
}

export const fetchFridgeHistorySuccess = (data) => ({
  type: 'FETCH_FRIDGE_HISTORY_SUCCESS',
  data
})

export const fetchFridgeHistoryError = () => ({
  type: 'FETCH_FRIDGE_HISTORY_ERROR',
})

export const getFridgeHistory = (id) => (dispatch) => {
  fetch('/api/history/' + id, {
    method: 'get'
  })
    .then(res => res.json())
    .then(result => {
      dispatch(fetchFridgeHistorySuccess(result.data))
    },
      (error) => {
        dispatch(fetchFridgeHistoryError())
      })
}
