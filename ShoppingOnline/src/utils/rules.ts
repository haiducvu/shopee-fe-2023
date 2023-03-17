import { RegisterOptions } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const rules: Rules = {
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email is invalid'
    },
    maxLength: {
      value: 160,
      message: 'Max length invalid need 160 letters'
    },
    minLength: {
      value: 5,
      message: 'Min length invalid need 5 letters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Max length invalid need 160 letters'
    },
    minLength: {
      value: 6,
      message: 'Min length invalid need 6 letters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Max length invalid need 160 letters'
    },
    minLength: {
      value: 6,
      message: 'Min length invalid need 6 letters'
    }
  }
}
