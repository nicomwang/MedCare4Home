import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../../../HMC/Home/Dashboard';
import Profile from '../../../HMC/Profile/Profile';
import FamilyMember from '../../../HMC/Profile/FamilyMember';
import MemberProfile from '../../../HMC/Profile/MemberProfile';
import Appointment from '../../../HMC/Appointment/Appointment';
import Measurement from '../../../HMC/HomeHealthTesting/Measurement';
import Visualization from '../../../HMC/HomeHealthTesting/Visualization/Visualization';
import Medication from '../../../HMC/Medication/Medication';
import ReportSymptom from '../../../HMC/ReportSymptom/ReportSymptom';
import ProfileForm from '../../../HMC/Profile-Form/ProfileForm';
import AddMemberProfileForm from '../../../HMC/Profile-Form/AddMemberProfileForm';
import EditMemberProfileForm from '../../../HMC/Profile-Form/EditMemberProfileForm';
import Pulse from '../../../HMC/HealthMonitor/Pulse';
import MedicalTest from '../../../HMC/MedicalTest/MedicalTest';

const Routes = (props) => {
  return (
    <Switch>
      <PrivateRoute exact path='/' component={Dashboard} />
      <PrivateRoute exact path='/home' component={Dashboard} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <PrivateRoute exact path='/members/:id' component={FamilyMember} />
      <PrivateRoute exact path='/add-profile' component={ProfileForm} />
      <PrivateRoute exact path='/edit-profile' component={ProfileForm} />

      <PrivateRoute
        exact
        path='/add-member-profile'
        component={AddMemberProfileForm}
      />
      <PrivateRoute
        exact
        path='/edit-member-profile/:id'
        component={EditMemberProfileForm}
      />
      <PrivateRoute exact path='/profile/:id' component={MemberProfile} />
      <PrivateRoute exact path='/appointment' component={Appointment} />
      <PrivateRoute exact path='/body-measurement' component={Measurement} />
      <PrivateRoute exact path='/visualization' component={Visualization} />
      <PrivateRoute exact path='/home-medical-test' component={MedicalTest} />
      <PrivateRoute exact path='/medication' component={Medication} />
      <PrivateRoute exact path='/health-monitor/pulse' component={Pulse} />
      <PrivateRoute exact path='/report-symptoms' component={ReportSymptom} />
    </Switch>
  );
};

export default Routes;
