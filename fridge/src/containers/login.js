import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'


const styles = {
  textField: {
    margin: 10,
  },
  button: {
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    margin: 10,
  },
}

const { button, textField } = styles

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      logedIn: false,
      items: [],
      email: null,
      password: null
    }
  }

  componentDidMount() {
    console.log(this.state.logedIn)
    if (this.state.logedIn) {
      this.props.history.push('/home')
    }
  }

  async login() {
    var CryptoJS = require("crypto-js");

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt('123456789!', 'secret key 123');
    var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    fetch('/api/login/' + this.state.email + "/" + this.state.password)
      .then(res => res.json())
      .then(result => {
          console.log(result.message)
          this.setState({
            isLoading: false,
            logedIn: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            logedIn: false,
            error
          });
        }
      ).then(this.props.history.push('/home'))
  }

  render() {
    const { error, isLoaded, items } = this.state;

    return(
      <div className="container">
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh' }}
              >
          <Grid item xs={6}>
            <TextField
              id="outlined-email-input"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              style={textField}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              style={textField}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Grid>
            <Button variant="contained" color="primary" style={button} onClick={() => { this.login() }}>
              Login
            </Button>
          </Grid>
      </div>
    )
  }
}

export default Login
