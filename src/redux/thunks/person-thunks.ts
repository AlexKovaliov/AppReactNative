import {Dispatch} from 'redux';
import {
  chosenPersonAC,
  setErrorPersonAC,
  SetErrorPersonACType,
} from '../actions/person-actions';
import {ThunkDispatch} from 'redux-thunk';
import {usersAPI} from '../../api/users-api';
import {AppRootStateType} from '../../store';
import {setRefreshingAC, SetRefreshingACType} from '../actions/app-actions';

//Selected user request.
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

//Refresh person
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

type dispatchActionType = SetErrorPersonACType | SetRefreshingACType;
