import * as yup from 'yup';

export const emailSchema = yup.string().email('Must be a valid email').max(255).required('Email is required');

export const passwordSchema = yup.string().required('Please enter a password')
  .min(8)
  .matches(/\d+/, 'Must contain at least one number');
