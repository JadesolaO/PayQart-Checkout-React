import React, { useState } from 'react';
import CreditForm from './CreditForm';
import { Button } from 'react-bootstrap';
import { successToast, submitEmploymentInfo } from '../services/creditFormService';
import '../stylesheets/scss/creditapplicationscreen.scss';

const EmploymentInformation = ({ setPage }) => {

  const [employmentInfo, setEmploymentInfo] = useState({
    employername: '',
    employeraddress: '',
    workduration: '',
    employmenttype: '',
    designation: '',
    employmentmode: '',
    city: '',
    state: ''
  });

  const handleChange = (name, e) => {
    setEmploymentInfo({...employmentInfo, [name]: e.target.value });
  }

  const handleSubmit = () => {
    console.log(employmentInfo);
    submitEmploymentInfo(employmentInfo)
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
              label: 'Employment Type',
              type: 'select',
              options: ['Select', 'Full time', 'Part time'],
              value: employmentInfo.employmenttype,
              name: 'employmenttype',
              handleChange: handleChange
            },
            {
              label: 'Years Of Employment',
              type: 'text',
              value: employmentInfo.workduration,
              name: 'workduration',
              handleChange: handleChange
            }
          ]}
          formDetails2={[
            {
              label: 'Designation',
              type: 'text',
              value: employmentInfo.designation,
              name: 'designation',
              handleChange: handleChange
            },
            {
              label: 'Employment Mode',
              type: 'select',
              options: ['Select', 'Contract', 'Full Staff'],
              value: employmentInfo.employmentmode,
              name: 'employmentmode',
              handleChange: handleChange
            }
          ]}
          formDetails3={[
            {
              label: "Employer's Name",
              type: 'text',
              value: employmentInfo.employername,
              name: 'employername',
              handleChange: handleChange
            },
            {
              label: "Employer's Address",
              type: 'text',
              value: employmentInfo.employeraddress,
              name: 'employeraddress',
              handleChange: handleChange
            }
          ]}
          formDetails4={[
            {
              label: 'City',
              type: 'text',
              value: employmentInfo.city,
              name: 'city',
              handleChange: handleChange
            },
            {
              label: 'State',
              type: 'select',
              options: ['Select', 'Lagos', 'Abuja', 'Ondo', 'Ogun', 'Rivers'],
              value: employmentInfo.state,
              name: 'state',
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

export default EmploymentInformation
