import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import './../../assets/scss/style.scss';
import Aux from '../../hoc/_Aux';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
// import DEMO from "../../store/constant";

//Redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from './../../App/layout/Alert';

const SignUp = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <Aux>
      <Breadcrumb />

      <div className='auth-wrapper'>
        <div className='auth-content'>
          <div className='auth-bg'>
            <span className='r' />
            <span className='r s' />
            <span className='r s' />
            <span className='r' />
          </div>
          <form onSubmit={onSubmit}>
            <div className='card'>
              <div className='card-body text-center'>
                <div className='mb-4'>
                  <i className='feather icon-user-plus auth-icon' />
                </div>
                <h3 className='mb-4'>Sign up</h3>
                <div className='input-group mb-3'>
                  <input
                    type='input'
                    className='form-control'
                    placeholder='Your name'
                    name='name'
                    value={name}
                    onChange={onChange}
                  />
                </div>
                <div className='input-group mb-3'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={onChange}
                  />
                </div>

                <div className='input-group mb-4'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <div className='input-group mb-4'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='confirm password'
                    name='password2'
                    value={password2}
                    onChange={onChange}
                  />
                </div>
                <button type='submit' className='btn btn-primary shadow-2 mb-4'>
                  Sign up
                </button>
                <p className='mb-0 text-muted'>
                  Allready have an account?{' '}
                  <NavLink to='/auth/signin'>Login</NavLink>
                </p>
              </div>
              <div className='m-3 d-block'>
                <Alert />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Aux>
  );
};
SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(SignUp);
