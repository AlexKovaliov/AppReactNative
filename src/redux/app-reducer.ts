import {SetStatusSetErrorACType, SuccessACType} from './actions';

export type ErrorType = null | string;
export type RequestStatusType = boolean;
export type SuccessType = boolean;

type ActionsType = SetStatusSetErrorACType | SuccessACType;
export type InitialAppStateType = typeof initialState;

const initialState = {
  error: null as ErrorType,
  isLoading: true as RequestStatusType,
  success: false as SuccessType,
};

export const appReducer = (
  state: InitialAppStateType = initialState,
  action: ActionsType,
): InitialAppStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS_SET_ERROR':
      return {...state, isLoading: action.isLoading, error: action.error};

    case 'APP/SET_SUCCESS':
      return {...state, success: action.success};

    default:
      return state;
  }
};
