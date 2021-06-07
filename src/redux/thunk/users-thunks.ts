import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../../store';
import {usersAPI, UsersType} from '../../api/users-api';
import {SetErrorPersonACType} from '../actions/person-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  fetchUsersAC,
  getUserGroupAC,
  addLocalUserAC,
  setUserGroupAC,
  setRefreshingAC,
  setEditedUserAC,
  SetRefreshingACType,
  SetEditedUserACType,
  setRefreshingUsersAC,
  removeUserFromGroupAC,
  SetRefreshingUsersACType,
} from '../actions/users-actions';
import {
  setSuccessAC,
  SuccessACType,
  setStatusSetErrorAC,
  SetStatusSetErrorACType,
} from '../actions/app-actions';

//users
export const onRefreshTC = () => async (dispatch: onRefreshDispatchType) => {
  dispatch(setStatusSetErrorAC(true, null));
  dispatch(setRefreshingAC(true));
  try {
    dispatch(setRefreshingUsersAC([], 1));
    await dispatch(getLocalUsersTC());
    dispatch(setRefreshingAC(false));
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
    dispatch(setRefreshingAC(false));
  }
};

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
    console.log(error.message);
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const setEditedUserTC = (
  values: UsersType,
  resetForm: () => void,
  navigate: (link: string) => void,
) => async (dispatch: setEditedUserDispatchType) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    dispatch(setEditedUserAC(values));
    await dispatch(setEditedLocalUserTC(values));
    resetForm();
    navigate('Users');
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const getAllUsers = () => async (dispatch: getAllUsersDispatchType) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    await dispatch(fetchUsersTC());
    await dispatch(getLocalUsersTC());
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Dispatch types
type onRefreshDispatchType = ThunkDispatch<
  AppRootStateType,
  {},
  | SetErrorPersonACType
  | SetRefreshingACType
  | SetStatusSetErrorACType
  | SetRefreshingUsersACType
>;

type setEditedUserDispatchType = ThunkDispatch<
  AppRootStateType,
  {},
  SetEditedUserACType | SuccessACType | SetStatusSetErrorACType
>;

type getAllUsersDispatchType = ThunkDispatch<
  AppRootStateType,
  {},
  SetStatusSetErrorACType
>;

// local (AsyncStorage)
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
      navigate('Users');
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

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

export const saveGroupUsersTC = (groupUser: UsersType | undefined) => async (
  dispatch: Dispatch,
) => {
  try {
    const ArrayOldUsers = await AsyncStorage.getItem('groupUsers');
    const parsedUsers = ArrayOldUsers ? JSON.parse(ArrayOldUsers) : [];
    const jsonValue = JSON.stringify([groupUser, ...parsedUsers]);
    await AsyncStorage.setItem('groupUsers', jsonValue);
    if (groupUser) {
      dispatch(setUserGroupAC(groupUser));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const getGroupUsersTC = () => async (dispatch: Dispatch) => {
  try {
    const groupUsersString = await AsyncStorage.getItem('groupUsers');
    const groupUsers: UsersType[] = groupUsersString
      ? JSON.parse(groupUsersString)
      : [];
    if (groupUsers) {
      dispatch(getUserGroupAC(groupUsers));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const removeUserFromGroupTC = (id: number) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch(removeUserFromGroupAC(id));
    const arrayGroupUsers = await AsyncStorage.getItem('groupUsers');
    const groupUsers: Array<UsersType> = arrayGroupUsers
      ? JSON.parse(arrayGroupUsers)
      : [];
    const filteredUser = groupUsers.filter(user => user.id !== id);
    await AsyncStorage.setItem('groupUsers', JSON.stringify(filteredUser));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};
