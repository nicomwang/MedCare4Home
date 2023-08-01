import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Aux from '../../hoc/_Aux';
import Datetime from 'react-datetime';
import moment from 'moment';
import {
  addMedication,
  deleteMedication,
  updateMedication
} from '../../actions/profile';

const Medication = ({
  addMedication,
  updateMedication,
  deleteMedication,
  auth: { user },
  profile: { profile, loading }
}) => {
  const [edit, setEdit] = useState(false);
  const [editMedID, setEditMedID] = useState();
  var medication = profile && profile.medication ? profile.medication : [];
  // sort by prescribed
  medication.sort(function (a, b) {
    if (a.prescribed < b.prescribed) {
      return -1;
    }
    if (a.prescribed > a.prescribed) {
      return 1;
    }
    return 0;
  });
  const medications = medication.map((med) => (
    <Col md={6}>
      <Card className='card-border-c-blue'>
        <Card.Header>
          <h3 className='align-items-center'> {med.name}</h3>
        </Card.Header>
        <Card.Body className='card-task'>
          <Card.Text className='task-detail h6 '>
            {/* Take 1 tablet (2.5mg total) by mouth daily */}
            {med.instruction}
          </Card.Text>
          <Card.Body>
            <Card.Text className='task-due'>
              <h5>Precription Details</h5>
              <strong> Prescribed : </strong>
              <strong className='label label-primary'>
                {moment.utc(med.prescribed).format('MM/DD/YYYY')}
              </strong>
              <br />
              <strong> Approved by : </strong>
              <strong className='text-primary'>{med.approvedBy}</strong>
            </Card.Text>
            <Card.Text className='task-due'>
              <h5>Refill Details</h5>
              <strong> Quantity : </strong>
              <strong className='label label-primary'>{med.quanity}</strong>
            </Card.Text>
            <Card.Text className='task-due'>
              <h5>Pharmacy Details</h5>
              <strong> {med.phamacy} </strong>
            </Card.Text>
          </Card.Body>

          <hr />
          <Button
            className='btn btn-outline-primary'
            onClick={() => handleEdit(med)}
          >
            <i className='feather icon-edit' />
            Edit
          </Button>
          <Button
            className='btn btn-outline-danger float-right'
            onClick={() => {
              deleteMedication(profile._id, med._id);
              setEdit(false);
            }}
          >
            <i className='feather icon-trash-2' />
            Remove
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  const [formData, setFormData] = useState({
    name: '',
    instruction: '',
    approvedBy: '',
    prescribed: '',
    quanity: '',
    phamacy: '',
    timesADay: 'Morning',
    dosage: ''
  });
  const {
    name,
    instruction,
    approvedBy,
    prescribed,
    quanity,
    phamacy,
    timesADay,
    dosage
  } = formData;
  const handleEdit = (med) => {
    const medData = { ...formData };
    for (const key in med) {
      if (key in medData) medData[key] = med[key];
    }
    setEditMedID(med._id);
    setEdit(true);
    setFormData(medData);
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleDate = (e) => {
    setFormData({
      ...formData,
      prescribed: e.format('MM/DD/YYYY')
    });
  };
  return (
    <Aux>
      <Row>
        <Col xl={4}>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>
                {edit ? 'Edit Medication' : 'Add Medication'}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  addMedication(formData, profile._id);
                }}
              >
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    value={name}
                    onChange={onChange}
                  />
                  <Form.Label>Dosage</Form.Label>
                  <Form.Control
                    type='text'
                    name='dosage'
                    value={dosage}
                    onChange={onChange}
                  />
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as='select'
                    name='timesADay'
                    value={timesADay}
                    onChange={onChange}
                  >
                    <option value='Morning'>Morning</option>
                    <option value='Afternoon'>Afternoon</option>
                    <option value='Evening'>Evening</option>
                  </Form.Control>
                  <Form.Label>Instruction</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows='5'
                    name='instruction'
                    value={instruction}
                    onChange={onChange}
                  />
                </Form.Group>
                <Accordion defaultActiveKey='0'>
                  <Card className='border'>
                    <Accordion.Toggle as={Card.Header} eventKey='0'>
                      <i className='feather icon-clipboard mr-2' />
                      Medication Details
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='0'>
                      <Card.Body>
                        <Form.Group>
                          <Form.Label>Prescribed</Form.Label>
                          <Datetime
                            timeFormat={false}
                            value={prescribed}
                            onChange={handleDate}
                            inputProps={{ placeholder: 'Select Date' }}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Approved by</Form.Label>
                          <Form.Control
                            type='text'
                            name='approvedBy'
                            value={approvedBy}
                            onChange={onChange}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            type='text'
                            name='quanity'
                            value={quanity}
                            onChange={onChange}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Pharmacy address</Form.Label>
                          <Form.Control
                            as='textarea'
                            rows='3'
                            name='phamacy'
                            value={phamacy}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className='border'>
                    <Accordion.Toggle as={Card.Header} eventKey='1'>
                      <i className='feather icon-bell mr-2' />
                      Set Reminder
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='1'>
                      <Card.Body>
                        <Form.Group>
                          <Form.Label>Reminder Time</Form.Label>
                          <Datetime
                            dateFormat={false}
                            value={prescribed}
                            inputProps={{ placeholder: 'Select Time' }}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Times a Day</Form.Label>
                          <Form.Control as='select'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </Form.Control>
                        </Form.Group>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

                <hr />

                {edit ? (
                  <Row>
                    <Button variant='light' onClick={() => setEdit(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant='success'
                      onClick={() => {
                        updateMedication(formData, editMedID, profile._id);
                        setEdit(false);
                      }}
                    >
                      Update
                    </Button>
                  </Row>
                ) : (
                  <Button type='submit' variant='primary'>
                    Add Medication
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>Medications</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>{medications}</Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};
Medication.propTypes = {
  addMedication: PropTypes.func.isRequired,
  deleteMedication: PropTypes.func.isRequired,
  updateMedication: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, {
  addMedication,
  deleteMedication,
  updateMedication
})(Medication);
