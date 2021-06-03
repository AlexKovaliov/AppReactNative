import {ChosenPersonACType} from './actions';
import {UsersType} from '../api/users-api';

type ActionsType = ChosenPersonACType;

export type PersonStateType = {
  person: UsersType | undefined;
};

const initialState = {} as PersonStateType;

export const personReducer = (
  state: PersonStateType = initialState,
  action: ActionsType,
): PersonStateType => {
  switch (action.type) {
    case 'PERSON/CHOSEN_PERSON':
      return {person: action.person};

    default:
      return state;
  }
};
