export const fetchLoginSuccess = () => ({
  type: 'LOGIN_SUCCESS',
})

export const fetchLoginError = (error) => ({
  type: 'LOGIN_ERROR',
  error
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const login = (email, password) => (dispatch) => {
  let data = {
    method: 'post',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({username: email, password: password})
  }
  fetch(`/api/login`, data)
    .then(res => res.json())
    .then(result => {
      if (result.success) {
          console.log(result)
          sessionStorage.setItem("jwt", result.token);
          dispatch(fetchLoginSuccess())
      } else {
        dispatch(fetchLoginError())
      }
    },
      (error) => {
        dispatch(fetchLoginError(error))
      }
    )
}
