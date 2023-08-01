import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import '../../assets/scss/style.scss';
import humanbody from '../../assets/images/widget/human_body.png';
class Measurement extends React.Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title as='h5'>
            Measurements
            {/* <Button className="btn theme-bg text-uppercase text-white float-right"> <i className="feather icon-edit "/>Edit Data</Button> */}
          </Card.Title>
        </Card.Header>
        <Card.Body className='border-bottom text-center mt-0'>
          <Row>
            <Col xl={4}>
              <Card>
                <Card.Body>
                  <div className='pt-2 pb-1 mb-3'>
                    <span className=''>Neck:</span>
                    <span className='text-muted '>Data</span>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div className='pt-2 pb-1 mb-3'>
                    <span className=''>Neck:</span>
                    <span className='text-muted '>Data</span>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div className='pt-2 pb-1 mb-3'>
                    <span className=''>Neck:</span>
                    <span className='text-muted '>Data</span>
                  </div>
                </Card.Body>
              </Card>
              {/* <div >
                                            <h5 className="">Weight</h5>
                                            <h3 className="mb-4 f-w-300">110 lb</h3>
                                            <span className="text-muted">June 23,2021</span>
                                        </div>
                                        <div >
                                            <h5 className="">Height</h5>
                                            <h3 className="mb-2 f-w-300">5'4</h3>
                                            <span className="text-muted">June 23,2021</span>
                                        </div>
                                        <div >
                                            <h5 className="">IBM</h5>
                                            <h4 className="mb-2 f-w-300">20</h4>
                                            <span className="text-muted">June 23,2021</span>
                                        </div> */}
            </Col>
            <Col xl={8}>
              <Row className=''>
                <Col xl={4}>
                  <div className='pt-2 pb-1 mb-3 card border'>
                    <span className=''>Neck:</span>
                    <span className='text-muted '>Data</span>
                  </div>
                  <div className='pt-2 pb-1 mb-3 card border'>
                    <span className=''>Bust:</span>
                    <span className='float-right text-muted '>Data</span>
                  </div>
                  <div className='pt-2 pb-1 mb-3 card border'>
                    <span className=''>Abdomen:</span>
                    <span className='float-right text-muted '>Data</span>
                  </div>
                  <div className='pt-2 pb-1 mb-3 card border'>
                    <span className=''>Biceps:</span>
                    <span className='float-right text-muted text-c-blue'>
                      L
                    </span>
                  </div>
                  <div className='pt-2 pb-1 mb-3 card border'>
                    <span className=''>Thigh:</span>
                    <span className='float-right text-muted text-primary text-c-blue'>
                      L
                    </span>
                  </div>
                  <div className='pt-2 pb-1 mb-3 card border '>
                    <span className=''>Calf:</span>
                    <span className='float-right text-muted text-primary text-c-blue'>
                      L
                    </span>
                  </div>
                </Col>
                <Col xl={4}>
                  <Card.Img src={humanbody} />
                </Col>
                <Col xl={4}>
                  <div className='pt-2 pb-1 mb-3 card border'>
                    <span className=''>Shoulder:</span>
                    <span className='float-right text-muted '>Data</span>
                  </div>
                  <div className='pt-2 pb-1 mb-3 card border'>
                    <span className=''>Waist:</span>
                    <span className='float-right text-muted '>Data</span>
                  </div>
                  <div className='pt-2 pb-1 mb-3 card border'>
                    <span className=''>Hip:</span>
                    <span className='float-right text-muted '>Data</span>
                  </div>
                  <div className='pt-2 pb-1 mb-3 card border'>
                    <span className=''>Biceps:</span>
                    <span className='float-right text-muted text-c-red'>R</span>
                  </div>
                  <div className='pt-2 pb-1 mb-3 card border'>
                    <span className=''>Thigh:</span>
                    <span className='float-right text-muted text-primary text-c-red'>
                      R
                    </span>
                  </div>
                  <div className='pt-2 pb-1 mb-3 card border '>
                    <span className=''>Calf:</span>
                    <span className='float-right text-muted text-primary text-c-red'>
                      R
                    </span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default Measurement;
