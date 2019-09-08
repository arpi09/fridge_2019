export const fetchLoginSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  data
})

export const fetchLoginError = (error) => ({
  type: 'LOGIN_ERROR',
  error
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const login = (password) => (dispatch) => {
  var CryptoJS = require("crypto-js")
  console.log("login in!")
  return fetch('/api/login/admin@admin.com')
    .then(res => res.json())
    .then(result => {
      if (result.data){
        console.log(result)
        var bytes = CryptoJS.AES.decrypt(result.data[0].password, 'secret key 123')
        var plaintext = bytes.toString(CryptoJS.enc.Utf8)
        if (plaintext == password) {
          dispatch(fetchLoginSuccess(result.data))
        } else {
          dispatch(fetchLoginError())
        }
      } else {
        dispatch(fetchLoginError())
      }
    },
      (error) => {
        dispatch(fetchLoginError(error))
      }
    )
}
