import {UsersType} from '../api/users-api';

export type ChosenPersonActionType = {
  type: 'CHOSEN-PERSON';
  person: UsersType;
};
type ActionsType = ChosenPersonActionType;
export type PersonStateType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

const initialState = {} as PersonStateType;

export const personReducer = (
  state: PersonStateType = initialState,
  action: ActionsType,
): PersonStateType => {
  switch (action.type) {
    case 'CHOSEN-PERSON':
      return {...(state = action.person)};

    default:
      return state;
  }
};

export const chosenPersonAC = (person: UsersType): ChosenPersonActionType => {
  return {type: 'CHOSEN-PERSON', person};
};
