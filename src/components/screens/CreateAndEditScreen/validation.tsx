import * as yup from 'yup';

export const validation = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Please enter your name'),
  last_name: yup
    .string()
    .trim()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Please enter your last name'),
  email: yup
    .string()
    .trim()
    .email('Invalid email')
    .required('Please enter your email'),
});
