import React from 'react'
import CreditForm from './CreditForm'

const EmploymentInformation = () => {
  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: 'Employment Type',
            type: 'select',
            options: ['Select', 'Full time', 'Part time']
          },
          {
            label: 'Years Of Employment',
            type: 'number',
            value: ''
          }
        ]}
        formDetails2={[
          {
            label: 'Designation',
            type: 'text',
            value: ''
          },
          {
            label: 'Employment Mode',
            type: 'select',
            options: ['Select']
          }
        ]}
        formDetails3={[
          {
            label: "Employer's Name",
            type: 'text',
            value: ''
          },
          {
            label: "Employer's Address",
            type: 'text',
            value: ''
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
    </div>
  )
}

export default EmploymentInformation
