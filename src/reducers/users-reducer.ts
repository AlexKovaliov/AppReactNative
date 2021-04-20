import {UsersType} from '../api/users-api';
import {
  SetUsersActionType,
  SetFilterActionType,
  SetPageActionType,
} from './actions';

type ActionsType = SetUsersActionType | SetFilterActionType | SetPageActionType;

type InitialStateType = typeof initialState;

const initialState = {
  users: [] as Array<UsersType>,
  filter: {term: ''},
  page: 1,
  total_pages: null as null | number,
};

export const usersReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'USERS/SET_USERS':
      if (action.page === 1) {
        return {
          ...state,
          users: action.users,
          page: action.page,
          total_pages: action.total_pages,
        };
      }
      return {
        ...state,
        users: [...state.users, ...action.users],
        page: action.page,
      };
    case 'USERS/SET_FILTER':
      return {...state, filter: action.payload};
    default:
      return state;
  }
};
