// app-reducer /////
export type SetStatusSetErrorACType = ReturnType<typeof setStatusSetErrorAC>;
export const setStatusSetErrorAC = (isLoading: boolean, error: null | string) =>
  ({
    type: 'APP/SET_STATUS_SET_ERROR',
    isLoading,
    error,
  } as const);

export type SuccessACType = ReturnType<typeof setSuccessAC>;
export const setSuccessAC = (isSuccess: boolean) =>
  ({
    type: 'APP/SET_SUCCESS',
    isSuccess,
  } as const);

export type SetCameraGrantedACType = ReturnType<typeof setCameraGrantedAC>;
export const setCameraGrantedAC = (isCameraGranted: boolean) =>
  ({type: 'APP/CAMERA_GRANTED', isCameraGranted} as const);

export type SetReadStorageACType = ReturnType<typeof setReadStorageAC>;
export const setReadStorageAC = (isRead: boolean) =>
  ({type: 'APP/READ_STORAGE', isRead} as const);
