import {
  SuccessACType,
  SetRefreshingACType,
  SetSearchBarValueACType,
  SetStatusSetErrorACType,
} from './actions/app-actions';

type ActionsType =
  | SuccessACType
  | SetRefreshingACType
  | SetStatusSetErrorACType
  | SetSearchBarValueACType;

export type InitialAppStateType = typeof initialState;

const initialState = {
  filterValue: '',
  isLoading: false,
  isSuccess: false,
  isRefreshing: false,
  error: null as null | string,
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

    case 'APP/SET_REFRESHING':
      return {...state, isRefreshing: action.isRefreshing};

    default:
      return state;
  }
};
