import {Dispatch} from 'redux';
import {
  setUsersAC,
  addNewUserAC,
  chosenPersonAC,
  setRefreshingAC,
  setStatusSetErrorAC,
  SetStatusSetErrorActionType,
} from './actions';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../store';
import {usersAPI, UsersType} from '../api/users-api';
import {NewUserType} from '../components/screens/UsersScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const chosenPersonTC = (id: number) => async (dispatch: Dispatch) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    let response = await usersAPI.chosenPerson(id);
    dispatch(chosenPersonAC(response.data));
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const onRefreshTC = () => async (dispatch: Dispatch) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    setRefreshingAC(true);
    getUsersTC();
    getUsersAsyncStorageTC();
    setRefreshingAC(false);
    dispatch(setStatusSetErrorAC(false, null));
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
      dispatch(setUsersAC(response.data.data, page, response.data.total_pages));
      let usersId = getState().usersStore.users;
      getData(dispatch, usersId).then(r => r);
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
export const storeDataTC = (newUser: NewUserType) => async (
  dispatch: ThunkDispatch<AppRootStateType, {}, SetStatusSetErrorActionType>,
) => {
  dispatch(setStatusSetErrorAC(true, null));

  try {
    let ArrayOldUsers = await AsyncStorage.getItem('users');
    let parsedUsers = ArrayOldUsers ? JSON.parse(ArrayOldUsers) : [];
    const jsonValue = JSON.stringify([newUser, ...parsedUsers]);
    await AsyncStorage.setItem('users', jsonValue);
    await dispatch(getUsersAsyncStorageTC());
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
