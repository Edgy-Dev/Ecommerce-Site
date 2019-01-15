import React from 'react'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'

import {FormBuilder, Field, FieldError, Validators} from '../shared/Forms'

const Form = props => {
  return (
    <form
      className="auth-form"
      onSubmit={event =>
        props.handleSubmit(event, props.values, props.addAddress)
      }
    >
      <Field
        name="streetAddress"
        placeholder="Enter street address"
        formFieldProps={{
          label: 'streetAddress',
          value: props.values.streetAddress,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => (
          <FieldError errors={props.formErrors.streetAddress} />
        )}
      />
      <Field
        name="city"
        placeholder="Enter city"
        formFieldProps={{
          label: 'city',
          value: props.values.city,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => <FieldError errors={props.formErrors.city} />}
      />
      <Field
        name="state"
        placeholder="Enter state"
        formFieldProps={{
          label: 'state',
          value: props.values.state,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => <FieldError errors={props.formErrors.state} />}
      />
      <Field
        name="zipCode"
        placeholder="Enter zip code"
        formFieldProps={{
          label: 'zipCode',
          value: props.values.zipCode,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => <FieldError errors={props.formErrors.zipCode} />}
      />

      {props.addAddressError && (
        <FormHelperText className="auth-form-error">
          {props.addAddressError}
        </FormHelperText>
      )}

      <Button
        variant="contained"
        color="primary"
        label="Submit"
        type="submit"
        className="auth-submit-button"
      >
        Submit
      </Button>
    </form>
  )
}

const AddShippingForm = FormBuilder({
  state: {
    values: {
      streetAddress: '',
      city: '',
      state: '',
      zipCode: ''
    },
    formErrors: {
      streetAddress: [],
      city: [],
      state: [],
      zipCode: []
    }
  },
  validators: {
    streetAddress: [
      [Validators.isRequired, 'Street Address is required.'],
      [
        Validators.followsRegex(/(^|\b\s+)\d+\s+/),
        'Street address must start with house number'
      ]
    ],
    city: [[Validators.isRequired, 'City is required.']],
    state: [
      [Validators.isRequired, 'State is required.'],
      [Validators.isLength(2), 'State must be valid abbreviation']
    ],
    zipCode: [
      [Validators.isRequired, 'Zipcode is required.'],
      [
        Validators.followsRegex(/(^\d{5}$)|(^\d{5}-\d{4}$)/),
        'Zip code is invalid'
      ]
    ]
  }
})(Form)

export default AddShippingForm
