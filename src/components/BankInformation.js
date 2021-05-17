import React from 'react'
import CreditForm from './CreditForm'

const BankInformation = () => {
  return (
    <div>
      <CreditForm 
      formDetails={[
        {
          label: 'Income Account Type',
          type: 'select',
          options: ['Select', 'Savings', 'Current']
        },
        {
          label: 'Income Bank Type',
          type: 'select',
          options: ['Select']
        }
      ]}
      formDetails2={[
        {
          label: 'Bank Name',
          type: 'text',
          value: ''
        },
        {
          label: 'Account Number',
          type: 'text',
          value: ''
        }
      ]}
      />
    </div>
  )
}

export default BankInformation
