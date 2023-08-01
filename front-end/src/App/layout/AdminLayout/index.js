import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Fullscreen from 'react-full-screen';
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from '../Loader';
import routes from '../../../routes';
import Aux from '../../../hoc/_Aux';
import * as actionTypes from '../../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import './app.scss';
import PrivateRoute from '../../components/routing/PrivateRoute';
import Routes from '../../components/routing/Routes';
import { Alert } from 'react-bootstrap';

class AdminLayout extends Component {
  fullScreenExitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.props.onFullScreenExit();
    }
  };

  componentWillMount() {
    if (
      this.props.windowWidth > 992 &&
      this.props.windowWidth <= 1024 &&
      this.props.layout !== 'horizontal'
    ) {
      this.props.onComponentWillMount();
    }
  }

  mobileOutClickHandler() {
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onComponentWillMount();
    }
  }

  render() {
    /* full screen exit call */
    document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
    document.addEventListener(
      'webkitfullscreenchange',
      this.fullScreenExitHandler
    );
    document.addEventListener(
      'mozfullscreenchange',
      this.fullScreenExitHandler
    );
    document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

    const menu = routes.map((route, index) => {
      return route.component ? (
        <PrivateRoute
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => <route.component {...props} />}
        />
      ) : null;
    });

    return (
      <Aux>
        <Fullscreen enabled={this.props.isFullScreen}>
          <Navigation />
          <NavBar />
          <div
            className='pcoded-main-container'
            onClick={() => this.mobileOutClickHandler}
          >
            <div className='pcoded-wrapper p-0'>
              <div className='pcoded-content mt-0 pt-0'>
                {/* test3 */}
                <div className='pcoded-inner-content mt-0'>
                  {/* test4 */}
                  <Breadcrumb />
                  <div className='main-body'>
                    <Alert />
                    <div className='page-wrapper'>
                      {/* <ToastContainer /> */}
                      <Suspense fallback={<Loader />}>
                        <Switch>
                          <Route component={Routes} />
                          <Redirect from='/' to='/home' />
                        </Switch>
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fullscreen>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    defaultPath: state.defaultPath,
    isFullScreen: state.isFullScreen,
    collapseMenu: state.collapseMenu,
    configBlock: state.configBlock,
    layout: state.layout
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
    onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(AdminLayout));
