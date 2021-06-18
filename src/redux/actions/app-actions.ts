//Loading and error status
export type SetStatusSetErrorACType = ReturnType<typeof setStatusSetErrorAC>;
export const setStatusSetErrorAC = (isLoading: boolean, error: null | string) =>
  ({
    type: 'APP/SET_STATUS_SET_ERROR',
    isLoading,
    error,
  } as const);

//Success Status
export type SuccessACType = ReturnType<typeof setSuccessAC>;
export const setSuccessAC = (isSuccess: boolean) =>
  ({
    type: 'APP/SET_SUCCESS',
    isSuccess,
  } as const);

//Set search value
export type SetSearchBarValueACType = ReturnType<typeof setSearchBarValueAC>;
export const setSearchBarValueAC = (filterValue: string) =>
  ({type: 'APP/SET_FILTER', filterValue} as const);
