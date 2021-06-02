import {UsersType} from '../api/users-api';
import {RequestStatusType} from './app-reducer';

//app-reducer
export type SetStatusSetErrorActionType = ReturnType<
  typeof setStatusSetErrorAC
>;
export const setStatusSetErrorAC = (
  isLoading: RequestStatusType,
  error: null | string,
) =>
  ({
    type: 'APP/SET_STATUS_SET_ERROR',
    isLoading,
    error,
  } as const);

export type SuccessActionType = ReturnType<typeof setSuccessAC>;
export const setSuccessAC = (success: boolean) =>
  ({
    type: 'APP/SET_SUCCESS',
    success,
  } as const);

//person-reducer
export type ChosenPersonActionType = ReturnType<typeof chosenPersonAC>;
export const chosenPersonAC = (person: UsersType) => {
  return {type: 'PERSON/CHOSEN_PERSON', person};
};

export type SetErrorPersonActionType = ReturnType<typeof setErrorPersonAC>;
export const setErrorPersonAC = (
  isLoading: RequestStatusType,
  error: null | string,
) => {
  return {type: 'PERSON/ERROR_PERSON', isLoading, error};
};

//users-reducer
export type SetUsersActionType = {
  type: 'USERS/SET_USERS';
  users: Array<UsersType>;
  page: number;
  total_pages: number | null;
};
export const setUsersAC = (
  users: Array<UsersType>,
  page: number,
  total_pages: number | null,
): SetUsersActionType => {
  return {type: 'USERS/SET_USERS', users, page, total_pages};
};

export type SetFilterActionType = {
  type: 'USERS/SET_FILTER';
  filterValue: string;
};
export const setFilterAC = (filterValue: string): SetFilterActionType => {
  return {type: 'USERS/SET_FILTER', filterValue};
};

export type SetRefreshingActionType = {
  type: 'USERS/SET_REFRESHING';
  isRefreshing: boolean;
};
export const setRefreshingAC = (
  isRefreshing: boolean,
): SetRefreshingActionType => {
  return {type: 'USERS/SET_REFRESHING', isRefreshing};
};

export type SetRefreshingUsersActionType = {
  type: 'USERS/SET_REFRESHING_USERS';
  users: Array<UsersType>;
  page: number;
};
export const setRefreshingUsersAC = (
  users: Array<UsersType>,
  page: number,
): SetRefreshingUsersActionType => {
  return {type: 'USERS/SET_REFRESHING_USERS', users, page};
};

export type AddNewUserActionType = {
  type: 'USERS/ADD_NEW_USER';
  newUser: UsersType;
};
export const addNewUserAC = (newUser: UsersType): AddNewUserActionType => {
  return {type: 'USERS/ADD_NEW_USER', newUser};
};

export type AddEditedUserActionType = {
  type: 'USERS/ADD_EDITED_USER';
  editedUser: UsersType;
};
export const addEditedUserAC = (
  editedUser: UsersType,
): AddEditedUserActionType => {
  return {type: 'USERS/ADD_EDITED_USER', editedUser};
};

export type RemoveNewUserActionType = {
  type: 'USERS/REMOVE_NEW_USER';
  id: number;
};
export const removeNewUserAC = (id: number): RemoveNewUserActionType => {
  return {type: 'USERS/REMOVE_NEW_USER', id};
};
