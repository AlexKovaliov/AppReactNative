import {Dispatch} from 'redux';
import {usersAPI} from '../api/users-api';
import {chosenPersonAC, getUsersAC, setStatusSetErrorAC} from './actions';

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

export const getUsersTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusSetErrorAC(true, null));
    usersAPI
      .getUsers()
      .then(res => {
        if (res.data) {
          dispatch(getUsersAC(res.data));
          dispatch(setStatusSetErrorAC(false, null));
        }
      })
      .catch(error => {
        dispatch(setStatusSetErrorAC(false, error.message));
      });
  };
};
