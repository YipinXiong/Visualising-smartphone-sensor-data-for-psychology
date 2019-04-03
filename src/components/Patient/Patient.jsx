import React from 'react';
import './patient.css';

const Patient = props => {
  console.log(props);
  return (
    <div className="patient-wrapper">
      <li className="nav-item">
        <div className="d-flex w-100 justify-content-between">
          <div className="patient-name mb-3">
            {props.patient.name}
          </div>
        </div>
        <div className="email mb-1">
          <i className="far fa-envelope" />
          {props.patient.email}
        </div>
        <small>
          <i className="fas fa-phone" />
          {props.patient.phone}
        </small>
      </li>
    </div>
    )
}
export default Patient;