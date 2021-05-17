import React from 'react'
import CreditForm from './CreditForm'

const PersonalInformation = () => {
  return (
    <div>
      <CreditForm 
      formDetails={[
        {
          label: 'Title',
          type: 'select',
          options: ['Select', 'Mr', 'Mrs', 'Dr.', 'Miss'],
        },
        {
          label: 'First Name',
          type: 'text',
          value: ''
        },
        
      ]}
      formDetails2={[
        {
          label: 'Middle Name',
          type: 'text',
          value: ''
        },
        {
          label: 'Last Name',
          type: 'text',
          value: ''
        }
      ]}
      formDetails3={[
        {
          label: 'Gender',
          type: 'select',
          options: ['Select', 'Female', 'Male'],
        },
        {
          label: 'Marital Status',
          type: 'select',
          options: ['Select', 'Single', 'Married'],
        }
      ]}
      formDetails4={[
        {
          label: 'Education Level',
          type: 'select',
          options: ['Select', 'Primary', 'Secondary', 'Tetiary']
        },
        {
          label: 'Number Of Children/Dependants',
          type: 'number',
          value: ''
        }
      ]}
      />
    </div>
  )
}

export default PersonalInformation
