import React, { Component } from 'react';

class Header extends Component {
  
  render() {
    return (
      <header className="navbar navbar-dark bg-dark flex-md-nowrap p-2 shadow">
        <div className="navbar-brand col-sm-3 col-md-2 mr-0">AWARE</div>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <div className="nav-link">Sign in</div>
          </li>
        </ul>
      </header>
      );
  }
}

export default Header;
