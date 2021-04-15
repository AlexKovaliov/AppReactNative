import {RequestStatusType} from './app-reducer';
import {UsersType} from '../api/users-api';

//app-reducer
export type SetStatusSetErrorActionType = ReturnType<
  typeof setStatusSetErrorAC
>;
export const setStatusSetErrorAC = (
  isLoading: RequestStatusType,
  error: null | string,
) =>
  ({
    type: 'APP/SET-STATUS-SET-ERROR',
    isLoading,
    error,
  } as const);

//person-reducer
export type ChosenPersonActionType = {
  type: 'CHOSEN-PERSON';
  person: UsersType;
};
export const chosenPersonAC = (person: UsersType): ChosenPersonActionType => {
  return {type: 'CHOSEN-PERSON', person};
};

//users-reducer
export type GetUsersActionType = {
  type: 'GET-USERS';
  users: Array<UsersType>;
};
export const getUsersAC = (users: Array<UsersType>): GetUsersActionType => {
  return {type: 'GET-USERS', users};
};
