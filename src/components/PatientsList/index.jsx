import React from 'react';
import { connect } from 'react-redux';
import { fetchPatients } from '../../actions'
import Patient from '../Patient/Patient';

class PatientsList extends React.Component {

  componentDidMount() {
    this.props.fetchPatients();
  }

  renderList() {
    return this.props.patients.map( patient => {
        return <Patient
                key={patient.id} 
                patient={patient}
                /> 
    })
  }
  
  render() {
    if(this.props.patients) {
      return (
        <ul className="nav flex-column">
          <li className="nav-item mt-4 mb-3 d-flex justify-content-center">
            <h3>
              <i className="far fa-handshake" />
              Patients
            </h3> 
          </li>
          {this.renderList()}
        </ul>
      ) 
    } else {
      return <div>Loading</div>
    }
  }
}

const mapStateToProps = state => {
  return {patients: Object.values(state.patients)}
}

export default connect(mapStateToProps,{fetchPatients})(PatientsList);