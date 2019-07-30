import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  textField: {
    margin: 10,
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    margin: 10,
  },
}

const { button, textField } = styles

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      items: [],
      email: null,
      password: null
    }
    this.connecToServer = this.connecToServer.bind(this);
  }

  connecToServer() {

  }

  componentDidMount() {
    this.connecToServer();
  }

  async login() {
    fetch('/api/login/' + this.state.email + "/" + this.state.password)
      .then(res => res.json())
      .then(result => {
          console.log(result.message)
          this.setState({
            isLoading: false,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            error
          });
        }
      )
  }

  render() {
    var CryptoJS = require("crypto-js");

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt('123456789!', 'secret key 123');
    var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);

    const { error, isLoaded, items } = this.state;
    return (
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
    );
  }
}


export default App;
