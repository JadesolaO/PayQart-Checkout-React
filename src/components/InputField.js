import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import Calendar from 'react-calendar'
import '../stylesheets/scss/inputfield.scss'
import 'react-calendar/dist/Calendar.css'


const InputField = (props) => {
  // const []
  console.log(props.value2)
  return (
    <>
      <Form.Group className='mb-2'>
        <Form.Label className='mb-2'><span className='formlabel'>{props.label1}</span></Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">
              <span className='inputicon'>₦</span>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="number"
            className="formcontrol"
          // value={ }
          // onChange={ }
          />
        </InputGroup>
      </Form.Group>

      {props.employmentType === 'Paid employment' ?
        <Form.Group className='mb-2'>
          <Form.Label className='mb-2'><span className='formlabel'>When is your next salary date?</span></Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text
                style={{ backgroundColor: "#707070", border: 'none' }}
                id="inputGroupPrepend"
              >
                <span className='inputicon' style={{ color: "white" }}><i className="fas fa-calendar-alt"></i></span>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              className="formcontrol"
              type="text"
              placeholder="Select pay date"
              id='inpot'
              onFocus={() => props.setShow(true)}
              style={{ padding: "2px !important" }}
              // value={props.value2}
            />
          </InputGroup>
          {props.show &&
            <Form.Group className="calendar">
              <Calendar
                className='calendar'
                minDate={new Date()}
                value={props.value2}
                onChange={props.setValue2}
                // onBlur={() => props.setShow(false)}
                next2Label={null}
                prev2Label={null}
              />
            </Form.Group>
          }

        </Form.Group> :
        <Form.Group className='mb-2'>
          <Form.Label className='mb-2'><span className='formlabel'>{props.label2}</span></Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">
                <span className='inputicon'>₦</span>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              className="formcontrol"
            // value={ }
            // onChange={ }
            />
          </InputGroup>
        </Form.Group>
      }

      <div className="loan-buttons">
        <span className='formlabel'>Do you have any existing loan(s)?</span>
        <Button
          variant="outline-secondary"
          className='loan-btn'
          onClick={() => props.setExistingLoan(true)}
        >
          Yes
        </Button>

        <Button
          variant="outline-secondary"
          className='loan-btn'
          onClick={() => props.setExistingLoan(false)}
        >
          No
        </Button>
      </div>

      {props.existingLoan &&
        <Form.Group>
          <Form.Label className='mb-2'><span className='formlabel'>Current payback on loans:</span></Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">
                <span className='inputicon'>₦</span>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              className="formcontrol"
            // value={ }
            // onChange={ }
            />
          </InputGroup>
        </Form.Group>}
    </>
  )
}

export default InputField
