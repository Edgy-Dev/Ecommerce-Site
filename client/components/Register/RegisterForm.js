import React from 'react'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import {withStyles} from '@material-ui/core/styles'

import {FormBuilder, Field, FieldError, Validators} from '../shared/Forms'
import styles from './styles'

const Form = props => {
  const {classes} = props

  return (
    <form
      className="auth-form"
      onSubmit={event =>
        props.handleSubmit(event, props.values, props.register)
      }
    >
      <Field
        name="firstName"
        placeholder="Enter first name"
        formFieldProps={{
          label: 'firstName',
          value: props.values.firstName,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => (
          <FieldError errors={props.formErrors.firstName} />
        )}
      />
      <Field
        name="lastName"
        placeholder="Enter last name"
        formFieldProps={{
          label: 'lastName',
          value: props.values.lastName,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => (
          <FieldError errors={props.formErrors.lastName} />
        )}
      />
      <Field
        name="email"
        placeholder="Enter email"
        formFieldProps={{
          label: 'email',
          value: props.values.email,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => <FieldError errors={props.formErrors.email} />}
      />

      <Field
        name="password"
        placeholder="Enter password"
        formFieldProps={{
          label: 'password',
          type: 'password',
          value: props.values.password,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => (
          <FieldError errors={props.formErrors.password} />
        )}
      />

      <Field
        name="passwordConfirm"
        placeholder="Confirm password"
        formFieldProps={{
          label: 'passwordConfirm',
          type: 'password',
          value: props.values.passwordConfirm,
          onChange: props.handleChange
        }}
        Component={Input}
        renderFormError={() => (
          <FieldError errors={props.formErrors.passwordConfirm} />
        )}
      />

      {props.registerError && (
        <FormHelperText className="auth-form-error">
          {props.registerError}
        </FormHelperText>
      )}

      <Button
        variant="contained"
        color="primary"
        label="Submit"
        type="submit"
        className="auth-submit-button"
      >
        Create an account
      </Button>
    </form>
  )
}

const RegisterForm = FormBuilder({
  state: {
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    formErrors: {
      firstName: [],
      lastName: [],
      email: [],
      password: [],
      passwordConfirm: []
    }
  },
  validators: {
    firstName: [[Validators.isRequired, 'Email is required.']],
    lastName: [[Validators.isRequired, 'Email is required.']],
    email: [
      [Validators.isRequired, 'Email is required.'],
      [Validators.isEmail, 'Email is invalid.']
    ],
    password: [
      [Validators.isRequired, 'Password is required.'],
      [Validators.isMinLength(6), 'Password must be atleast 6 character'],
      [
        Validators.isMaxLength(20),
        'Password cannot be longer than 20 characters.'
      ]
    ],
    passwordConfirm: [
      [Validators.isRequired, 'Password confirmation is required.']
    ]
  }
})(Form)

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RegisterForm)
