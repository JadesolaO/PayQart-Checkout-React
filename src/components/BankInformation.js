import React, { useState } from 'react';
import CreditForm from './CreditForm';
import { Button } from 'react-bootstrap';
import { successToast, submitBankInfo } from '../services/creditFormService';
import '../stylesheets/scss/creditapplicationscreen.scss';

const BankInformation = ({ setPage }) => {

  const [bankInfo, setBankInfo] = useState({
    incomebanktype: '',
    incomeaccounttype: '',
    bankname: '',
    accountnumber: ''
  });

  const handleChange = (name, e) => {
    setBankInfo({...bankInfo, [name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bankInfo);
    submitBankInfo(bankInfo)
        .then(res => {
            successToast(res.data);
            setPage('refInfo');
        })
        .catch(() => {})
  }

  return (
    <div>
      <CreditForm 
        formDetails={[
          {
            label: 'Income Account Type',
            type: 'select',
            options: ['Select', 'Savings', 'Current'],
            value: bankInfo.incomeaccounttype,
            name: 'incomeaccounttype',
            handleChange: handleChange
          },
          {
            label: 'Income Bank Type',
            type: 'select',
            options: ['Select', 'Commercial Bank', 'Microfinance Bank'],
            value: bankInfo.incomebanktype,
            name: 'incomebanktype',
            handleChange: handleChange
          }
        ]}
        formDetails2={[
          {
            label: 'Bank Name',
            type: 'text',
            value: bankInfo.bankname,
            name: 'bankname',
            handleChange: handleChange
          },
          {
            label: 'Account Number',
            type: 'text',
            value: bankInfo.accountnumber,
            name: 'accountnumber',
            handleChange: handleChange
          }
        ]}
        handleSubmit={handleSubmit}
        buttonText='Continue'
      />
      {/* <div className="cont-btn text-center">
        <Button onClick={handleSubmit}>
          Continue
        </Button>
      </div>  */}
    </div> 
  )
}

export default BankInformation
