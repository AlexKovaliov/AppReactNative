import {UsersType} from '../api/users-api';

export type GetUsersActionType = {
  type: 'GET-USERS';
  users: Array<UsersType>;
};
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

export const getUsersAC = (users: Array<UsersType>): GetUsersActionType => {
  return {type: 'GET-USERS', users};
};
