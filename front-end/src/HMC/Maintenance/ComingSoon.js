import React from 'react';
import { NavLink } from 'react-router-dom';

import Aux from '../../hoc/_Aux';
import '../../assets/scss/style.scss';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';

class ComingSoon extends React.Component {
  render() {
    return (
      <Aux>
        <Breadcrumb />
        <div className='auth-wrapper offline'>
          <div className='text-center'>
            <h1 className='mb-4'>Coming Soon</h1>
            <h5 className='text-muted mb-4'>
              Pulse Monitor will be in Future work
            </h5>
            <NavLink to='/' className='btn btn-primary mb-4'>
              <i className='feather icon-home' />
              Back to Home
            </NavLink>
          </div>
        </div>
      </Aux>
    );
  }
}

export default ComingSoon;
