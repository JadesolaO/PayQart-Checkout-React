import React, { useState } from 'react'
import { Row, Col, Container, Button, Image } from 'react-bootstrap'
import '../stylesheets/scss/creditapplicationscreen.scss'
import contact from '../images/contact.png'
import mail from '../images/mail.png'
import Union from '../images/Union.png'
import bank from '../images/bank.png'
import ref from '../images/ref.png'
import PersonalInformation from '../components/PersonalInformation'
import ContactDetails from '../components/ContactDetails'
import EmploymentInformation from '../components/EmploymentInformation'
import BankInformation from '../components/BankInformation'
import RefereeInformation from '../components/RefereeInformation'
import { Link } from 'react-router-dom'
import { makeFeePayment } from '../services/creditFormService';


const CreditApplicationScreen = (props) => {
  const [form, setForm] = useState('personalInfo');

  const setPage = (page) => {
    setForm(page);
  }

  const startPayment = () => {
    var obj = { id : '6700', email: localStorage.getItem('userEmail') }
    makeFeePayment(obj)
      .then(res => {
        console.log(res.data);
        const url = res.data['data']['data']['authorization_url']
        // let reference = data["data"]["data"]["reference"]
        // window.localStorage.setItem("current_reference",reference)
        window.location.href = url;
      })
      .catch(() => {});
  }

  return (
    <Container>
      <Row className='justify-content-md-center my-auto'>
      <div className="top-sect">
        <Link to="/"><i className="fas fa-arrow-left"></i> Back</Link>
      </div>
        <Col className='app-form' md={9} xs={12}>
          <Row className='justify-content-md-center'>
            <Col className='side-bar text-center' md={4}>
              <h3 className='my-4'>Credit Application Form</h3>
              <div className="side-buttons text-center">
                <div className="side-btn text-center">
                  <Button
                    id='side-btn'
                    onClick={() => setForm('personalInfo')}
                    >
                    <Image height='14' src={contact} /> <span>Personal Information</span>
                  </Button>
                </div>
                <div className="side-btn">
                  <Button
                    id='side-btn'
                    onClick={() => setForm('contactInfo')}
                    >
                    <Image height='14' src={mail} /> <span>Contact Information</span>
                  </Button>
                </div>
                <div className="side-btn">
                  <Button
                    id='side-btn'
                    onClick={() => setForm('employmentInfo')}
                    >
                    <Image height='14' src={Union} /> <span>Employment Information</span>
                  </Button>
                </div>
                <div className="side-btn">
                  <Button
                    id='side-btn'
                    onClick={() => setForm('bankInfo')}
                    >
                    <Image height='14' src={bank} /> <span>Bank Information</span>
                  </Button>
                </div>
                <div className="side-btn">
                  <Button
                    id='side-btn'
                    onClick={() => setForm('refInfo')}
                    >
                    <Image height='14' src={ref} /> <span>Referee Information</span>
                  </Button>
                </div>
              </div>
            </Col>
            <Col className='form-sec' md={8}>
              {
                form === 'personalInfo' ?
                <>
                  <PersonalInformation setPage={setPage} />
                </>:
                form === 'contactInfo' ?
                <>
                  <ContactDetails setPage={setPage} />
                </>:
                form === 'employmentInfo' ?
                <>
                  <EmploymentInformation setPage={setPage} />
                </>:
                form === 'bankInfo' ?
                <>
                  <BankInformation setPage={setPage} />
                </>:
                form === 'refInfo' && 
                <>
                  <RefereeInformation startPayment={startPayment} />
                </>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default CreditApplicationScreen
