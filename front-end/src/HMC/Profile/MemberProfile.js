import React, { Fragment, useEffect } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import '../../assets/scss/style.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getProfileById } from '../../actions/profile';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
const MemberProfile = ({
  getProfileById,
  profile: { profile },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  console.log('member profile:', profile);
  var memberProfile = profile ? profile : {};
  var age = moment().diff(memberProfile.birthday, 'years');
  var height = memberProfile.heightFeet + "'" + memberProfile.heightInch + "''";
  var weight = memberProfile.weight + ' lb';
  var avartar = memberProfile.gender === 'female' ? avatar1 : avatar2;
  return (
    <>
      {profile === null ? (
        'No Profile found'
      ) : (
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
              <Badge variant='primary'>Member Profile</Badge>
              <h5 className='mt-4'>{memberProfile.name}</h5>

              <div className='row card-active  text-center'>
                <div className='col-md-3 col-6'>
                  <h4>{age}</h4>
                  <span className='text-muted'>Age</span>
                </div>
                <div className='col-md-3 col-6'>
                  <h4>{weight}</h4>
                  <span className='text-muted'>Weight</span>
                </div>
                <div className='col-md-3 col-6'>
                  <h4>{height}</h4>
                  <span className='text-muted'>Height</span>
                </div>
                <div className='col-md-3 col-12'>
                  <h4>{memberProfile.bmi}</h4>
                  <span className='text-muted'>IBM</span>
                </div>
              </div>
              {/* <a href={DEMO.BLANK_LINK} className="btn theme-bg text-uppercase text-white "><i className="feather icon-edit f-20 text-white"/>Edit Profile</a> */}

              <Link to={`/edit-member-profile/${profile._id}`}>
                <div className='btn theme-bg text-uppercase text-white '>
                  <i className='feather icon-edit f-20 text-white' /> Edit
                  Member Profile{' '}
                </div>
              </Link>
              <Button
                className='btn theme-bg text-uppercase text-white '
                href='/profile'
              >
                {' '}
                <i className='feather icon-heart f-20 text-white' />
                Primary Profile
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};
MemberProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(MemberProfile);
