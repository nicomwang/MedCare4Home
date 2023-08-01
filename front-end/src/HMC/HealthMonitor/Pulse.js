import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import Aux from '../../hoc/_Aux';

class Pulse extends Component {
  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card title='Pulse' isOption>
              <p>This page in progressing</p>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Pulse;
