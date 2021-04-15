import {UsersType} from '../api/users-api';
import {GetUsersActionType} from './actions';

type ActionsType = GetUsersActionType;

const initialState: Array<UsersType> = [];

export const usersReducer = (
  state: Array<UsersType> = initialState,
  action: ActionsType,
): Array<UsersType> => {
  switch (action.type) {
    case 'GET-USERS':
      return [...(state = action.users)];

    default:
      return state;
  }
};
