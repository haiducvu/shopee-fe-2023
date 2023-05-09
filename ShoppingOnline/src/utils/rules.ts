import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
import { AnyObject } from 'yup/lib/types'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

function testPriceMinMax(this: yup.TestContext<AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  // console.log(price_min !== '' || price_max !== '')
  return price_min !== '' || price_max !== ''
}

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
    .oneOf([yup.ref('password')], 'Password don`t match'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export type Schema = yup.InferType<typeof schema>
