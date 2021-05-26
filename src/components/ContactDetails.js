import React, { useState, useEffect } from 'react';
import CreditForm from './CreditForm';
import { Button } from 'react-bootstrap';
import { successToast, submitContactInfo } from '../services/creditFormService';
import '../stylesheets/scss/creditapplicationscreen.scss';

const ContactDetails = ({ setPage, setContactdone }) => {

  const [contactInfo, setContactInfo] = useState({
    email: '',
    address: '',
    residentialtype: '',
    livingduration: '',
    telephone: '',
    city: '',
    state: ''
  }); 
  const [readOnly, setReadOnly] = useState(false);

  const handleChange = (name, e) => {
    setContactInfo({...contactInfo, [name]: e.target.value });
  }

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userObjFromBckEnd'));
    if (!user || user.newUser)
      return;
    const userInfo = (({ email, address, residentialtype, livingduration, telephone, city, state }) =>
          ({ email, address, residentialtype, livingduration, telephone, city, state }))(user);
    setContactInfo(userInfo);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactInfo);
    submitContactInfo(contactInfo)
        .then(res => {
            localStorage.setItem('userEmail', contactInfo.email);
            successToast(res.data);
            setPage('employmentInfo');
            setContactdone(true)
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
            readOnly: {readOnly},
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
        handleSubmit={handleSubmit}
        buttonText='Continue'
      />
    </div>
  )
}

export default ContactDetails
