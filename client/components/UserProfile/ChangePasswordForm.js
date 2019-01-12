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
        props.handleSubmit(event, props.values, props.changePassword)
      }
    >
      <input type="hidden" value={props.email} onChange={props.handleChange} />
      <div style={{marginBottom: '25px'}}>
        <Field
          name="oldPassword"
          placeholder="Enter current password"
          formFieldProps={{
            label: 'password',
            type: 'password',
            value: props.values.oldPassword,
            onChange: props.handleChange
          }}
          Component={Input}
          renderFormError={() => (
            <FieldError errors={props.formErrors.oldPassword} />
          )}
        />
      </div>
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

      {props.changePasswordError && (
        <FormHelperText className="auth-form-error">
          {props.changePasswordError}
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

const ChangePasswordForm = FormBuilder({
  state: {
    values: {
      email: '',
      oldPassword: '',
      password: '',
      passwordConfirm: ''
    },
    formErrors: {
      email: [],
      oldPassword: [],
      password: [],
      passwordConfirm: []
    }
  },
  validators: {
    oldPassword: [[Validators.isRequired, 'Current password is required']],
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

export default ChangePasswordForm
