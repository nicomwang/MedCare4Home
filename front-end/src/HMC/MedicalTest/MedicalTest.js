import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Aux from '../../hoc/_Aux';
import moment from 'moment';
import Datetime from 'react-datetime';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import {
  deleteMedicalTest,
  addMedicalTest,
  updateMedicalTest
} from '../../actions/profile';
const MedicalTest = ({
  updateMedicalTest,
  addMedicalTest,
  deleteMedicalTest,
  auth: { user },
  profile: { profile, loading }
}) => {
  var medTest = profile && profile.medicalTest ? profile.medicalTest : [];

  // sort by startDate
  medTest.sort(function (a, b) {
    if (a.startDate < b.startDate) {
      return -1;
    }
    if (a.startDate > a.startDate) {
      return 1;
    }
    return 0;
  });
  const [edit, setEdit] = useState(false);
  const [editTestID, seteditTestID] = useState();
  const avatar = profile && profile.gender === 'female' ? avatar1 : avatar2;
  const medTests = medTest.map((test) => (
    <li>
      <i className='task-icon bg-c-green' />
      <h6>
        <strong className='h5 text-primary my-5'>{test.type}</strong> |{' '}
        <span className='text-muted mt-5'>{test.frequency}</span>
        <br />
        <span className='text-muted mt-5'>
          {moment.utc(test.startDate).format('MM/DD/YYYY')}
        </span>
        <Button
          className=' m-2 float-right btn-icon btn-rounded btn-danger'
          onClick={() => {
            deleteMedicalTest(profile._id, test._id);
            setEdit(false);
          }}
        >
          <i className='feather icon-trash f-20 text-white' />
        </Button>
        <Button
          className=' m-2 float-right btn-icon btn-rounded btn-warning'
          onClick={() => handleEdit(test)}
        >
          <i className='feather icon-edit f-20 text-white' />
        </Button>
      </h6>
      <p className='text-muted'>{test.instruction}</p>
    </li>
  ));
  const [formData, setFormData] = useState({
    type: 'Cholesterol Testing',
    instruction: '',
    frequency: 'Daily',
    startDate: '',
    endDate: ''
  });
  const { type, instruction, frequency, startDate, endDate } = formData;
  const handleEdit = (test) => {
    console.log('Edit Test:', test);
    const testData = { ...formData };
    for (const key in test) {
      if (key === 'startDate' || key === 'endDate') {
        testData[key] = moment.utc(test[key]).format('MM/DD/YYYY');
      } else if (key in testData) testData[key] = test[key];
    }
    seteditTestID(test._id);
    setEdit(true);
    setFormData(testData);
  };
  const onChange = (e) => {
    // console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleStart = (e) => {
    setFormData({
      ...formData,
      startDate: e.format('MM/DD/YYYY')
    });
  };
  const handleEnd = (e) => {
    setFormData({
      ...formData,
      endDate: e.format('MM/DD/YYYY')
    });
  };
  return (
    <Aux>
      <Row className='h-100'>
        <Col sm={12} xl={6}>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>Required Home Test</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='text-center m-b-30'>
                <img
                  className='img-fluid rounded-circle'
                  src={avatar}
                  alt='dashboard-user'
                />
                <h3 className='mt-3'>{profile ? profile.name : ''}</h3>
              </div>

              <ul className='task-list'>
                {medTest.length !== 0 ? (
                  medTests
                ) : (
                  <li>
                    <span className='h5 text-muted alert  '>
                      <i className=' m-2 feather icon-alert-triangle f-20' />
                      No required medical tests
                    </span>
                  </li>
                )}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} xl={6}>
          {/* <AddMedicalTest data={editTest} /> */}
          {/* {edit? ():()} */}

          <Card>
            <Card.Header>
              <Card.Title as='h5'>
                {edit ? 'Edit Medical Test' : 'Add Medical Test'}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  addMedicalTest(formData, profile._id);
                }}
              >
                <Form.Group>
                  <Form.Label>Test Type</Form.Label>
                  <Form.Control
                    as='select'
                    name='type'
                    value={type}
                    onChange={onChange}
                  >
                    <option value='Cholesterol Testing'>
                      Cholesterol Testing
                    </option>
                    <option value='Blood Pressure Monitor'>
                      Blood Pressure Monitor
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Medical Testing Instruction</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows='3'
                    name='instruction'
                    value={instruction}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Label as='h5'>Repeat</Form.Label>
                <Form.Group>
                  <Form.Label>Start</Form.Label>
                  <Datetime
                    timeFormat={false}
                    onChange={handleStart}
                    value={startDate}
                    inputProps={{ placeholder: 'Select Start Date' }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as='select'
                    name='frequency'
                    value={frequency}
                    onChange={onChange}
                  >
                    <option value='Daily'>Daily</option>
                    <option value='Weekly'>Weekly</option>
                    <option value='Monthly'>Monthly</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>End</Form.Label>
                  <Datetime
                    timeFormat={false}
                    onChange={handleEnd}
                    value={endDate}
                    inputProps={{ placeholder: 'Select End Date' }}
                  />
                </Form.Group>
                {edit ? (
                  <Row>
                    <Button variant='light' onClick={() => setEdit(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant='success'
                      onClick={() => {
                        updateMedicalTest(formData, editTestID, profile._id);
                        setEdit(false);
                      }}
                    >
                      Update
                    </Button>
                  </Row>
                ) : (
                  <Button type='submit' variant='primary'>
                    Add Medication Test
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};
MedicalTest.propTypes = {
  addMedicalTest: PropTypes.func.isRequired,
  updateMedicalTest: PropTypes.func.isRequired,
  deleteMedicalTest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, {
  updateMedicalTest,
  deleteMedicalTest,
  addMedicalTest
})(MedicalTest);
