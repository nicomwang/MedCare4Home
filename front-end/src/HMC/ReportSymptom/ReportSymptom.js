import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Aux from '../../hoc/_Aux';
import AddSymptom from './AddSymptom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  getCurrentProfile,
  deleteMedication,
  updateMedication
} from '../../actions/profile';
const ReportSymptom = ({
  getCurrentProfile,
  deleteSymptom,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  var symptom = profile && profile.symptomReport ? profile.symptomReport : [];

  const symptoms = symptom.map((sym) => (
    <tr>
      <th scope='row'></th>
      <td>{sym.name}</td>
      <td>{moment.utc(sym.date).format('MM-DD-YYYY')}</td>

      <td>
        {/* <img src={require(/../../../public/symptom/${sym.filename})} /> */}
        {/* <img
          src={`/../../../public/symptom/${sym.filename}`}
          alt='...'
          class='img-thumbnail'
        /> */}
        <a href=''> View Photo</a>
      </td>
      <td>
        <Button
          className=' m-2 float-right btn-icon btn-rounded btn-danger'
          onClick={() => {}}
        >
          <i className='feather icon-trash f-20 text-white' />
        </Button>
        <Button
          className=' m-2 float-right btn-icon btn-rounded btn-warning'
          onClick={() => {}}
        >
          <i className='feather icon-edit f-20 text-white' />
        </Button>
      </td>
    </tr>
  ));
  return (
    <Aux>
      <Row>
        <Col xl={5}>
          <AddSymptom />
        </Col>
        <Col xl={7}>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>Symptom Report</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive className='mb-0'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Photo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{symptoms}</tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

ReportSymptom.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteSymptom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteMedication,
  updateMedication
})(ReportSymptom);
