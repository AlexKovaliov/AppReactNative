import {
  SetCameraGrantedACType,
  SetReadStorageACType,
  SetSearchBarValueACType,
  SetStatusSetErrorACType,
  SuccessACType,
} from './actions';

type ActionsType =
  | SetStatusSetErrorACType
  | SuccessACType
  | SetCameraGrantedACType
  | SetSearchBarValueACType
  | SetReadStorageACType;

export type InitialAppStateType = typeof initialState;

const initialState = {
  error: null as null | string,
  isLoading: false,
  isSuccess: false,
  isRead: false,
  isCameraGranted: false,
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

    case 'APP/CAMERA_GRANTED':
      return {...state, isCameraGranted: action.isCameraGranted};

    case 'APP/READ_STORAGE':
      return {...state, isRead: action.isRead};

    case 'APP/SET_FILTER':
      return {...state, filterValue: action.filterValue};

    default:
      return state;
  }
};
