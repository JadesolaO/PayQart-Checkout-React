import React, { useState } from 'react';
import CreditForm from './CreditForm';
import { Button } from 'react-bootstrap';
import { successToast, submitReferenceInfo } from '../services/creditFormService';
import '../stylesheets/scss/creditapplicationscreen.scss';

const RefereeInformation = ({ startPayment }) => {

  const [referenceInfo, setReferenceInfo] = useState({
    rname: '',
    rtelephone: '',
    remail: '',
    raddress: '',
    relationship: ''
  });

  const handleChange = (name, e) => {
    setReferenceInfo({...referenceInfo, [name]: e.target.value });
  }

  const handleSubmit = () => {
    console.log(referenceInfo);
    submitReferenceInfo(referenceInfo)
        .then(res => {
            successToast(res.data);
            startPayment();
        })
        .catch(() => {})
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: 'First Name',
            type: 'text',
            value: referenceInfo.rname,
            name: 'rname',
            handleChange: handleChange
          },
          {
            label: 'Last Name',
            type: 'text',
            value: ''
          }
        ]}
        formDetails2={[
          {
            label: 'Email Address',
            type: 'email',
            value: referenceInfo.remail,
            name: 'remail',
            handleChange: handleChange
          },
          {
            label: 'Telephone Number',
            type: 'text',
            value: referenceInfo.rtelephone,
            name: 'rtelephone',
            handleChange: handleChange
          }
        ]}
        formDetails3={[
          {
            label: "Relationship",
            type: 'text',
            value: referenceInfo.relationship,
            name: 'relationship',
            handleChange: handleChange
          },
          {
            label: "Residential Address",
            type: 'text',
            value: referenceInfo.raddress,
            name: 'raddress',
            handleChange: handleChange
          }
        ]}
        formDetails4={[
          {
            label: 'City',
            type: 'text',
            value: ''
          },
          {
            label: 'State',
            type: 'select',
            options: ['Select']
          }
        ]}
      />
      <div className="cont-btn text-center">
        <Button className='pay-btn' onClick={handleSubmit}>
          Pay Verification Fee
        </Button>
      </div>
    </div>
  )
}

export default RefereeInformation
