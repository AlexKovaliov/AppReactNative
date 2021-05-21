import {SetStatusSetErrorActionType} from './actions';

export type ErrorType = null | string;
export type RequestStatusType = boolean;
type ActionsType = SetStatusSetErrorActionType;
export type InitialAppStateType = typeof initialState;

const initialState = {
  error: null as ErrorType,
  isLoading: true as RequestStatusType,
};

export const appReducer = (
  state: InitialAppStateType = initialState,
  action: ActionsType,
): InitialAppStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS_SET_ERROR':
      return {...state, isLoading: action.isLoading, error: action.error};

    default:
      return state;
  }
};
