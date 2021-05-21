import {Dispatch} from 'redux';
import {
  setUsersAC,
  addNewUserAC,
  chosenPersonAC,
  setRefreshingAC,
  setErrorPersonAC,
  setStatusSetErrorAC,
  SetRefreshingActionType,
  SetStatusSetErrorActionType,
} from './actions';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../store';
import {usersAPI, UsersType} from '../api/users-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const chosenPersonTC = (id: number) => async (dispatch: Dispatch) => {
  dispatch(setErrorPersonAC(true, null));
  try {
    let response = await usersAPI.chosenPerson(id);
    dispatch(chosenPersonAC(response.data));
    dispatch(setErrorPersonAC(false, null));
  } catch (error) {
    dispatch(setErrorPersonAC(false, error.message));
  }
};

export const onRefreshTC = () => async (
  dispatch: ThunkDispatch<
    AppRootStateType,
    {},
    SetStatusSetErrorActionType | SetRefreshingActionType
  >,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  setRefreshingAC(true);
  try {
    await dispatch(refreshTC());
    await dispatch(getUsersAsyncStorageTC());
    setRefreshingAC(false);
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const refreshTC = () => async (
  dispatch: Dispatch,
  getState: () => AppRootStateType,
) => {
  const isRefreshing = getState().usersStore.isRefreshing;
  try {
    if (isRefreshing) {
      let response = await usersAPI.getUsers(1);
      if (response.data) {
        dispatch(setUsersAC(response.data.data, 1, response.data.total_pages));
      }
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
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
    dispatch(addNewUserAC(newUser));
    let ArrayOldUsers = await AsyncStorage.getItem('users');
    let parsedUsers = ArrayOldUsers ? JSON.parse(ArrayOldUsers) : [];
    const jsonValue = JSON.stringify([newUser, ...parsedUsers]);
    await AsyncStorage.setItem('users', jsonValue);
    /*await dispatch(getUsersAsyncStorageTC());*/
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const getUsersAsyncStorageTC = () => async (
  dispatch: Dispatch,
  getState: () => AppRootStateType,
) => {
  const users = getState().usersStore.users;
  dispatch(setStatusSetErrorAC(true, null));

  try {
    let jsonValueUser = await AsyncStorage.getItem('users');

    let usersNew: Array<UsersType> = jsonValueUser
      ? JSON.parse(jsonValueUser)
      : [];

    /*usersNew.map(u => dispatch(addNewUserAC(u)));*/

    console.log('usersNew', jsonValueUser);

    const ids: number[] = users.map(u => +u.id);

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
