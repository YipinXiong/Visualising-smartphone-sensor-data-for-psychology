import React from 'react';
import './patient.css';

const Patient = props => {
  console.log(props);
  return (
    <div className="patient">
      <div className="container content-wrapper">
        <div className="patient-name">{props.patient.name}</div>
        <div className="patient-email">{props.patient.email}</div>
      </div>
    </div>
    )
}
export default Patient;