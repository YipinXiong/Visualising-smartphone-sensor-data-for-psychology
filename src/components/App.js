import React from 'react';
import Header from './Header/Header';
import history from '../history';
import { Router,Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import Login from './Login/Login';

const App = ()=>{
  return (
    <>
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <PrivateRoute path="/" exact component ={Login} />
          <Route path="/login" exact component = {Login} />
          {/* <Route path="/" exact component={StreamList} />
          // <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
          <Route path="/streams/:id" exact component={StreamShow} /> */}
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
