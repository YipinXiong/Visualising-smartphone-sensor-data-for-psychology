import React from 'react';
import './login.css';

class Login extends React.Component {
  render() {
    return (
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <div class="fadeIn first">
            <i className="fas fa-key fa-2x my-3"></i>
          </div>
          <form>
            <input type="text" id="login" class="fadeIn second" name="login" placeholder="login" />
            <input type="text" id="password" class="fadeIn third" name="login" placeholder="password" />
            <button className="btn btn-primary fadeIn fourth" >Submit</button>
          </form>
          <div id="formFooter">
            <a className="underlineHover" >Forgot Password?</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;