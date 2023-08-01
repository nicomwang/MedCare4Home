import React, { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/scss/style.scss';
import PropTypes from 'prop-types';
// import Aux from "../../hoc/_Aux";
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import UcFirst from '../../App/components/UcFirst';
import DEMO from '../../store/constant';
import { connect } from 'react-redux';
import { getMemberProfiles, match } from '../../actions/profile';
import { get } from 'mongoose';
const FamilyMember = ({
  profile: { profiles, profile, loading },
  getMemberProfiles,
  auth: { user },
  match
}) => {
  useEffect(() => {
    // getCurrentProfile();
    console.log('primaryID: ', match.params.id);
    getMemberProfiles(match.params.id);
  }, [getMemberProfiles]);
  const member = profiles && profiles.length !== 0 ? profiles : [];
  const members = member.map((mem) => (
    <Col sm={6} md={4} lg={3}>
      <a href={DEMO.BLANK_LINK}>
        <img
          className='img-radius'
          width='100px'
          height='100px'
          src={mem.gender === 'female' ? avatar1 : avatar2}
          alt='Generic placeholder'
        />
      </a>
      <div className=' mt-3 '>
        <span className='h5 font-weight-bold'>
          <UcFirst text={mem.name} />
        </span>
        <p>
          <UcFirst text={mem.relationship} />
        </p>
        <Link to={`/profile/${mem._id}`}>
          <div className='btn btn-outline-success'>Switch </div>
        </Link>
      </div>
    </Col>
  ));
  return (
    <Row className='m-auto'>
      <Col></Col>
      <Col md={7}>
        <Card>
          <Card.Header>
            <Card.Title>
              <h5>Family Members</h5>
              <Button
                className='btn theme-bg text-uppercase text-white  float-right'
                href='/add-member-profile'
              >
                {' '}
                <i className='feather icon-user-plus f-20 text-white' />
                Add New Member
              </Button>
              {/* <a href={DEMO.BLANK_LINK} className="btn theme-bg text-uppercase text-white float-right"><i className="feather icon-user-plus f-20 text-white"/>Add Member</a> */}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className='text-center'>{members}</Row>
          </Card.Body>
        </Card>
      </Col>
      <Col></Col>
    </Row>
  );
};
FamilyMember.propTypes = {
  getMemberProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  profiles: state.profiles
});
export default connect(mapStateToProps, {
  getMemberProfiles
})(FamilyMember);
