import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route 
      {...rest}
      render={ props =>
        props.isSignedIn === true? (<Component {...props} />):
        (<Redirect to="/login" />)} 
    />
  );
}

export default PrivateRoute;