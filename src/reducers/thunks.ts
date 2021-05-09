import {Dispatch} from 'redux';
import {usersAPI} from '../api/users-api';
import {
  chosenPersonAC,
  setRefreshingAC,
  setStatusSetErrorAC,
  setUsersAC,
} from './actions';
import {AppRootStateType} from '../store';
import {getData} from '../components/asyncStorage/StoreData';

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
    getUsersTC(1);
    setRefreshingAC(false);
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const getUsersTC = (page: number) => async (
  dispatch: Dispatch,
  getState: () => AppRootStateType,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  const totalPage = getState().usersStore.total_pages;
  if (totalPage && page > totalPage) {
    dispatch(setStatusSetErrorAC(false, null));
    return;
  }
  try {
    let response = await usersAPI.getUsers(page);
    if (response.data) {
      dispatch(setUsersAC(response.data.data, page, response.data.total_pages));
      let usersId = getState().usersStore.users;
      getData(dispatch, usersId).then(r => r);
      dispatch(setStatusSetErrorAC(false, null));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};
