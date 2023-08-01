import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import './../../assets/scss/style.scss';
import Aux from '../../hoc/_Aux';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';

import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from './../../App/layout/Alert';
const SignIn = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    // const user = {
    //   email,
    //   password
    // };
    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   };

    //   const body = JSON.stringify(user);

    //   axios
    //     .post('http://localhost:5000/api/auth ', body, config)
    //     .then((res) => {
    //       console.log(res);
    //       return <Redirect to='/home' />;
    //     });
    // } catch (err) {
    //   console.log(err.data);
    // }
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
                  <i className='feather icon-unlock auth-icon' />
                </div>
                <h3 className='mb-4'>Login</h3>
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
                <div className='form-group text-left'></div>
                <button type='submit' className='btn btn-primary shadow-2 mb-4'>
                  Login
                </button>
                <p className='mb-0 text-muted'>
                  Don’t have an account?{' '}
                  <NavLink to='/auth/signup'>Signup</NavLink>
                </p>
                <div className='m-3 d-block'>
                  <Alert />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Aux>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(SignIn);
