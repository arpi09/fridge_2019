import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types'


const styles = {
  textField: {
    margin: 10,
    backgroundColor: 'transparent',
    width: '30vh',
    marginTop: 10,
    borderRadius: 30,
  },
  button: {
    border: 0,
    color: 'white',
    height: 48,
    margin: 10,
    color: '#fff',
    backgroundColor: '#283048',
    borderRadius: 30,
    height: 48,
    width: '30vh',
    marginTop: 40,
  },
  loading: {
    marginTop: 40,
    color: '#283048',
  },
  h1: {
    fontSize: 80,
    color: '#283048',
    marginBottom: 90,
  }
}

const { button, textField, loading, h1 } = styles

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoading: false,
      items: [],
      email: null,
      password: null,
      animationClass: 'test'
    }
  }

  componentDidMount() {
    console.log(this.props.logedIn)
    if (this.props.logedIn) {
      this.props.history.push('/home')
    }
  }

  async onPresslogin() {
    this.setState({
      isLoading: true,
    });
    console.log(this.state.password)
    await this.props.login(this.state.password)
    if (this.props.logedIn) {
      this.props.history.push('/home')
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;

    return(
      <div className={this.state.animationClass}>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh' }}
              >
          <h1 style={h1}>My Fridge</h1>
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
          { this.state.isLoading
            ? <CircularProgress style={loading}/>
            : <Button variant="contained" color="primary" style={button} onClick={() => { this.onPresslogin() }}>
              Login
              </Button>
          }

          </Grid>
      </div>
    )
  }
}

Login.propTypes = {
  logedIn: PropTypes.bool.isRequired,
}

export default Login
