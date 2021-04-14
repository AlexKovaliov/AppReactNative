export type RequestStatusType = boolean;
export type ErrorType = null | string;
export type SetStatusActionType = ReturnType<typeof setStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setErrorAC>;
type ActionsType = SetStatusActionType | SetAppErrorActionType;
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
    case 'APP/SET-STATUS':
      return {...state, isLoading: action.isLoading};
    case 'APP/SET-ERROR':
      return {...state, error: action.error};
    default:
      return state;
  }
};

export const setStatusAC = (isLoading: RequestStatusType) =>
  ({
    type: 'APP/SET-STATUS',
    isLoading,
  } as const);

export const setErrorAC = (error: null | string) =>
  ({
    type: 'APP/SET-ERROR',
    error: error,
  } as const);
