import React, { useState, useEffect } from 'react';
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
    children: ''
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userObjFromBckEnd'));
    if (!user || user.newUser)
      return;
    const userInfo = (({ title, gender, firstname, lastname, middlename, maritalstatus, educationlevel, children }) =>
          ({ title, gender, firstname, lastname, middlename, maritalstatus, educationlevel, children }))(user);
    setPersonalInfo(userInfo);
  }

  const handleChange = (name, e) => {
    setPersonalInfo({...personalInfo, [name]: e.target.value });
  }

  const handleSubmit = () => {
    console.log(personalInfo);
    submitPersonalInfo(personalInfo)
        .then(res => {
            successToast(res.data);
            const user = JSON.parse(localStorage.getItem('userObjFromBckEnd'));
            const updatedUserInfo = { ...user, ...personalInfo };
            localStorage.setItem('userObjFromBckEnd', JSON.stringify(updatedUserInfo));
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
            options: ['Select', 'Primary', 'Secondary', 'Tetiary'],
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
      />
      <div className="cont-btn text-center">
        <Button onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </div>
  )
}

export default PersonalInformation
