import React from 'react';
import './login.css';
import {Field, Form} from 'react-final-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class Login extends React.Component {

 async handleSubmit(formValues) {
  await sleep(300);  
  window.alert(JSON.stringify(formValues, 0, 2))
  }

  renderForm() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        render= {({handleSubmit, submitting, pristine}) => {
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <i className="fas fa-child" />
                <Field name="username" className="fadeIn second" type="text" component="input" /> 
              </div>
              <div>
                <i className="fas fa-lock" />
                <Field name="password" className="fadeIn third" type="password" component="input" label="Enter Password" /> 
              </div>
            
              <button className="btn btn-primary fadeIn fourth" type="submit" disabled={submitting || pristine}>
                Submit
              </button>
            </form>
          )
          }}
        />
    );
  }


  render(){
    return (
      <div class="wrapper fadeInDown">
       <div id="formContent">
         <div class="fadeIn first">
           <i className="fas fa-key fa-2x my-3">  Login</i>
         </div>
         { this.renderForm() }
         <div id="formFooter">
           <a className="underlineHover" href="https://www.google.com.au">Forgot Password?</a>
         </div>
        </div>
       </div>
      );
  }
}

export default Login;