import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_MEDICATIONS,
  ADD_MEDICATION,
  MEDICATION_ERROR,
  UPDATE_MEDICATION,
  DELETE_MEDICATION
} from './types';

// Get medications
export const getMedication = (profile_id) => async (dispatch) => {
  try {
    const res = await api.get(`/medication/${profile_id}`);

    dispatch({
      type: GET_MEDICATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MEDICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete medication
export const deleteMedication = (id) => async (dispatch) => {
  try {
    await api.delete(`/medication/${id}`);

    dispatch({
      type: DELETE_MEDICATION,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: MEDICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add medication
export const addMedication = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/medication', formData);

    dispatch({
      type: ADD_MEDICATION,
      payload: res.data
    });

    dispatch(setAlert('Medication Added', 'success'));
  } catch (err) {
    dispatch({
      type: MEDICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update medication
export const updateMedication = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/medication/${id}`, formData);

    dispatch({
      type: UPDATE_MEDICATION,
      payload: { id, medications: res.data }
    });
  } catch (err) {
    dispatch({
      type: MEDICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
