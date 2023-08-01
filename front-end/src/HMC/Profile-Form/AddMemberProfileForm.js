import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { createMemberProfile, getProfileById } from '../../actions/profile';
import Aux from '../../hoc/_Aux';
import { Row, Col, Form, Card, FormControl, Button } from 'react-bootstrap';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import InputMask from 'react-input-mask';
const initialState = {
  name: '',
  gender: '',
  weight: '',
  heightFeet: '',
  heightInch: '',
  bmi: '',
  birthday: '',
  relationship: '',
  primaryProfile: '',
  relationship: ''
};

const AddMemberProfileForm = ({
  profile: { profile, loading },
  createMemberProfile,
  getProfileById,
  history
}) => {
  const [formData, setFormData] = useState(initialState);
  const [bmiResults, setbmiResults] = useState({
    variant: '',
    title: ''
  });
  console.log('Profile', profile);
  var currentUser = profile && profile.user ? profile.user : {};
  var currentProfile = profile ? profile : {};
  var avartar = currentProfile.gender === 'female' ? avatar1 : avatar2;
  const creatingMemberProfile = useRouteMatch('/add-member-profile');

  useEffect(() => {
    if (profile) {
      setFormData({ ...formData, primaryProfile: profile._id });
    }
  }, []);

  const {
    name,
    gender,
    weight,
    heightFeet,
    heightInch,
    bmi,
    relationship,
    birthday
  } = formData;

  const onChange = (e) => {
    const target = e.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'weight' || name === 'heightFeet' || name === 'heightInch') {
      value = value.replace(/[^0-9]/g, '');
      value = Number(value);
    }
    avartar = gender === 'female' ? avatar1 : avatar2;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // createMemberProfile(formData, history, profile ? true : false);
    createMemberProfile(formData, history, false);
  };
  const calculateBMI = () => {
    console.log('weight', weight);
    console.log('heightFeet', heightFeet);
    console.log('heightInch', heightInch);
    if (weight && heightFeet && heightInch) {
      // BMI Formula = (WEIGHT[in pounds] / (HEIGHT[in inches] * HEIGHT[in inches])) * 703;
      let INCHES_IN_FEET = 12;

      var height = Number(heightFeet);
      // convert feet to inches
      height *= INCHES_IN_FEET;
      // add the inches input field
      height += Number(heightInch);

      var bmi = (weight / (height * height)) * 703;
      bmi = bmi.toFixed(2);
      console.log(bmi);
      setFormData({ ...formData, bmi: bmi });
      getBMIResults(bmi);
    }
  };
  // let bmiResults = {
  //   label: '',
  //   alertClass: ''
  // };
  const getBMIResults = (bmi) => {
    if (bmi <= 18.5) {
      setbmiResults({ title: 'Underweight', variant: 'danger' });
      // bmiResults.label = 'Underweight';
      // bmiResults.alertClass = 'danger';
      // setShow(true);
      // toast.danger('Underweight');
    } else if (bmi <= 24.9) {
      setbmiResults({ title: 'Normal weight', variant: 'Normal weight' });
      // bmiResults.label = 'Normal weight';
      // bmiResults.alertClass = 'success';
      // setShow(true);
      // toast.success('Normal weight');
    } else if (bmi <= 29.9) {
      setbmiResults({ title: 'Overweight', variant: 'warning' });
      // bmiResults.label = 'Overweight';
      // bmiResults.alertClass = 'warning';
      // setShow(true);
      // toast.warning('Overweight');
    } else if (bmi >= 30) {
      setbmiResults({ title: 'Obesity', variant: 'danger' });
      // bmiResults.label = 'Obesity';
      // bmiResults.alertClass = 'danger';
      // setShow(true);
      // toast.danger('Obesity');
    } else {
      setbmiResults({ title: 'Obesity', variant: 'danger' });
      // bmiResults.label = 'BMI';
      // bmiResults.alertClass = 'primary';
      // setShow(true);
    }
    // console.log('Result', bmiResults);
  };
  return (
    <Aux>
      <Row>
        <Col></Col>
        <Col lg={7}>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>
                {creatingMemberProfile
                  ? 'Create Member Profile'
                  : 'Edit Member Profile'}
              </Card.Title>
            </Card.Header>
            <Card.Body className='p-5'>
              <div className='text-center project-main'>
                <img
                  className='img-fluid rounded-circle'
                  src={avartar}
                  alt='dashboard-user'
                />
                {/* <h5 className='mt-4'>{currentUser.name}</h5> */}
                <h5 className='mt-4'>Member Profile</h5>
              </div>

              <Form className='form' onSubmit={onSubmit}>
                <Form.Group as={Row} controlId='formDate1'>
                  <Form.Label column sm={3}>
                    Name
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type='text'
                      name='name'
                      value={name}
                      onChange={onChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formDate1'>
                  <Form.Label column sm={3}>
                    Relationship
                  </Form.Label>
                  <Col sm={9}>
                    <FormControl
                      as='select'
                      name='relationship'
                      value={relationship}
                      onChange={onChange}
                    >
                      <option>Select Relationship</option>
                      <option value='father'>Father</option>
                      <option value='mother'>Mother</option>
                      <option value='wife'>Wife</option>
                      <option value='husband'>Husband</option>
                      <option value='sister'>Sister</option>
                      <option value='brother'>Brother</option>
                      <option value='son'>Son</option>
                      <option value='daughter'>Daughter</option>
                      <option value='partner'>Partner</option>
                    </FormControl>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formDate1'>
                  <Form.Label column sm={3}>
                    Birthday
                  </Form.Label>
                  <Col sm={9}>
                    <InputMask
                      name='birthday'
                      value={birthday}
                      onChange={onChange}
                      className='form-control'
                      mask='99/99/9999'
                      placeholder='dd/mm/yyyy'
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Gender
                  </Form.Label>
                  <Col sm={9}>
                    <FormControl
                      as='select'
                      name='gender'
                      value={gender}
                      onChange={onChange}
                    >
                      <option>Select Gender</option>
                      <option value='female'>Female</option>
                      <option value='male'>Male</option>
                    </FormControl>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Weight
                  </Form.Label>
                  <Col sm={9}>
                    <InputMask
                      name='weight'
                      value={weight}
                      onChange={onChange}
                      onBlur={calculateBMI}
                      className='form-control'
                      mask='999 lb'
                      placeholder='Weight'
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Height
                  </Form.Label>
                  <Col sm={5}>
                    {/* <Form.Control
                      type='text'
                      placeholder='Height'
                      name='height'
                      value={height}
                      onChange={onChange}
                    /> */}
                    <InputMask
                      name='heightFeet'
                      value={heightFeet}
                      onChange={onChange}
                      onBlur={calculateBMI}
                      className='form-control'
                      mask='9 ft'
                      placeholder='Feet'
                    />
                  </Col>
                  <Col sm={4}>
                    <InputMask
                      name='heightInch'
                      value={heightInch}
                      onChange={onChange}
                      onBlur={calculateBMI}
                      className='form-control'
                      mask='9 in'
                      placeholder='Inches'
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formDate1'>
                  <Form.Label column sm={3}>
                    BMI
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control type='text' name='bmi' value={bmi} disabled />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formDate1'>
                  <Col sm={3}>
                    <Button
                      className='btn btn-block btn-light my-1'
                      href='/profile'
                    >
                      <i className='feather icon-arrow-left f-20' />
                    </Button>
                  </Col>
                  <Col sm={9}>
                    <Button
                      type='submit'
                      className='btn btn-block btn-success my-1'
                    >
                      Save
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
              {/* <Alert show={show} variant='primary'>
                <Alert.Heading>{bmiResults.label}</Alert.Heading>
              </Alert> */}
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Aux>
  );
};

AddMemberProfileForm.propTypes = {
  createMemberProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  createMemberProfile
})(AddMemberProfileForm);
