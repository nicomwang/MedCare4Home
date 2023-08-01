import React, { useEffect } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Aux from '../../hoc/_Aux';
import { getCurrentProfile } from '../../actions/profile';
const Calendar = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    console.log('Calendar call');
    getCurrentProfile();
  }, [getCurrentProfile]);
  var today = new Date();
  console.log('Today', today.getDate());
  var appt = profile && profile.appointment ? profile.appointment : [];
  const appointments = appt.map((appt) => {
    var obj = {};
    obj.title = appt.type;
    obj.start = appt.date;
    obj.backgroundColor = appt.calColor;
    return obj;
  });

  return (
    <Aux>
      <FullCalendar
        id='datta-calendar'
        className='calendar'
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        }}
        defaultDate={today}
        navLinks={true}
        editable={true}
        eventLimit={true}
        events={appointments}
      />
    </Aux>
  );
};
Calendar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { getCurrentProfile })(Calendar);
