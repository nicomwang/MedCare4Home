import React from 'react';
import $ from 'jquery';
import Profile from './HMC/Profile/Profile';
import Home from './HMC/Home/Dashboard';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

//Home
// const Home = React.lazy(() => import('./HMC/Home'));

//Appointment
const Appointment = React.lazy(() => import('./HMC/Appointment/Appointment'));

//Medical Instruction
//Home Health Testing
const Measurement = React.lazy(() =>
  import('./HMC/HomeHealthTesting/Measurement')
);
const MedicalTest = React.lazy(() => import('./HMC/MedicalTest/MedicalTest'));
const Visualization = React.lazy(() =>
  import('./HMC/HomeHealthTesting/Visualization/Visualization')
);
//Medication
const Medication = React.lazy(() => import('./HMC/Medication/Medication'));
// const Reminder = React.lazy(() => import('./HMC/Medication/Reminder'));

//HealthMonitor
const Pulse = React.lazy(() => import('./HMC/HealthMonitor/Pulse'));
const ReportSymptom = React.lazy(() =>
  import('./HMC/ReportSymptom/ReportSymptom')
);

//Profile
// const Profile = React.lazy(() => import('./App/components/Profile'));

// const Profile = React.lazy(() => import('./HMC/Profile/PersonalInfo'));

const routes = [
  { path: '/home', exact: true, name: 'Home', component: { Home } },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  {
    path: '/appointment',
    exact: true,
    name: 'Appointment Calendar',
    component: Appointment
  },
  {
    path: '/body-measurement',
    exact: true,
    name: 'Measurement',
    component: Measurement
  },
  {
    path: '/visualization',
    exact: true,
    name: 'Visualization',
    component: Visualization
  },
  {
    path: '/home-medical-test',
    exact: true,
    name: 'Medical Test',
    component: MedicalTest
  },
  {
    path: '/medication',
    exact: true,
    name: 'Prescription',
    component: Medication
  },
  {
    path: '/health-monitor/pulse',
    exact: true,
    name: 'Pulse Monitor',
    component: Pulse
  },
  {
    path: '/report-symptoms',
    exact: true,
    name: 'Report Symptoms',
    component: ReportSymptom
  }
];

export default routes;
