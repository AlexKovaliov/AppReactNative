import * as yup from 'yup';
import {UsersType} from '../../../../api/users-api';

export type GroupType = {
  id: number;
  title: string;
  avatarGroup: string;
  members: Array<UsersType>;
};

export const validationGroup = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(2, 'Too Short! Min: 2 symbols')
    .max(20, 'Too Long! Max: 20 symbols')
    .required('Please enter name of group'),
});
