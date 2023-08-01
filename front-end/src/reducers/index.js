import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import medication from './medication';
// import layout from './../store/layout';
import layout from './layout';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  layout,
  medication
});
