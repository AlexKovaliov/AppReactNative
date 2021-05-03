import {RequestStatusType} from './app-reducer';
import {UsersType} from '../api/users-api';
import { NewUserType } from "../components/screens/UsersScreen";

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

//person-reducer
export type ChosenPersonActionType = ReturnType<typeof chosenPersonAC>;
export const chosenPersonAC = (person: UsersType) => {
  return {type: 'PERSON/CHOSEN_PERSON', person};
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
) => {
  return {type: 'USERS/SET_USERS', users, page, total_pages};
};
export type SetFilterActionType = {
  type: 'USERS/SET_FILTER';
  payload: {term: string};
};
export const setFilterAC = (term: string) => {
  return {type: 'USERS/SET_FILTER', payload: {term}};
};
export type SetRefreshingActionType = {
  type: 'USERS/SET_REFRESHING';
  isRefreshing: boolean;
};
export const setRefreshingAC = (isRefreshing: boolean) => {
  return {type: 'USERS/SET_REFRESHING', isRefreshing};
};
export type AddNewUserActionType = {
  type: 'USERS/ADD_NEW_USER';
  newUser: UsersType;
};
export const addNewUserAC = (newUser: UsersType) => {
  return {type: 'USERS/ADD_NEW_USER', newUser};
};
/*export type SetPageActionType = {
  type: 'USERS/SET_PAGE';
  page: number;
};
export const setPageAC = (page: number) => {
  return {type: 'USERS/SET_PAGE', page};
};*/
