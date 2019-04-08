import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import history from '../history';

// For convenience, we put all ajax request here. 
class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '941413075354-nn6cmpcoktd5s6pgt53i24smhck2196f.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        //get access reference to know whether users have logged in.
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
      history.push('/');
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null;
    } else if(this.props.isSignedIn) {
      return (
        <button onClick={ this.onSignOutClick } className="btn btn-light">
          <i className="fab fa-google" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={ this.onSignInClick } className="btn btn-light">
          <i className="fab fa-google" />
          Signin with Google
        </button>
      )
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
};

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn};
}
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);