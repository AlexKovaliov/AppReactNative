import {Dispatch} from 'redux';
import {
  setUsersAC,
  addNewUserAC,
  chosenPersonAC,
  setRefreshingAC,
  setErrorPersonAC,
  setStatusSetErrorAC,
  SetRefreshingActionType,
  SetErrorPersonActionType,
  SetStatusSetErrorActionType,
  setSuccessAC,
  setRefreshingUsersAC,
  SetRefreshingUsersActionType,
} from './actions';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../store';
import {usersAPI, UsersType} from '../api/users-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const chosenPersonTC = (id: number) => async (dispatch: Dispatch) => {
  dispatch(setErrorPersonAC(true, null));
  try {
    let response = await usersAPI.chosenPerson(id);
    if (response.data) {
      dispatch(chosenPersonAC(response.data));
    }
    dispatch(setErrorPersonAC(false, null));
  } catch (error) {
    dispatch(setErrorPersonAC(false, error.message));
  }
};

export const refreshPersonTC = (id: number) => async (
  dispatch: ThunkDispatch<AppRootStateType, {}, dispatchActionType>,
) => {
  dispatch(setRefreshingAC(true));
  dispatch(setErrorPersonAC(true, null));
  try {
    await dispatch(chosenPersonTC(id));
    dispatch(setErrorPersonAC(false, null));
    dispatch(setRefreshingAC(false));
  } catch (error) {
    dispatch(setErrorPersonAC(false, error.message));
  }
};

type dispatchActionType =
  | SetErrorPersonActionType
  | SetRefreshingActionType
  | SetRefreshingUsersActionType;

export const onRefreshTC = () => async (
  dispatch: ThunkDispatch<AppRootStateType, {}, dispatchActionType>,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  dispatch(setRefreshingAC(true));
  try {
    await dispatch(setRefreshingUsersAC([], 1));
    await dispatch(getUsersAsyncStorageTC());
    dispatch(setRefreshingAC(false));
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
    dispatch(setRefreshingAC(false));
  }
};

export const getUsersTC = () => async (
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
    let response = await usersAPI.getUsers(page);
    if (response.data) {
      dispatch(
        setUsersAC(response.data.data, page + 1, response.data.total_pages),
      );
      dispatch(setStatusSetErrorAC(false, null));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const getAllUsers = () => async (
  dispatch: ThunkDispatch<AppRootStateType, {}, SetStatusSetErrorActionType>,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    await dispatch(getUsersTC());
    await dispatch(getUsersAsyncStorageTC());
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

// AsyncStorage
export const storeDataTC = (newUser: UsersType) => async (
  dispatch: Dispatch,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    let ArrayOldUsers = await AsyncStorage.getItem('users');
    let parsedUsers = ArrayOldUsers ? JSON.parse(ArrayOldUsers) : [];
    const jsonValue = JSON.stringify([newUser, ...parsedUsers]);
    await AsyncStorage.setItem('users', jsonValue);
    dispatch(addNewUserAC(newUser));
    dispatch(setStatusSetErrorAC(false, null));
    if (newUser) {
      dispatch(setSuccessAC(true));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const editedUserDataTC = (editedUser: UsersType) => async (
  dispatch: Dispatch,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    let jsonValueUser = await AsyncStorage.getItem('users');

    let users: Array<UsersType> = jsonValueUser
      ? JSON.parse(jsonValueUser)
      : [];

    let editedLocalUser = users.map(user =>
      user.id === editedUser.id ? editedUser : user,
    );

    await AsyncStorage.setItem('users', JSON.stringify(editedLocalUser));
    dispatch(setStatusSetErrorAC(false, null));
    dispatch(setSuccessAC(true));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const removeUsersAsyncStorageTC = (id: number) => async (
  dispatch: Dispatch,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    let jsonValueUser = await AsyncStorage.getItem('users');

    let users: Array<UsersType> = jsonValueUser
      ? JSON.parse(jsonValueUser)
      : [];

    let filteredUser = users.filter(u => u.id !== id);

    await AsyncStorage.setItem('users', JSON.stringify(filteredUser));

    dispatch(setStatusSetErrorAC(false, null));
    dispatch(setSuccessAC(true));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const getUsersAsyncStorageTC = () => async (
  dispatch: Dispatch,
  getState: () => AppRootStateType,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    const users = getState().usersStore.users;
    const localUsers = users.filter(u => u.local);

    let jsonValueUser = await AsyncStorage.getItem('users');

    let usersNew: Array<UsersType> = jsonValueUser
      ? JSON.parse(jsonValueUser)
      : [];

    const ids: number[] = localUsers.map(u => +u.id);

    usersNew.forEach((el: UsersType) => {
      if (!ids.includes(+el.id)) {
        dispatch(addNewUserAC(el));
      }
    });
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};
