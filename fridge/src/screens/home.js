import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



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


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      items: [],
      email: null,
      password: null
    }
  }

  componentDidMount() {
    console.log(this.props.logedIn)
    if (!this.props.logedIn) {
      this.props.history.push('/')
    }
  }

  async logout() {
    await this.props.logout()
    this.props.history.push('/')
    console.log(this.props.logedIn)
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
        <p>asdasdas</p>
        <Button variant="contained" color="primary" style={button} onClick={() => { this.logout() }}>
          Logout
        </Button>
        </Grid>
      </div>
    )
  }
}

export default Home
