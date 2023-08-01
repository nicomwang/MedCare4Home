import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

import Aux from '../../../../../hoc/_Aux';
import DEMO from '../../../../../store/constant';

import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';

import { logout } from '../../../../../actions/auth';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../../../actions/profile';
import PropTypes from 'prop-types';
const NavRight = ({
  getCurrentProfile,
  auth: { user, isAuthenticated },
  profile: { profile },
  logout
}) => {
  // state = {
  //   listOpen: false
  // };
  useEffect(() => {
    if (!profile) getCurrentProfile();
  }, [getCurrentProfile]);
  const hasProfile = profile ? true : false;
  const name = profile ? profile.name : user ? user.name : 'Unknown';
  const avatar = profile && profile.gender === 'female' ? Avatar1 : Avatar2;
  return (
    <Aux>
      <ul className='navbar-nav ml-auto'>
        <li>
          <Dropdown className='drp-user'>
            <Dropdown.Toggle variant={'link'} id='dropdown-basic'>
              {/* <h3>
                <i className='icon feather icon-settings' />
              </h3> */}
              <div className='pro-head'>
                <img
                  src={avatar ? avatar : ''}
                  height='40px'
                  width='40px'
                  className='img-radius'
                  alt='User Profile'
                />
                <span className='h5 m-2 mt-4 text-primary'>
                  {name ? name : ''}
                </span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className='profile-notification'>
              {/* <div className='pro-head'>
                <img src={Avatar2} className='img-radius' alt='User Profile' />
                <span>Test User</span>
              </div> */}
              <ul className='pro-body'>
                {profile && profile.isPrimary ? (
                  <li>
                    <a
                      href={`/members/${profile._id}`}
                      lassName='dropdown-item'
                    >
                      <i className='feather icon-user-plus' />
                      Switch Profile
                    </a>
                  </li>
                ) : (
                  <li>
                    <a href='/profile' className='dropdown-item'>
                      <i className='feather icon-user' />
                      Primary Profile
                    </a>
                  </li>
                )}

                <li>
                  <a
                    href='/auth/signin'
                    onClick={logout}
                    className='dropdown-item'
                  >
                    <i className='feather icon-log-out' />
                    Log out
                  </a>
                </li>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </Aux>
  );
};
NavRight.propTypes = {
  logout: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  listOpen: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  listOpen: false,
  profile: state.profile
});
export default connect(mapStateToProps, { logout, getCurrentProfile })(
  NavRight
);
