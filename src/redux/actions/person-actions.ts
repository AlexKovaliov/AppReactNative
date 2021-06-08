import {UsersType} from '../../api/users-api';

// person-reducer /////
export type ChosenPersonACType = ReturnType<typeof chosenPersonAC>;
export const chosenPersonAC = (person: UsersType) =>
  ({type: 'PERSON/CHOSEN_PERSON', person} as const);

export type SetErrorPersonACType = ReturnType<typeof setErrorPersonAC>;
export const setErrorPersonAC = (isLoading: boolean, error: null | string) =>
  ({type: 'PERSON/ERROR_PERSON', isLoading, error} as const);
