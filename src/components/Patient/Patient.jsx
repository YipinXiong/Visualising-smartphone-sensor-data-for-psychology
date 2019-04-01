import React from 'react';
import './patient.css';

const Patient = () => {
  return (
    <div className="patient">
      <div className="container content-wrapper">
        <img className="patient-avatar" alt="avatar" src="../../../public/favicon.ico"/>
        <div className="patient-name">Lee Simpson</div>
        <div className="patient-email">lee.Simpson@gmail.com</div>
      </div>
    </div>
    )
}
export default Patient;