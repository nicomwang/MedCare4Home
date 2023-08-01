import React, { Component } from 'react';
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';

import Aux from '../../../hoc/_Aux';

import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import DEMO from '../../../store/constant';
import AmChartStatistics4 from '../Chart/AmChartStatistics4';
class Home extends Component {
  render() {
    return (
      <Aux>
        <Row>
          <Col md={6} xl={6}>
            <Card className='theme-bg earning-date'>
              <Card.Header className='borderless'>
                <Card.Title as='h5' className='text-white'>
                  Upcoming Appointment
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div className='bd-example bd-example-tabs'>
                  <Tab.Container id='left-tabs-example' defaultActiveKey='mon'>
                    <Tab.Content>
                      <Tab.Pane eventKey='mon'>
                        <h2 className='text-white mb-3 f-w-300'>2:00pm</h2>
                        <span className='text-white mb-2 d-block'>
                          Check up appointment
                        </span>
                        <span className='text-white mb-4 d-block'>
                          {' '}
                          @ Boston Medical Center
                        </span>
                      </Tab.Pane>
                      <Tab.Pane eventKey='tue'>
                        <h3 className='text-white mb-4 f-w-300'>
                          No appointment
                        </h3>
                        <a
                          href={DEMO.BLANK_LINK}
                          className='btn btn-primary shadow-2 text-uppercase btn-block mb-4'
                          style={{ maxWidth: '300px', margin: '0 auto' }}
                        >
                          Add New Appt
                        </a>
                      </Tab.Pane>
                      <Tab.Pane eventKey='wed'>
                        <h3 className='text-white mb-4 f-w-300'>
                          No appointment
                        </h3>
                        <a
                          href={DEMO.BLANK_LINK}
                          className='btn btn-primary shadow-2 text-uppercase btn-block mb-4'
                          style={{ maxWidth: '300px', margin: '0 auto' }}
                        >
                          Add New Appt
                        </a>
                      </Tab.Pane>
                      <Tab.Pane eventKey='thu'>
                        <h3 className='text-white mb-4 f-w-300'>
                          No appointment
                        </h3>
                        <a
                          href={DEMO.BLANK_LINK}
                          className='btn btn-primary shadow-2 text-uppercase btn-block mb-4'
                          style={{ maxWidth: '300px', margin: '0 auto' }}
                        >
                          Add New Appt
                        </a>
                      </Tab.Pane>
                      <Tab.Pane eventKey='fri'>
                        <h3 className='text-white mb-4 f-w-300'>
                          No appointment
                        </h3>
                        <a
                          href={DEMO.BLANK_LINK}
                          className='btn btn-primary shadow-2 text-uppercase btn-block mb-4'
                          style={{ maxWidth: '300px', margin: '0 auto' }}
                        >
                          Add New Appt
                        </a>
                      </Tab.Pane>
                      <Tab.Pane eventKey='sat'>
                        <h3 className='text-white mb-4 f-w-300'>
                          No appointment
                        </h3>
                        <a
                          href={DEMO.BLANK_LINK}
                          className='btn btn-primary shadow-2 text-uppercase btn-block mb-4'
                          style={{ maxWidth: '300px', margin: '0 auto' }}
                        >
                          Add New Appt
                        </a>
                      </Tab.Pane>
                      <Tab.Pane eventKey='sun'>
                        <h3 className='text-white mb-4 f-w-300'>
                          No appointment
                        </h3>
                        <a
                          href={DEMO.BLANK_LINK}
                          className='btn btn-primary shadow-2 text-uppercase btn-block mb-4'
                          style={{ maxWidth: '300px', margin: '0 auto' }}
                        >
                          Add New Appt
                        </a>
                      </Tab.Pane>
                    </Tab.Content>
                    <Nav
                      variant='pills'
                      className='align-items-center justify-content-center'
                    >
                      <Nav.Item>
                        <Nav.Link eventKey='mon'>Mon</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey='tue'>Tue</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey='wed'>Wed</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey='thu'>Thu</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey='fri'>Fri</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey='sat'>Sat</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey='sun'>Sun</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Tab.Container>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as='h5'>Medication Reminder</Card.Title>
              </Card.Header>
              <Card.Body className='border-bottom'>
                <div className='row d-flex align-items-center'>
                  <div className='col-auto'>
                    <i className='feather icon-sun f-40 text-c-green' />
                  </div>
                  <div className='col'>
                    <h3 className='f-w-300'>Acetaminophen</h3>
                    <span className='d-block text-muted'>1 pill</span>
                  </div>
                </div>
                <div className='row d-flex align-items-center'>
                  <div className='col-auto'>
                    <i className='feather icon-cloud f-40 text-c-green' />
                  </div>
                  <div className='col'>
                    <h3 className='f-w-300'>Atorvastatin</h3>
                    <span className='d-block text-muted'>1 pill</span>
                  </div>
                </div>
                <div className='row d-flex align-items-center'>
                  <div className='col-auto'>
                    <i className='feather icon-moon f-40 text-c-green' />
                  </div>
                  <div className='col'>
                    <h3 className='f-w-300'>Januvia</h3>
                    <span className='d-block text-muted'>2 pills</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={6}>
            <Card>
              <Card.Body>
                <div className='text-center m-b-30'>
                  <img
                    className='img-fluid rounded-circle'
                    src={avatar2}
                    alt='dashboard-user'
                  />
                  <h3 className='mt-3'>Test User</h3>
                </div>
                <div className='row card-active mb-5'>
                  <div className='col-md-4 col-6'>
                    <h4>110 lb</h4>
                    <span className='text-muted'>Weight</span>
                  </div>
                  <div className='col-md-4 col-6'>
                    <h4>5'4</h4>
                    <span className='text-muted'>Height</span>
                  </div>
                  <div className='col-md-4 col-12'>
                    <h4>20</h4>
                    <span className='text-muted'>IBM</span>
                  </div>
                </div>
                <ul className='task-list'>
                  <li>
                    <i className='task-icon bg-c-green' />
                    <h6>
                      Cholesterol Testing
                      <span className='float-right text-muted'>Monthly</span>
                    </h6>
                    <p className='text-muted'>Lorem ipsum is dolorem…</p>
                  </li>
                  <li>
                    <i className='task-icon bg-c-green' />
                    <h6>
                      Blood Pressure Monitor
                      <span className='float-right text-muted'>Daily</span>
                    </h6>
                    <p className='text-muted'>Lorem ipsum is dolorem…</p>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as='h5'>Family Weight</Card.Title>
              </Card.Header>
              <Card.Body>
                <AmChartStatistics4 />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Home;
