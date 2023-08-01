import React from 'react';
import { Button, Card, Badge } from 'react-bootstrap';

import moment from 'moment';
import '../../assets/scss/style.scss';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import { connect } from 'react-redux';

const PersonalInfo = ({
  primaryProfile,
  auth: { user },
  profile: { profile }
}) => {
  var currentProfile = primaryProfile ? primaryProfile : {};
  var currentUser =
    primaryProfile && primaryProfile.user ? primaryProfile.user : {};
  var age = moment().diff(currentProfile.birthday, 'years');
  var height =
    currentProfile.heightFeet + "'" + currentProfile.heightInch + "''";
  var weight = currentProfile.weight + ' lb';
  var avartar = currentProfile.gender === 'female' ? avatar1 : avatar2;

  return (
    <Card className='loction-user'>
      <Card.Header>
        <Card.Title as='h5'>Personal Information</Card.Title>
      </Card.Header>
      <Card.Body className='p-0'>
        <div className='text-center project-main'>
          <img
            className='img-fluid rounded-circle'
            src={avartar}
            alt='dashboard-user'
          />
          <br />
          <Badge variant='primary'>Primary Profile</Badge>
          <h5 className='mt-4'>{currentProfile.name}</h5>

          <div className='row card-active text-center'>
            <div className='col-md-3 col-sm-6 '>
              <h4>{age}</h4>
              <span className='text-muted'>Age</span>
            </div>
            <div className='col-md-3 col-sm-6 '>
              <h4>{weight}</h4>
              <span className='text-muted'>Weight</span>
            </div>
            <div className='col-md-3 col-sm-6 mt-sm-2'>
              <h4>{height}</h4>
              <span className='text-muted'>Height</span>
            </div>
            <div className='col-md-3 col-sm-6 mt-sm-2'>
              <h4>{currentProfile.bmi}</h4>
              <span className='text-muted'>IBM</span>
            </div>
          </div>
          {/* <a href={DEMO.BLANK_LINK} className="btn theme-bg text-uppercase text-white "><i className="feather icon-edit f-20 text-white"/>Edit Profile</a> */}
          <Button
            className='btn theme-bg text-uppercase text-white '
            href='/edit-profile'
          >
            {' '}
            <i className='feather icon-edit f-20 text-white' />
            Edit Profile
          </Button>
          <Button
            className='btn theme-bg text-uppercase text-white '
            href={`/members/${currentProfile._id}`}
          >
            {' '}
            <i className='feather icon-edit f-20 text-white' />
            Family member
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps)(PersonalInfo);
