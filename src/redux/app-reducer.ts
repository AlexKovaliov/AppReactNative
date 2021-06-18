import {
  SuccessACType,
  SetSearchBarValueACType,
  SetStatusSetErrorACType,
} from './actions/app-actions';

type ActionsType =
  | SuccessACType
  | SetStatusSetErrorACType
  | SetSearchBarValueACType;

export type InitialAppStateType = typeof initialState;

const initialState = {
  error: null as null | string,
  isLoading: false,
  isSuccess: false,
  filterValue: '',
};

export const appReducer = (
  state: InitialAppStateType = initialState,
  action: ActionsType,
): InitialAppStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS_SET_ERROR':
      return {...state, isLoading: action.isLoading, error: action.error};

    case 'APP/SET_SUCCESS':
      return {...state, isSuccess: action.isSuccess};

    case 'APP/SET_FILTER':
      return {...state, filterValue: action.filterValue};

    default:
      return state;
  }
};
