import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
    this.connecToServer = this.connecToServer.bind(this);
  }

  connecToServer() {
    console.log("oiajsdoaijsd")
    fetch('/api/grocery')
      .then(res => res.json())
      .then(result => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.connecToServer();
  }

   render() {
     const { error, isLoaded, items } = this.state;
     return (
        <div className="container">
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
          <Button variant="contained" color="secondary">
            Default
          </Button>
        </div>
    );
  }
}


export default App;
