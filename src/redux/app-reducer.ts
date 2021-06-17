export type InitialAppStateType = typeof initialState;

const initialState = {
  error: null as null | string,
  isLoading: false,
  isSuccess: false,

export const appReducer = (
  state: InitialAppStateType = initialState,
  action: ActionsType,
): InitialAppStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS_SET_ERROR':
      return {...state, isLoading: action.isLoading, error: action.error};

    case 'APP/SET_SUCCESS':
      return {...state, isSuccess: action.isSuccess};

    default:
      return state;
  }
};
