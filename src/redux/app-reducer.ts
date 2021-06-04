import {
  SetCameraGrantedACType,
  SetReadStorageACType,
  SetStatusSetErrorACType,
  SuccessACType,
} from './actions';

type ActionsType =
  | SetStatusSetErrorACType
  | SuccessACType
  | SetCameraGrantedACType
  | SetReadStorageACType;

export type InitialAppStateType = typeof initialState;

const initialState = {
  error: null as null | string,
  isLoading: false,
  isSuccess: false,
  isRead: false,
  isCameraGranted: false,
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

    default:
      return state;
  }
};
