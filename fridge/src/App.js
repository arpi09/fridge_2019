import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import rootReducer from './reducers'
import Login from './containers/login'
import Home from './containers/home'

const store = createStore(rootReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div>
              <Route exact path="/" component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/home" component={Home} />
            </div>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
