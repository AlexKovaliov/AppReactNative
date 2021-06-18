import {UsersType} from '../../api/users-api';

//Get the selected user
export type ChosenPersonACType = ReturnType<typeof chosenPersonAC>;
export const chosenPersonAC = (person: UsersType) => {
  return {type: 'PERSON/CHOSEN_PERSON', person};
};

//Person error
export type SetErrorPersonACType = ReturnType<typeof setErrorPersonAC>;
export const setErrorPersonAC = (isLoading: boolean, error: null | string) => {
  return {type: 'PERSON/ERROR_PERSON', isLoading, error};
};
