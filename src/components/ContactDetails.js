import React from 'react'
import CreditForm from './CreditForm'

const ContactDetails = () => {
  return (
    <div>
      <CreditForm
      formDetails={[
        {
          label: 'Telephone Number',
          type: 'text',
          value: ''
        },
        {
          label: 'Email Address',
          type: 'email',
          value: ''
        }
      ]} 
      formDetails2={[
        {
          label: 'Home Address',
          type: 'text',
          value: '',
          className: 'single-frm'
        }
      ]}
      formDetails3={[
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
      formDetails4={[
        {
          label: 'Residence Type',
          type: 'select',
          options: ['Select', 'Flat']
        },
        {
          label: 'Years Of Residence',
          type: 'number',
          value: ''
        }
      ]}
      />
    </div>
  )
}

export default ContactDetails
