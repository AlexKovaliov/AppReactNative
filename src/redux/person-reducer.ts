import {ChosenPersonActionType} from './actions';

type ActionsType = ChosenPersonActionType;

export type PersonStateType = {
  id: number;
  email: string;
  avatar: string;
  last_name: string;
  first_name: string;
};

const initialState = {} as PersonStateType;

export const personReducer = (
  state: PersonStateType = initialState,
  action: ActionsType,
): PersonStateType => {
  switch (action.type) {
    case 'PERSON/CHOSEN_PERSON':
      return {...action.person};

    default:
      return state;
  }
};
