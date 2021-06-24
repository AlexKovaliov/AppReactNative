import {
  fetchUsersAC,
  addLocalUserAC,
  setEditedUserAC,
  SetEditedUserACType,
  setRefreshingUsersAC,
  SetRefreshingUsersACType,
} from '../actions/users-actions';
import {
  setSuccessAC,
  SuccessACType,
  setRefreshingAC,
  setStatusSetErrorAC,
  SetStatusSetErrorACType,
  SetRefreshingACType,
} from '../actions/app-actions';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../../store';
import {usersAPI, UsersType} from '../../api/users-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Refresh users
export const onRefreshTC = () => async (
  dispatch: ThunkDispatch<AppRootStateType, {}, dispatchActionType>,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  dispatch(setRefreshingAC(true));
  try {
    dispatch(setRefreshingUsersAC([], 1));
    await dispatch(getAllUsers());
    dispatch(setRefreshingAC(false));
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
    dispatch(setRefreshingAC(false));
  }
};

//Users request
export const fetchUsersTC = () => async (
  dispatch: Dispatch,
  getState: () => AppRootStateType,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  const totalPage = getState().usersStore.total_pages;
  const page = getState().usersStore.page;
  if (totalPage && page > totalPage) {
    dispatch(setStatusSetErrorAC(false, null));
    return;
  }
  try {
    const response = await usersAPI.getUsers(page);
    if (response.data) {
      dispatch(
        fetchUsersAC(response.data.data, page + 1, response.data.total_pages),
      );
      dispatch(setStatusSetErrorAC(false, null));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Adding an edited user
export const setEditedUserTC = (
  values: UsersType,
  resetForm: () => void,
  navigate: (link: string) => void,
) => async (
  dispatch: ThunkDispatch<
    AppRootStateType,
    {},
    SetStatusSetErrorACType | SetEditedUserACType | SuccessACType
  >,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    dispatch(setEditedUserAC(values));
    await dispatch(setEditedLocalUserTC(values));
    resetForm();
    navigate('Home');
    dispatch(setSuccessAC(true));
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Getting users from the server and AsyncStorage
export const getAllUsers = () => async (
  dispatch: ThunkDispatch<AppRootStateType, {}, SetStatusSetErrorACType>,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    await dispatch(fetchUsersTC());
    await dispatch(getLocalUsersTC());
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

// local (AsyncStorage)////

//Adding a local user
export const setLocalUserTC = (
  localUser: UsersType,
  resetForm: () => void,
  navigate: (link: string) => void,
) => async (dispatch: Dispatch) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    const ArrayOldUsers = await AsyncStorage.getItem('users');
    const parsedUsers = ArrayOldUsers ? JSON.parse(ArrayOldUsers) : [];
    const jsonValue = JSON.stringify([localUser, ...parsedUsers]);
    await AsyncStorage.setItem('users', jsonValue);
    dispatch(addLocalUserAC(localUser));
    dispatch(setStatusSetErrorAC(false, null));
    if (localUser) {
      dispatch(setSuccessAC(true));
      resetForm();
      navigate('Home');
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Add edited local user
export const setEditedLocalUserTC = (editedUser: UsersType) => async (
  dispatch: Dispatch,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    const arrayLocalUsers = await AsyncStorage.getItem('users');

    const users: Array<UsersType> = arrayLocalUsers
      ? JSON.parse(arrayLocalUsers)
      : [];

    const editedLocalUser = users.map(user =>
      user.id === editedUser.id ? editedUser : user,
    );

    await AsyncStorage.setItem('users', JSON.stringify(editedLocalUser));
    dispatch(setStatusSetErrorAC(false, null));
    dispatch(setSuccessAC(true));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Removing a local user
export const removeLocalUsersTC = (id: number) => async (
  dispatch: Dispatch,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    const arrayLocalUsers = await AsyncStorage.getItem('users');

    const users: Array<UsersType> = arrayLocalUsers
      ? JSON.parse(arrayLocalUsers)
      : [];

    const filteredUser = users.filter(user => user.id !== id);

    await AsyncStorage.setItem('users', JSON.stringify(filteredUser));

    dispatch(setStatusSetErrorAC(false, null));
    dispatch(setSuccessAC(true));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Getting local users
export const getLocalUsersTC = () => async (
  dispatch: Dispatch,
  getState: () => AppRootStateType,
) => {
  try {
    const storeUsers = getState().usersStore.users;
    const localUsers = storeUsers.filter(user => user.local);

    const jsonValueLocalUser = await AsyncStorage.getItem('users');

    const newLocalUsers: Array<UsersType> = jsonValueLocalUser
      ? JSON.parse(jsonValueLocalUser)
      : [];

    const usersId: number[] = localUsers.map(user => +user.id);

    newLocalUsers.forEach((el: UsersType) => {
      if (!usersId.includes(+el.id)) {
        dispatch(addLocalUserAC(el));
      }
    });
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Thunk types
type dispatchActionType =
  | SetRefreshingACType
  | SetStatusSetErrorACType
  | SetRefreshingUsersACType;
