import {UsersType} from '../api/users-api';
import {RequestStatusType} from './app-reducer';

// app-reducer /////
export type SetStatusSetErrorACType = ReturnType<typeof setStatusSetErrorAC>;
export const setStatusSetErrorAC = (
  isLoading: RequestStatusType,
  error: null | string,
) =>
  ({
    type: 'APP/SET_STATUS_SET_ERROR',
    isLoading,
    error,
  } as const);

export type SuccessACType = ReturnType<typeof setSuccessAC>;
export const setSuccessAC = (success: boolean) =>
  ({
    type: 'APP/SET_SUCCESS',
    success,
  } as const);

// person-reducer /////
export type ChosenPersonACType = ReturnType<typeof chosenPersonAC>;
export const chosenPersonAC = (person: UsersType) => {
  return {type: 'PERSON/CHOSEN_PERSON', person};
};

export type SetErrorPersonACType = ReturnType<typeof setErrorPersonAC>;
export const setErrorPersonAC = (
  isLoading: RequestStatusType,
  error: null | string,
) => {
  return {type: 'PERSON/ERROR_PERSON', isLoading, error};
};

// users-reducer /////
export type FetchUsersACType = ReturnType<typeof fetchUsersAC>;
export const fetchUsersAC = (
  users: Array<UsersType>,
  page: number,
  total_pages: number | null,
) => ({type: 'USERS/FETCH_USERS', users, page, total_pages} as const);

export type SetSearchBarValueACType = ReturnType<typeof setSearchBarValueAC>;
export const setSearchBarValueAC = (filterValue: string) =>
  ({type: 'USERS/SET_FILTER', filterValue} as const);

export type SetRefreshingACType = ReturnType<typeof setRefreshingAC>;
export const setRefreshingAC = (isRefreshing: boolean) =>
  ({type: 'USERS/SET_REFRESHING', isRefreshing} as const);

export type SetRefreshingUsersACType = ReturnType<typeof setRefreshingUsersAC>;
export const setRefreshingUsersAC = (users: Array<UsersType>, page: number) =>
  ({type: 'USERS/SET_REFRESHING_USERS', users, page} as const);

export type AddLocalUserACType = ReturnType<typeof addLocalUserAC>;
export const addLocalUserAC = (localUser: UsersType) =>
  ({type: 'USERS/ADD_LOCAL_USER', localUser} as const);

export type setEditedUserACType = ReturnType<typeof setEditedUserAC>;
export const setEditedUserAC = (editedUser: UsersType) =>
  ({type: 'USERS/ADD_EDITED_USER', editedUser} as const);

export type RemoveLocalUserACType = ReturnType<typeof removeLocalUserAC>;
export const removeLocalUserAC = (id: number) =>
  ({type: 'USERS/REMOVE_LOCAL_USER', id} as const);
