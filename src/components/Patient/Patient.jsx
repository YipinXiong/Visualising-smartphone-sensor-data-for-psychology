import React from 'react';
import './patient.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { clickPatient } from '../../actions'

class Patient extends React.Component {

  render() {
    return (
      <div className={`patient-wrapper`}>
        <li className="nav-item">
          <div onClick={() => this.props.clickPatient(this.props.patient.id)} 
            className="d-flex w-100 justify-content-between">
            <Link className="patient-name mb-3">
              {this.props.patient.name}
            </Link>
          </div>

          <div className="email mb-1">
            <i className="far fa-envelope" />
            {this.props.patient.email}
          </div>

          <small>
            <i className="fas fa-phone" />
            {this.props.patient.phone}
          </small>

        </li>
      </div>
      )
  }
}

const mapStateToProps = state => {
  return {clickedPatientId: state.currentPatient.clickedPatient}
}
export default connect(mapStateToProps,{clickPatient})(Patient);