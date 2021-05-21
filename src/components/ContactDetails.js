import React, { useState } from 'react';
import CreditForm from './CreditForm';
import { Button } from 'react-bootstrap';
import { successToast, submitContactInfo } from '../services/creditFormService';
import '../stylesheets/scss/creditapplicationscreen.scss';

const ContactDetails = ({ setPage }) => {

  const [contactInfo, setContactInfo] = useState({
    email: '',
    address: '',
    residentialtype: '',
    livingduration: '',
    telephone: '',
    city: '',
    state: ''
  }); 

  const handleChange = (name, e) => {
    setContactInfo({...contactInfo, [name]: e.target.value });
  }

  const handleSubmit = () => {
    console.log(contactInfo);
    submitContactInfo(contactInfo)
        .then(res => {
            successToast(res.data);
            setPage('employmentInfo');
        })
        .catch(() => {})
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: 'Telephone Number',
            type: 'text',
            value: contactInfo.telephone,
            name: 'telephone',
            handleChange: handleChange
          },
          {
            label: 'Email Address',
            type: 'email',
            value: contactInfo.email,
            name: 'email',
            handleChange: handleChange
          }
        ]} 
        formDetails2={[
          {
            label: 'Home Address',
            type: 'text',
            value: contactInfo.address,
            name: 'address',
            handleChange: handleChange,
            className: 'single-frm'
          }
        ]}
        formDetails3={[
          {
            label: 'City',
            type: 'text',
            value: contactInfo.city,
            name: 'city',
            handleChange: handleChange
          },
          {
            label: 'State',
            type: 'select',
            options: ['Select', 'Lagos', 'Abuja', 'Ondo', 'Ogun', 'Rivers'],
            value: contactInfo.state,
            name: 'state',
            handleChange: handleChange
          }
        ]}
        formDetails4={[
          {
            label: 'Residence Type',
            type: 'select',
            options: ['Select', 'Temporary', 'Permanent'],
            value: contactInfo.residentialtype,
            name: 'residentialtype',
            handleChange: handleChange
          },
          {
            label: 'Years Of Residence',
            type: 'text',
            value: contactInfo.livingduration,
            name: 'livingduration',
            handleChange: handleChange
          }
        ]}
      />
      <div className="cont-btn text-center">
        <Button onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </div>
  )
}

export default ContactDetails
