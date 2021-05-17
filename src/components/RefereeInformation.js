import React from 'react'
import CreditForm from './CreditForm'

const RefereeInformation = () => {
  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: 'First Name',
            type: 'text',
            value: ''
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
            value: ''
          },
          {
            label: 'Telephone Number',
            type: 'text',
            value: ''
          }
        ]}
        formDetails3={[
          {
            label: "Relationship",
            type: 'text',
            value: ''
          },
          {
            label: "Residential Address",
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

export default RefereeInformation
