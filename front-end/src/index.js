import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import layout from './store/layout';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import config from './config';
// import rootReducer from './store/index';
import store from './store';
// const store = createStore(layout);
// const store = createStore(rootReducer);

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';
import { getCurrentProfile } from './actions/profile';
const Main = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    store.dispatch(getCurrentProfile());
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter basename={config.basename}>
        {/* basename="/home-medical-care" */}
        <App />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.unregister();
