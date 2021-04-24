import {Dispatch} from 'redux';
import {ResponseUsersType, usersAPI} from '../api/users-api';
import {chosenPersonAC, setUsersAC, setStatusSetErrorAC} from './actions';

export const chosenPersonTC = (id: number) => async (dispatch: Dispatch) => {
  dispatch(setStatusSetErrorAC(true, null));
  let response = await usersAPI.chosenPerson(id);
  try {
    dispatch(chosenPersonAC(response.data));
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const getUsersTC = (page: number) => async (
  dispatch: Dispatch,
  getState: ResponseUsersType,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  const totalPage = getState.total_pages;
  if (totalPage && page > totalPage) {
    return;
  }
  let response = await usersAPI.getUsers(page);
  try {
    if (response.data) {
      dispatch(setUsersAC(response.data.data, page, response.data.total_pages));
      dispatch(setStatusSetErrorAC(false, null));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};
