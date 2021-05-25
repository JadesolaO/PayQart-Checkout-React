import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProgressSteps from '../components/ProgressSteps';
import '../stylesheets/scss/creditscreen.scss';

const CreditScreen = (props) => {
  return (
    <div className='creditscreen'>
      <div className="topsection">
        <Link to="/creditscreen"><i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i> Back</Link>
      </div>
      <div className="steps">
      <ProgressSteps step1 step2 step3 complete/>
      </div>
      <Container fluid>
        <Row className='justify-content-md-center'>
          <Col className='boxes mx-3 mb-3' xs={12} md={6}>
            <div className="text">
              <p className='mb-2'>Wallet Balance</p>
              <h5 className='mb-2'>₦0.00</h5>
              {/* <p className="text-muted">Expires in 29 days</p> */}
            </div>
          </Col>
          <Col className='boxes mx-3 mb-3' xs={12} md={6}>
            <div className="text">
              <p className='mb-2'>Available Shopping Credit</p>
              <h5 className='mb-2'>₦0.00</h5>
              {/* <p className="text-muted">Approved Tenor: 5 months</p> */}
            </div>
          </Col>
            <div className="apply-button my-3 text-center">
              <Button 
              size='lg'
              onClick={() => props.history.push('/creditapplication')}
              >
                Apply To Breakdown
            </Button>
            </div>
        </Row>
      </Container>
    </div>
  )
}

export default CreditScreen