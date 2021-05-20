import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import logo from '../images/pink-logo.svg';
import '../stylesheets/scss/eligibility.scss';

const EligibilityScreen = () => {
    return (
        <div className="container">
            <Row>
                <div className="backtostore">
                    <a href="/"><i style={{ color: '#720056' }} className="fas fa-arrow-left"></i> Back To Store</a>
                </div>
            </Row>
            <Row className="container text-right">
                <Col md={{ span: 10, offset: 1 }} className="text-center card">
                    <div className="logo">
                        <Image fluid src={logo} />
                    </div>
                    <p className="text-p">Buy now and pay later in up to 6 installments, automatically charged every month.</p>
 
                    <div className='list-section'>
                        <p>All you need is to:</p>
                        <ul>
                            <li><span>Shop up to N50,000 or more</span></li>
                            <li><span>Live and Work in Nigeria</span></li>
                            <li><span>Have a valid email address and telephone number</span></li>
                            <li><span>Have a verifiable income or cash flow paid into a bank account</span></li>
                        </ul>
                    </div>
                        <p className="text-p">You must be 22 years or older and be eligible to use this Buy Now Pay Later product.</p>
                    <div className="content">
                        <span>
                            To check your eligibility, PayQart will perform a preliminary assessment and pre-approve you for a shopping credit 
                            based on a few information that you will need to provide. This pre-approval is not a guarantee that your credit 
                            application will be approved. Final credit approvals are subject to underwriting guidelines including performing 
                            soft searches with credit reference agencies. By continuing I accept the Pay Later Terms and PayQart Terms
                            and Conditions, and confirm that I have read the Privacy Notice and the Cookie Notice.
                        </span>
                    </div>
                    <div>
                        <Button className='proced-button' onClick={() => console.log('clicked!')}>
                            Proceed
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default EligibilityScreen
