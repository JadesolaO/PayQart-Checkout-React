import React, { useState } from 'react';
import CreditForm from './CreditForm';
import { Button } from 'react-bootstrap';
import { successToast, submitPersonalInfo } from '../services/creditFormService';
import '../stylesheets/scss/creditapplicationscreen.scss';

const PersonalInformation = ({ setPage }) => {

  const [personalInfo, setPersonalInfo] = useState({
    title: '',
    gender: '',
    firstname: '',
    lastname: '',
    middlename: '',
    maritalstatus: '',
    educationlevel: '',
    children: '',
    bvn: '',
    dob: ''
  });

  const handleChange = (name, e) => {
    setPersonalInfo({...personalInfo, [name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(personalInfo);
    submitPersonalInfo(personalInfo)
        .then(res => {
            successToast(res.data);
            setPage('contactInfo');
        })
        .catch(() => {})
  }

  return (
    <div>
      <CreditForm 
        formDetails={[
          {
            label: 'Title',
            type: 'select',
            options: ['Select', 'Mr', 'Mrs', 'Dr.', 'Miss'],
            value: personalInfo.title,
            name: 'title',
            handleChange: handleChange
          },
          {
            label: 'First Name',
            type: 'text',
            value: personalInfo.firstname,
            name: 'firstname',
            handleChange: handleChange
          },
          
        ]}
        formDetails2={[
          {
            label: 'Middle Name',
            type: 'text',
            value: personalInfo.middlename,
            name: 'middlename',
            handleChange: handleChange
          },
          {
            label: 'Last Name',
            type: 'text',
            value: personalInfo.lastname,
            name: 'lastname',
            handleChange: handleChange
          }
        ]}
        formDetails3={[
          {
            label: 'Gender',
            type: 'select',
            options: ['Select', 'Female', 'Male'],
            value: personalInfo.gender,
            name: 'gender',
            handleChange: handleChange
          },
          {
            label: 'Marital Status',
            type: 'select',
            options: ['Select', 'Single', 'Married'],
            value: personalInfo.maritalstatus,
            name: 'maritalstatus',
            handleChange: handleChange
          }
        ]}
        formDetails4={[
          {
            label: 'Education Level',
            type: 'select',
            options: ['Select', 'Primary', 'Secondary', 'Tertiary'],
            value: personalInfo.educationlevel,
            name: 'educationlevel',
            handleChange: handleChange
          },
          {
            label: 'Number Of Children/Dependants',
            type: 'number',
            value: personalInfo.children,
            name: 'children',
            handleChange: handleChange
          }
        ]}
        formDetails5={[
          {
            label: 'Bank Verification Number',
            type: 'number',
            value: personalInfo.bvn,
            name: 'bvn',
            handleChange: handleChange
          },
          {
            label: 'Date Of Birth',
            type: 'date',
            value: personalInfo.dob,
            name: 'dob',
            handleChange: handleChange
          }
        ]}
        handleSubmit={handleSubmit}
        buttonText='Continue'
      />
    </div>
  )
}

export default PersonalInformation
