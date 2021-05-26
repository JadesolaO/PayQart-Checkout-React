import React, { useState, useEffect } from 'react';
import CreditForm from './CreditForm';
import { Button } from 'react-bootstrap';
import { successToast, submitBankInfo, getLoanDetails } from '../services/creditFormService';
import '../stylesheets/scss/creditapplicationscreen.scss';

const BankInformation = ({ setPage, setBankdone }) => {

  const [bankInfo, setBankInfo] = useState({
    incomebanktype: '',
    incomeaccounttype: '',
    bankname: '',
    accountnumber: ''
  });

  useEffect(() => {
    retrieveLoanDetails();
  }, []);

  const handleChange = (name, e) => {
    setBankInfo({...bankInfo, [name]: e.target.value });
  }

  const retrieveLoanDetails = async () => {
    const user = JSON.parse(localStorage.getItem('userObjFromBckEnd'));
    if (!user || user.newUser)
      return;

    await getLoanDetails()
      .then(res => {
        if (!res.data)
          return;
        const loanInfo = (({ incomebanktype, incomeaccounttype, bankname, accountnumber }) =>
              ({ incomebanktype, incomeaccounttype, bankname, accountnumber }))(res.data);
        setBankInfo(loanInfo);
      })
      .catch(() => {});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bankInfo);
    submitBankInfo(bankInfo)
        .then(res => {
            successToast(res.data);
            setPage('refInfo');
            setBankdone(true)
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
    </div> 
  )
}

export default BankInformation
