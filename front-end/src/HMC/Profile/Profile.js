import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../assets/scss/style.scss';
import Aux from '../../hoc/_Aux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PersonalInfo from './PersonalInfo';
import FamilyMember from './FamilyMember';
import Measurement from './Measurement';
import Document from './Document';
import {
  getProfileById,
  getCurrentProfile,
  getProfiles
} from '../../actions/profile';
const Profile = ({
  // getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  // useEffect(() => {
  //   getCurrentProfile();
  // }, [getCurrentProfile]);
  console.log('in Profile | profile:', profile);
  return (
    <Aux>
      <Row className='container'>
        <Col xs={12} sm={6}>
          <PersonalInfo primaryProfile={profile} />
        </Col>
        <Col xs={12} sm={6}>
          <Document />
        </Col>
      </Row>
    </Aux>
  );
};
Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {})(Profile);
