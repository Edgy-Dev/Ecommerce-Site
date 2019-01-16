import React from 'react'
import {compose} from 'redux'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'

import {FormBuilder, Field, FieldError, Validators} from '../shared/Forms'
import {injectStripe, CardElement} from 'react-stripe-elements'

const Form = props => {
  const addPayment = async () => {
    const {token} = await props.stripe.createToken()
    props.displayPayment(token)
  }
  return (
    <form
      className="auth-form"
      onSubmit={event => props.handleSubmit(event, props.values, addPayment)}
    >
      <Field
        name="name"
        placeholder="Enter name on card"
        formFieldProps={{
          label: 'name',
          value: props.values.name,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => <FieldError errors={props.formErrors.name} />}
      />

      <CardElement />

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

const withFormBuilder = FormBuilder({
  state: {
    values: {
      name: ''
    },
    formErrors: {
      name: []
    }
  },
  validators: {
    name: [[Validators.isRequired, 'First name is required.']]
  }
})
export default compose(withFormBuilder, injectStripe)(Form)
