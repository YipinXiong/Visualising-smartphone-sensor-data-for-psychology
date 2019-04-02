import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component, isSignedIn, ...rest}) => {
  console.log(`isSignedIn goes here ${isSignedIn}`)
  return (
    <Route 
      {...rest}
      render={ props => {
        return isSignedIn === true? (<Component {...props} />):
        (<Redirect to="/login" />)}
        } 
    />
  );
}

const mapStateToProps = (state) => {
  return {isSignedIn:state.auth.isSignedIn};
}
export default connect(mapStateToProps)(PrivateRoute);