import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
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
    },
    validate:
      typeof getValues === 'function' ? (value) => value === getValues('password') || 'Password don`t match' : undefined
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .min(5, 'Min length invalid need 5 letters')
    .max(160, 'Max length invalid need 160 letters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Min length invalid need 6 letters')
    .max(160, 'Max length invalid need 160 letters'),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .min(6, 'Min length invalid need 6 letters')
    .max(160, 'Max length invalid need 160 letters')
    .oneOf([yup.ref('password')], 'Password don`t match')
})

export type Schema = yup.InferType<typeof schema>
