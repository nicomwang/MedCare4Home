import React from 'react';
import { Col, Card, Tab, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import DEMO from '../../store/constant';
const MedicationReminder = ({ profile: { profile }, auth: { user } }) => {
  //   const educations = education.map((edu) => (
  //     <tr key={edu._id}>
  //       <td>{edu.school}</td>
  //       <td className='hide-sm'>{edu.degree}</td>
  //       <td>
  //         {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
  //       </td>
  //       <td>
  //         <button
  //           onClick={() => deleteEducation(edu._id)}
  //           className='btn btn-danger'
  //         >
  //           Delete
  //         </button>
  //       </td>
  //     </tr>
  //   ));
  var medication = profile && profile.medication ? profile.medication : [];

  var morningMed = medication.filter((med) => med.timesADay === 'Morning');
  var monComponent = morningMed.map((med) => (
    <div className='col'>
      <h3 className='f-w-300'>{med.name}</h3>
      <span className='d-block text-muted'>{med.dosage}</span>
    </div>
  ));
  var afternoonMed = medication.filter((med) => med.timesADay === 'Afternoon');
  var afComponent = afternoonMed.map((med) => (
    <div className='col'>
      <h3 className='f-w-300'>{med.name}</h3>
      <span className='d-block text-muted'>{med.dosage}</span>
    </div>
  ));
  var eveningMed = medication.filter((med) => med.timesADay === 'Evening');
  var eveComponent = eveningMed.map((med) => (
    <div className='col'>
      <h3 className='f-w-300'>{med.name}</h3>
      <span className='d-block text-muted'>{med.dosage}</span>
    </div>
  ));
  return (
    <Card className=''>
      <Card.Header>
        <Card.Title as='h5'>Medication Reminder</Card.Title>
      </Card.Header>
      <Card.Body className='border-bottom h-100'>
        {medication.length === 0 ? (
          <span>You don't have any medication</span>
        ) : (
          <div>
            <div className='row d-flex align-items-center m-2'>
              <div className='col-auto'>
                <i className='feather icon-sun f-40 text-c-green' />
              </div>
              {monComponent}
            </div>
            <div className='row d-flex align-items-center m-2'>
              <div className='col-auto'>
                <i className='feather icon-cloud f-40 text-c-green' />
              </div>
              {afComponent}
            </div>

            <div className='row d-flex align-items-center m-2'>
              <div className='col-auto'>
                <i className='feather icon-moon f-40 text-c-green' />
              </div>
              {eveComponent}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

MedicationReminder.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps)(MedicationReminder);
