import React from 'react';

const SignUp = React.lazy(() => import('./HMC/Authentication/SignUp'));
const Signin = React.lazy(() => import('./HMC/Authentication/SignIn'));
const CommingSoon = React.lazy(() => import('./HMC/Maintenance/ComingSoon'));

const route = [
  { path: '/auth/signup', exact: true, name: 'Signup', component: SignUp },
  { path: '/auth/signin', exact: true, name: 'Signin', component: Signin },
  {
    path: '/maintenance/coming-soon',
    exact: true,
    name: 'CommingSoon',
    component: CommingSoon
  }
];

export default route;
