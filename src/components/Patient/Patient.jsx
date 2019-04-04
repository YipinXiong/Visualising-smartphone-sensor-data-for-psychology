import React from 'react';
import './patient.css';
import { connect } from 'react-redux';
import { clickPatient } from '../../actions'

class Patient extends React.Component {

  shouldComponentUpdate(nextProps){
    return nextProps.clickedPatientId === this.props.patient.id || this.props.patient.id === this.props.clickedPatientId;
  }

  render() {
    return (
      <div className="patient-wrapper pl-3">
        <li className="nav-item">
          <div 
            onClick={() => this.props.clickPatient(this.props.patient.id)} 
            className={`${this.props.patient.id === this.props.clickedPatientId? 'right-shadow':''}`}>
            <div className="patient-name mb-3">
              {this.props.patient.name}
            </div>
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

  componentDidUpdate(){
    console.log("rendered!!!!");
  }
}

const mapStateToProps = state => {
  return {clickedPatientId: state.currentPatient.clickedPatient}
}
export default connect(mapStateToProps,{clickPatient})(Patient);