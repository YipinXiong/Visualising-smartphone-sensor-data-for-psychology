import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../GoogleAuth';

class Header extends Component {
  
  render() {
    return (
      <header className="navbar navbar-dark bg-dark flex-md-nowrap p-2 shadow">
        <Link to="/" className="navbar-brand col-sm-3 col-md-2 mr-0"> 
          Visual Psychology Data
        </Link>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <GoogleAuth className="nav-link" />
          </li>
        </ul>
      </header>
      );
  }
}

export default Header;
