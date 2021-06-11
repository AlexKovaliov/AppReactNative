import {Dispatch} from 'redux';
import {
  fetchUsersAC,
  setSuccessAC,
  addLocalUserAC,
  chosenPersonAC,
  setEditedUserAC,
  setRefreshingAC,
  setErrorPersonAC,
  SuccessACType,
  setStatusSetErrorAC,
  setRefreshingUsersAC,
  SetEditedUserACType,
  SetRefreshingACType,
  SetErrorPersonACType,
  SetStatusSetErrorACType,
  SetRefreshingUsersACType,
  setCameraGrantedAC,
  setReadStorageAC,
} from './actions';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../store';
import {usersAPI, UsersType} from '../api/users-api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

//app
export const cameraPermission = () => async (dispatch: Dispatch) => {
  try {
    const result = await check(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      dispatch(setCameraGrantedAC(true));
    } else if (result === RESULTS.DENIED) {
      const requestResult = await request(PERMISSIONS.ANDROID.CAMERA);
      requestResult === RESULTS.GRANTED
        ? dispatch(setCameraGrantedAC(true))
        : dispatch(setCameraGrantedAC(false));
    }
  } catch (error) {
    dispatch(setErrorPersonAC(false, error.message));
  }
};

export const readStoragePermission = () => async (dispatch: Dispatch) => {
  try {
    const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (result === RESULTS.GRANTED) {
      dispatch(setReadStorageAC(true));
    } else if (result === RESULTS.DENIED) {
      const requestResult = await request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      requestResult === RESULTS.GRANTED
        ? dispatch(setReadStorageAC(true))
        : dispatch(setReadStorageAC(false));
    }
  } catch (error) {
    dispatch(setErrorPersonAC(false, error.message));
  }
};

//person
export const chosenPersonTC = (id: number) => async (dispatch: Dispatch) => {
  dispatch(setErrorPersonAC(true, null));
  try {
    const response = await usersAPI.chosenPerson(id);
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

//users
type dispatchActionType =
  | SetErrorPersonACType
  | SetRefreshingACType
  | SetRefreshingUsersACType;

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
    navigate('Users');
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

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
      navigate('Home');
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
