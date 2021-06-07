import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../../store';
import {usersAPI} from '../../api/users-api';
import {
  chosenPersonAC,
  setErrorPersonAC,
  SetErrorPersonACType,
} from '../actions/person-actions';
import {setRefreshingAC, SetRefreshingACType} from '../actions/users-actions';

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
  dispatch: RefreshDispatchACType,
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

//Dispatch types
type RefreshDispatchACType = ThunkDispatch<
  AppRootStateType,
  {},
  SetRefreshingACType | SetErrorPersonACType
>;
