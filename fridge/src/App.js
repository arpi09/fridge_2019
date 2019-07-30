import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


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
              {item.name}asdasd
            </li>
          ))}
        </div>
    );
  }
}


export default App;
