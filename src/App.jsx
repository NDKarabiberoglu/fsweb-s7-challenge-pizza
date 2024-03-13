import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Order from './components/Order';
import Success from './components/Success';
import Main from './components/main';

function App() {
  return (
    <>
      <Switch>
        <Route path="/order">
          <Order />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </>
  );
}

export default App;