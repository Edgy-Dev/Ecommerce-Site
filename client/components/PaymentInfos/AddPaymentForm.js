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
        props.handleSubmit(event, props.values, props.addPayment)
      }
    >
      <Field
        name="creditCard"
        placeholder="Enter credit card"
        formFieldProps={{
          label: 'creditCard',
          value: props.values.creditCard,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => (
          <FieldError errors={props.formErrors.creditCard} />
        )}
      />

      {props.addPaymentError && (
        <FormHelperText className="auth-form-error">
          {props.addPaymentError}
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

const AddPaymentForm = FormBuilder({
  state: {
    values: {
      creditCard: ''
    },
    formErrors: {
      creditCard: []
    }
  },
  validators: {
    creditCard: [
      [Validators.isRequired, 'Credit Card is required.'],
      [Validators.followsRegex(/^\d+$/), 'Credit card is invalid']
    ]
  }
})(Form)

export default AddPaymentForm
