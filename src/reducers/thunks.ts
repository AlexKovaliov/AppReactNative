import {Dispatch} from 'redux';
import {setErrorAC, setStatusAC} from './app-reducer';
import {usersAPI} from '../api/users-api';
import {chosenPersonAC} from './person-reducer';
import {getUsersAC} from './users-reducer';

export const chosenPersonTC = (id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC(true));
    usersAPI
      .chosenPerson(id)
      .then(res => {
        dispatch(chosenPersonAC(res.data));
        dispatch(setStatusAC(false));
      })
      .catch(error => {
        dispatch(setErrorAC(error.message));
        dispatch(setStatusAC(false));
      });
  };
};

export const getUsersTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setStatusAC(true));
    usersAPI
      .getUsers()
      .then(res => {
        if (res.data) {
          dispatch(getUsersAC(res.data));
          dispatch(setStatusAC(false));
        }
      })
      .catch(error => {
        dispatch(setErrorAC(error.message));
        dispatch(setStatusAC(false));
      });
  };
};
