import React from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import '../stylesheets/scss/creditapplicationscreen.scss'

const CreditForm = (props) => {

  const formFunction = (props) => {
    return (
      <>
        {props.map(({ label, type, options, }) => (
          <Form.Group key={label} className='frm-grp mb-3' as={Col}>
            <Form.Label className='frm-lbl'>{label}</Form.Label>
            {type === 'select' ?
              <Form.Control className='frm-ctrl slt' as='select'>
                {options.map((option, ind) => (
                  <option key={ind} value={option}>{option}</option>
                ))}
              </Form.Control> :
              <Form.Control
                className='frm-ctrl'
                type={type}
                value={props.value}
              />
            }
          </Form.Group>
        ))}
      </>
    )
  }

  return (
    <Container fluid>
      <Form className='crdfrm'>
        {props.formDetails &&
          <Row className='justify-content-md-center'>
            {formFunction(props.formDetails)}
          </Row>}
        {props.formDetails2 &&
          <Row className='justify-content-md-center'>
            {formFunction(props.formDetails2)}
          </Row>}
        {props.formDetails3 &&
          <Row className='justify-content-md-center'>
            {formFunction(props.formDetails3)}
          </Row>}
        {props.formDetails4 &&
          <Row className='justify-content-md-center'>
            {formFunction(props.formDetails4)}
          </Row>}
      </Form>
    </Container>
  )
}

export default CreditForm
