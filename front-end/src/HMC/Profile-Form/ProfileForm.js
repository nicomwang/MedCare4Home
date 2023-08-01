import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Aux from '../../hoc/_Aux';
import {
  Row,
  Col,
  Form,
  Card,
  FormControl,
  Alert,
  Button
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import InputMask from 'react-input-mask';
const initialState = {
  gender: '',
  weight: '',
  heightFeet: '',
  heightInch: '',
  bmi: '',
  birthday: '',
  isPrimary: true,
  relationship: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  auth: { user },
  createProfile,
  getCurrentProfile,
  history
}) => {
  // const bmiResults = {
  //   variant: '',
  //   title: ''
  // };

  const [formData, setFormData] = useState(initialState);
  const [show, setShow] = useState(false);
  const [bmiResults, setbmiResults] = useState({
    variant: '',
    title: ''
  });
  var primaryName = user ? user.name : '';
  var currentUser = profile && profile.user ? profile.user : {};
  var currentProfile = profile ? profile : {};
  var avartar = currentProfile.gender === 'female' ? avatar1 : avatar2;
  const creatingProfile = useRouteMatch('/create-profile') || !profile;
  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (user) setFormData({ ...formData, name: primaryName });
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key === 'birthday') {
          profileData[key] = moment.utc(profile[key]).format('MM/DD/YYYY');
        } else if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const { name, gender, weight, heightFeet, heightInch, bmi, birthday } =
    formData;

  const onChange = (e) => {
    console.log('BMI:', bmi);
    const target = e.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (target.id === 'relationship' && target.value === 'Self') {
      initialState.isSelf = true;
    }
    if (name === 'weight' || name === 'heightFeet' || name === 'heightInch') {
      value = value.replace(/[^0-9]/g, '');
      value = Number(value);
    }
    avartar = gender === 'female' ? avatar1 : avatar2;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
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
      setShow(true);
      // toast.danger('Underweight');
    } else if (bmi <= 24.9) {
      setbmiResults({ title: 'Normal weight', variant: 'Normal weight' });
      // bmiResults.label = 'Normal weight';
      // bmiResults.alertClass = 'success';
      setShow(true);
      // toast.success('Normal weight');
    } else if (bmi <= 29.9) {
      setbmiResults({ title: 'Overweight', variant: 'warning' });
      // bmiResults.label = 'Overweight';
      // bmiResults.alertClass = 'warning';
      setShow(true);
      // toast.warning('Overweight');
    } else if (bmi >= 30) {
      setbmiResults({ title: 'Obesity', variant: 'danger' });
      // bmiResults.label = 'Obesity';
      // bmiResults.alertClass = 'danger';
      setShow(true);
      // toast.danger('Obesity');
    } else {
      setbmiResults({ title: 'Obesity', variant: 'danger' });
      // bmiResults.label = 'BMI';
      // bmiResults.alertClass = 'primary';
      setShow(true);
    }
    console.log('Result', bmiResults);
  };
  return (
    <Aux>
      <Row>
        <Col></Col>
        <Col lg={7}>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>
                {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
              </Card.Title>
            </Card.Header>
            <Card.Body className='p-5'>
              <div className='text-center project-main'>
                <img
                  className='img-fluid rounded-circle'
                  src={avartar}
                  alt='dashboard-user'
                />
                <h5 className='mt-4'>{profile ? profile.name : primaryName}</h5>
                <h6 className='text-muted'>Primary Profile</h6>
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
                      placeholder='enter your name ...'
                    />
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

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
