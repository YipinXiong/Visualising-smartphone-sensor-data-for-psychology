import React from 'react';
import PatientsList from '../PatientsList';
import {connect} from 'react-redux';

class DashBoard extends React.Component {
  
  renderPatientsList() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <PatientsList />
        </div>
      </nav>
    );
  }

  renderMainBoard(clickedPatient=null) {
    if(clickedPatient) {
      return <div>You clicked someone</div>
    }

    return (
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
              This week
            </button>
          </div>
        </div>
      </main>
    );
  }

  render(){
    return (
      <div className="container-fluid">
        <div className="row">
          {this.renderPatientsList()}
          {this.renderMainBoard(this.props.clickedPatient)}
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  return { clickedPatient: state.currentPatient.clickedPatient};
}

export default connect(mapStateToProps)(DashBoard);