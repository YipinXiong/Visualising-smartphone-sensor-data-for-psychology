import React from 'react';
import Header from './Header/Header';
import history from '../history';
import { Router,Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import Login from './Login/Login';
import DashBoard from './DashBoard';

const App = (props)=>{
  return (
    <>
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <PrivateRoute path="/" exact component={DashBoard} />
          <Route path="/login" exact component = {Login} />
        </Switch>
      </div>
    </Router>
    </>
  );
}


export default App;
