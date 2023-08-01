import React from 'react';
import {
  Card,
  Col,
  Row,
  Table,
  InputGroup,
  Form,
  DropdownButton,
  Dropdown
} from 'react-bootstrap';
import '../../assets/scss/style.scss';
import DEMO from '../../store/constant';
import Datetime from 'react-datetime';

class Document extends React.Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title as='h5'>
            {' '}
            Medical Document
            {/* <a href={DEMO.BLANK_LINK} className="btn theme-bg text-uppercase text-white float-right"><i className="feather icon-user-plus f-20 text-white"/>Add Member</a> */}
          </Card.Title>
        </Card.Header>
        <Card.Body className=''>
          <Form>
            <InputGroup className='mb-3'>
              <DropdownButton
                as={InputGroup.Prepend}
                title='Document Type'
                id='input-group-dropdown-1'
              >
                <Dropdown.Item href='#'>Insurance Card</Dropdown.Item>
                <Dropdown.Item href='#'>Immunization Record</Dropdown.Item>
                <Dropdown.Item href='#'>Vision Prescription</Dropdown.Item>
                <Dropdown.Item href='#'>Hospital Bill</Dropdown.Item>
              </DropdownButton>
              <Form.Control
                aria-describedby='custom-addons5'
                type='file'
                className='custom-file-input'
                id='validatedCustomFile1'
              />
              <Form.Label
                className='custom-file-label'
                htmlFor='validatedCustomFile1'
              >
                Choose file
              </Form.Label>
            </InputGroup>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Datetime inputProps={{ placeholder: 'Select Date' }} />
            </Form.Group>

            <a
              href={DEMO.BLANK_LINK}
              className='btn theme-bg text-uppercase text-white float-right my-0'
            >
              <i className='feather icon-user-plus f-20 text-white' />
              Upload Document
            </a>
          </Form>
        </Card.Body>
        <hr />
        <Card.Body className='task-attachment'>
          <ul className='media-list p-0'>
            <li className='media d-flex m-b-15'>
              <div className='m-r-20 file-attach'>
                <i className='fa fa-file-word-o f-28 text-muted' />
              </div>
              <div className='media-body'>
                <a
                  href={DEMO.BLANK_LINK}
                  className='m-b-5 d-block text-secondary'
                >
                  Overdrew_scowled.doc
                </a>
                <div className='text-muted'>
                  <span>Size: 1.2Mb</span>
                  <span>
                    Added by{' '}
                    <a href={DEMO.BLANK_LINK} className='text-secondary'>
                      Winnie
                    </a>
                  </span>
                </div>
              </div>
              <div className='float-right text-muted'>
                <i className='fa fa-download f-18' />
              </div>
            </li>
            <li className='media d-flex m-b-15'>
              <div className='m-r-20 file-attach'>
                <i className='fa fa-file-powerpoint-o f-28 text-muted' />
              </div>
              <div className='media-body'>
                <a
                  href={DEMO.BLANK_LINK}
                  className='m-b-5 d-block text-secondary'
                >
                  And_less_maternally.pdf
                </a>
                <div className='text-muted'>
                  <span>Size: 0.11Mb</span>
                  <span>
                    Added by{' '}
                    <a href={DEMO.BLANK_LINK} className='text-secondary'>
                      Eugene
                    </a>
                  </span>
                </div>
              </div>
              <div className='float-right text-muted'>
                <i className='fa fa-download f-18' />
              </div>
            </li>
            <li className='media d-flex m-b-15'>
              <div className='m-r-20 file-attach'>
                <i className='fa fa-file-pdf-o f-28 text-muted' />
              </div>
              <div className='media-body'>
                <a
                  href={DEMO.BLANK_LINK}
                  className='m-b-5 d-block text-secondary'
                >
                  The_less_overslept.pdf
                </a>
                <div className='text-muted'>
                  <span>Size:5.9Mb</span>
                  <span>
                    Added by{' '}
                    <a href={DEMO.BLANK_LINK} className='text-secondary'>
                      Natalie
                    </a>
                  </span>
                </div>
              </div>
              <div className='float-right text-muted'>
                <i className='fa fa-download f-18' />
              </div>
            </li>
            <li className='media d-flex m-b-15'>
              <div className='m-r-20 file-attach'>
                <i className='fa fa-file-excel-o f-28 text-muted' />
              </div>
              <div className='media-body'>
                <a
                  href={DEMO.BLANK_LINK}
                  className='m-b-5 d-block text-secondary'
                >
                  Well_equitably.mov
                </a>
                <div className='text-muted'>
                  <span>Size:20.9Mb</span>
                  <span>
                    Added by{' '}
                    <a href={DEMO.BLANK_LINK} className='text-secondary'>
                      Jenny
                    </a>
                  </span>
                </div>
              </div>
              <div className='float-right text-muted'>
                <i className='fa fa-download f-18' />
              </div>
            </li>
          </ul>
        </Card.Body>
      </Card>
    );
  }
}

export default Document;
