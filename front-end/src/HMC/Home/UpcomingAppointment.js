import React from 'react';
import {
  Col,
  Card,
  Tab,
  Nav,
  Button,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { addAppointment } from '../../actions/profile';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import DEMO from '../../store/constant';
const UpcomingAppointment = ({ appointment }) => {
  const today = new Date();
  console.log(today);
  // console.log('add 7 days:', today.setDate(today.getDate() + 7));
  // var day = today.getDay();
  // var endOfWeek = day + 6;
  // appointment.forEach((appt) => {
  //   console.log('appt Date:', Date.parse(appt.date));
  //   if (Date.parse(appt.date) >= today.setDate(today.getDate() + 7))
  //     console.log('in the week:', appt);
  // });
  // for (let i = 0; i <= 7; i++) {
  //   if (day > 6) day = day - 7;
  //   console.log(day);
  //   day++;
  // }
  // // console.log(appointment);
  // const appointments = appointment.map((appt) => {
  //   return;
  //   <Tab.Pane eventKey={Date.parse(appt.date).getDay()}>
  //     <h2 className='text-white mb-3 f-w-300'>{appt.date}</h2>
  //     <span className='text-white mb-2 d-block'>{appt.type}</span>
  //     <span className='text-white mb-4 d-block'> @ {appt.location}</span>
  //   </Tab.Pane>;
  // });
  // console.log('appt:', appointments);
  return (
    <Card className='theme-bg earning-date'>
      <Card.Header className='borderless'>
        <Card.Title>
          <h5 className='text-white '>Upcoming Appointment</h5>
          <OverlayTrigger overlay={<Tooltip>Add new appointment</Tooltip>}>
            <Button
              href='/appointment'
              className='float-right btn-icon btn-glow-primary btn-rounded btn-primary'
            >
              <i className='feather icon-plus f-20 text-white' />
            </Button>
          </OverlayTrigger>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <div className='bd-example bd-example-tabs mb-1'>
          <Tab.Container
            id='left-tabs-example'
            defaultActiveKey={today.getDay()}
          >
            <Tab.Content>
              <Tab.Pane eventKey='1'>
                <h2 className='text-white mb-3 f-w-300'>2:00 PM</h2>
                <span className='text-white mb-2 d-block'>
                  Check up for Yen
                </span>
                <span className='text-white mb-4 d-block'>
                  {' '}
                  @ Boston Medical Center
                </span>
              </Tab.Pane>
              <Tab.Pane eventKey='2'>
                <h2 className='text-white mb-3 f-w-300'>3:00 PM</h2>
                <span className='text-white mb-2 d-block'>
                  Dental Appointment for Nic
                </span>
                <span className='text-white mb-4 d-block'> @ location</span>
              </Tab.Pane>
              <Tab.Pane eventKey='3'>
                <h2 className='text-white mb-3 f-w-300'>No Appointment</h2>
                <span className='text-white mb-2 d-block'>-</span>
                <span className='text-white mb-4 d-block'>-</span>
              </Tab.Pane>
              <Tab.Pane eventKey='4'>
                <h2 className='text-white mb-3 f-w-300'>No Appointment</h2>
                <span className='text-white mb-2 d-block'>-</span>
                <span className='text-white mb-4 d-block'>-</span>
              </Tab.Pane>
              <Tab.Pane eventKey='5'>
                <h2 className='text-white mb-3 f-w-300'>No Appointment</h2>
                <span className='text-white mb-2 d-block'>-</span>
                <span className='text-white mb-4 d-block'>-</span>
              </Tab.Pane>
              <Tab.Pane eventKey='6'>
                <h2 className='text-white mb-3 f-w-300'>No Appointment</h2>
                <span className='text-white mb-2 d-block'>-</span>
                <span className='text-white mb-4 d-block'>-</span>
              </Tab.Pane>
              <Tab.Pane eventKey='0'>
                <h2 className='text-white mb-3 f-w-300'>No Appointment</h2>
                <span className='text-white mb-2 d-block'>-</span>
                <span className='text-white mb-4 d-block'>-</span>
              </Tab.Pane>
            </Tab.Content>
            <Nav
              variant='pills'
              className='align-items-center justify-content-center'
            >
              <Nav.Item>
                <Nav.Link eventKey='1'>Mon</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='2'>Tue</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='3'>Wed</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='4'>Thu</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='5'>Fri</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='6'>Sat</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='0'>Sun</Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </div>
      </Card.Body>
    </Card>
  );
};

UpcomingAppointment.propTypes = {
  appointment: PropTypes.array.isRequired,
  addAppointment: PropTypes.func.isRequired
};

export default connect(null, {})(UpcomingAppointment);
