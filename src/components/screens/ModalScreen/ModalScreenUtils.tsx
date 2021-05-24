import * as yup from 'yup';
import {showMessage} from 'react-native-flash-message';

export const SuccessMessage = () => {
  showMessage({
    type: 'success',
    message: 'Success',
    description: 'The user has been created',
  });
};

export const validation = yup.object().shape({
  first_name: yup
    .string()
    .max(20, 'Too Long!')
    .required('Please enter your name'),
  last_name: yup
    .string()
    .max(20, 'Too Long!')
    .required('Please enter your last name'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Please enter your email'),
});
