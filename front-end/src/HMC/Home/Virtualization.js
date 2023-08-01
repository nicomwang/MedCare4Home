import React from 'react';
import { Card } from 'react-bootstrap';
import AmChartStatistics4 from '../Chart/AmChartStatistics4';
const Virtualization = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title as='h5'>Family Weight</Card.Title>
      </Card.Header>
      <Card.Body>
        <AmChartStatistics4 />
      </Card.Body>
    </Card>
  );
};

export default Virtualization;
