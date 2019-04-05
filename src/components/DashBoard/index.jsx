import React from 'react';
import PatientsList from '../PatientsList';
import { connect } from 'react-redux';
import './dashboard.css';

class DashBoard extends React.Component {

  renderIntroduction() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2"> {this.props.clickedPatient ? this.props.clickedPatient.name : ''} Dashboard </h1>
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
    );
  }
  renderPatientsList() {
    return (
      <nav id="patientslist" className="bg-light">
        <PatientsList />
      </nav>
    );
  }

  renderMainBoard(clickedPatient = null) {
    if (clickedPatient) {
      console.log(clickedPatient)
      return <div>{clickedPatient.website}</div>
    }
    return (
      <section>
        You don't select any patient.
        Please select one from the left patients list
        </section>
    );
  }

  render() {
    return (
      <div id="dashboard-wrapper">
        {this.renderPatientsList()}
        <main id="main-board" role="main" className="px-4">
          {this.renderIntroduction()}
          {this.renderMainBoard(this.props.clickedPatient)}
        </main>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    clickedPatient: state.patients[state.currentPatient.clickedPatient],
  };
}

export default connect(mapStateToProps)(DashBoard);