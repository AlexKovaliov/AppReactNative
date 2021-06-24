import {Dispatch} from 'redux';
import {
  setRefreshingAC,
  SetRefreshingACType,
  setStatusSetErrorAC,
  SetStatusSetErrorACType,
} from '../actions/app-actions';
import {ThunkDispatch} from 'redux-thunk';
import {jokesApi} from '../../api/jokes-api';
import {AppRootStateType} from '../../store';
import {fetchJokesAC} from '../actions/jokes-actions';

//Jokes request
export const fetchJokesTC = () => async (dispatch: Dispatch) => {
  dispatch(setStatusSetErrorAC(true, null));
  try {
    const response = await jokesApi.getJoke();
    if (response.data) {
      dispatch(fetchJokesAC(response.data));
      dispatch(setStatusSetErrorAC(false, null));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Refresh jokes
export const onRefreshTC = () => async (
  dispatch: ThunkDispatch<AppRootStateType, {}, dispatchActionType>,
) => {
  dispatch(setRefreshingAC(true));
  try {
    await dispatch(fetchJokesTC());
    dispatch(setRefreshingAC(false));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
    dispatch(setRefreshingAC(false));
  }
};

//Thunk types
type dispatchActionType = SetRefreshingACType | SetStatusSetErrorACType;
