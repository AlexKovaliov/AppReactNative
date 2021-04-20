import {Dispatch} from 'redux';
import {ResponseUsersType, usersAPI} from '../api/users-api';
import {chosenPersonAC, setUsersAC, setStatusSetErrorAC} from './actions';

export const chosenPersonTC = (id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusSetErrorAC(true, null));
    usersAPI
      .chosenPerson(id)
      .then(res => {
        dispatch(chosenPersonAC(res.data));
        dispatch(setStatusSetErrorAC(false, null));
      })
      .catch(error => {
        dispatch(setStatusSetErrorAC(false, error.message));
      });
  };
};

export const getUsersTC = (page: number) => {
  return (dispatch: Dispatch, getState: ResponseUsersType) => {
    dispatch(setStatusSetErrorAC(true, null));
    const totalPage = getState.total_pages;
    if (totalPage && page > totalPage) {
      return;
    }
    usersAPI
      .getUsers(page)
      .then(res => {
        if (res.data) {
          dispatch(setUsersAC(res.data.data, page, res.data.total_pages));
          dispatch(setStatusSetErrorAC(false, null));
        }
      })
      .catch(error => {
        dispatch(setStatusSetErrorAC(false, error.message));
      });
  };
};
