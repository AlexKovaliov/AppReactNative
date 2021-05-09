import {UsersType} from '../api/users-api';
import {
  SetUsersActionType,
  SetFilterActionType,
  SetRefreshingActionType,
  AddNewUserActionType,
  SetNewUserSActionType,
} from './actions';

type ActionsType =
  | SetUsersActionType
  | SetFilterActionType
  | SetRefreshingActionType
  | AddNewUserActionType
  | SetNewUserSActionType;

export type InitialStateUserReducerType = typeof initialState;

const initialState = {
  users: [] as Array<UsersType>,
  term: '',
  page: 1,
  total_pages: null as null | number,
  filter: {term: ''},
  isRefreshing: false,
};

export type FilterType = typeof initialState.filter;

export const usersReducer = (
  state: InitialStateUserReducerType = initialState,
  action: ActionsType,
): InitialStateUserReducerType => {
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
    case 'USERS/SET_REFRESHING':
      return {...state, isRefreshing: action.isRefreshing};
    case 'USERS/ADD_NEW_USER':
      return {
        ...state,
        users: [action.newUser, ...state.users],
      };
    case 'USERS/SET_NEW_USERS':
      return {...state, users: [...action.users, ...state.users]};
    default:
      return state;
  }
};
