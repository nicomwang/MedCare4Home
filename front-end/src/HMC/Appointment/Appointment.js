import React, { useEffect } from 'react';
import AddAppointment from './AddAppointment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import { Row, Col, Card } from 'react-bootstrap';
import Aux from '../../hoc/_Aux';
import { getCurrentProfile } from '../../actions/profile';
const Appointment = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    console.log('get current profile');
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <Aux>
      <Row>
        <Col xl={8}>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>Appointment</Card.Title>
            </Card.Header>
            <Card.Body className='calendar'>
              <Calendar />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <AddAppointment />
        </Col>
      </Row>
    </Aux>
  );
};
Appointment.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { getCurrentProfile })(Appointment);
