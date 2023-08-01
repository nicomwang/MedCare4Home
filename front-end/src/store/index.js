import { combineReducers } from 'redux';
import alert from './alert';
import layout from './layout';
// import layout from './layout';

export default combineReducers({
  alert,
  layout
});
