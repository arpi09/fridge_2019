export const fetchLoginSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  data
})

export const fetchLoginError = () => ({
  type: 'LOGIN_ERROR',
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const login = (password) => (dispatch) => {
  var CryptoJS = require("crypto-js")
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
        console.log("ERROR!")
        dispatch(fetchLoginError())
      }
    )
}
