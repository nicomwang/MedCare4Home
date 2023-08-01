import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_MEMBER_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  NO_REPOS
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get member profiles
export const getMemberProfiles = (primaryID) => async (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await api.get(`/profile/members/${primaryID}`);

    dispatch({
      type: GET_MEMBER_PROFILES,
      payload: res.data
    });
    // dispatch({ type: GET_PROFILE });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = (profileId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/${profileId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      console.log(formData);
      const res = await api.post('/profile', formData);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
        // setAlert('Profile Created', 'success')
      );
      history.push('/home');
      // if (!edit) {
      //   history.push('/home');
      // } else {
      //   history.push('/profile');
      // }
    } catch (err) {
      console.log('Error:', err);
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
// Create or update Memberprofile
export const createMemberProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      console.log('Member Adding', formData);
      const res = await api.post('/profile/member', formData);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(
        setAlert(
          edit ? 'Member Profile Updated' : 'Member Profile Created',
          'success'
        )
        // setAlert('Profile Created', 'success')
      );
      console.log('Member Adding', formData);
      history.push(`/members/${formData.primaryProfile}`);
      // if (!edit) {
      //   history.push('/');
      // } else {
      //   history.push('/profile');
      // }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Add Appointment
export const addAppointment = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    const res = await api.put('/profile/appointment', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Appointment Added', 'success'));
    console.log('history', history);
    // history.push('/home');
  } catch (err) {
    console.log('add appt error: ', err);
    const errors = err.response.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete appointment
export const deleteAppointment = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/appointment/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Appointment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Add Medical Test
export const addMedicalTest = (formData, profileID) => async (dispatch) => {
  var data = {};
  data.formData = formData;
  data.profileID = profileID;
  try {
    console.log(data);
    const res = await api.put(`/profile/medTest/${profileID}`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Medical Test Added', 'success'));
    // history.push('/home');
  } catch (err) {
    const errors = err.response.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Update Medical Test
export const updateMedicalTest =
  (formData, testID, profileID) => async (dispatch) => {
    try {
      const res = await api.put(
        `/profile/medTest/${profileID}/${testID}`,
        formData
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Medical Test Added', 'success'));
      // history.push('/home');
    } catch (err) {
      const errors = err.response.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Delete Medical Test
export const deleteMedicalTest = (profileID, testID) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/medTest/${profileID}/${testID}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Medical Test Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Add Symptom Report
export const addSymptom = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    const res = await api.put('/profile/symptom', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Symptom Added', 'success'));
    // history.push('/home');
  } catch (err) {
    const errors = err.response.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete Symptom
export const deleteSymptom = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/symptom/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Symptom Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Update medication
export const updateMedication =
  (formData, testID, profileID) => async (dispatch) => {
    try {
      const res = await api.put(
        `/profile/medication/${profileID}/${testID}`,
        formData
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Medication Updated', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
// Delete medication
export const deleteMedication = (profileID, testID) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/medication/${profileID}/${testID}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Medication Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Medication
export const addMedication = (formData, profileID) => async (dispatch) => {
  try {
    const res = await api.put(`/profile/medication/${profileID}`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Medication Added', 'success'));

    // history.push('/home');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
