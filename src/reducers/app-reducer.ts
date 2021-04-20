import {SetStatusSetErrorActionType} from './actions';

export type RequestStatusType = boolean;
export type ErrorType = null | string;
type ActionsType = SetStatusSetErrorActionType;
type InitialStateType = typeof initialState;

const initialState = {
  isLoading: true as RequestStatusType,
  error: null as ErrorType,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS_SET_ERROR':
      return {...state, isLoading: action.isLoading, error: action.error};
    default:
      return state;
  }
};
