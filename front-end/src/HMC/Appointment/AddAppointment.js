import React, { Fragment, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAppointment } from '../../actions/profile';

const AddAppointment = ({ addAppointment, history }) => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    date: '',
    note: '',
    doctor: '',
    calColor: ''
  });
  const { type, location, date, note, doctor, calColor } = formData;

  const onChange = (e) => {
    // console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleDate = (e) => {
    setFormData({
      ...formData,
      date: e.format('YYYY-MM-DDTHH:mm:ss')
    });
  };
  return (
    <Fragment>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addAppointment(formData, history);
        }}
      >
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control
            as='select'
            name='type'
            value={type}
            onChange={onChange}
          >
            <option value='Routine Check u'>Routine Check up</option>
            <option value='Eye Care'>Eye Care</option>
            <option value='Dental'>Dental</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Date and Time</Form.Label>
          <Datetime
            dateFormat='dddd D MMMM Y -'
            // value={datetime}
            onChange={handleDate}
            inputProps={{ placeholder: 'Select Date & Time' }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Doctor</Form.Label>
          <Form.Control
            type='text'
            name='doctor'
            value={doctor}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='text'
            name='location'
            value={location}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Calendar Color</Form.Label>
          {/* <CirclePicker /> */}
          <Form.Control
            type='color'
            id='exampleColorInput'
            defaultValue='#563d7c'
            name='calColor'
            value={calColor}
            onChange={onChange}
            title='Choose your color'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Note</Form.Label>
          {/* <CirclePicker /> */}
          <Form.Control
            as='textarea'
            name='note'
            value={note}
            onChange={onChange}
            placeholder='add note...'
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Add apppointment
        </Button>
        <Button variant='danger'>Delete</Button>
      </Form>
    </Fragment>
  );
};

AddAppointment.propTypes = {
  addAppointment: PropTypes.func.isRequired
};

export default connect(null, { addAppointment })(AddAppointment);
