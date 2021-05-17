import {UsersType} from '../api/users-api';
import {
  SetUsersActionType,
  SetFilterActionType,
  AddNewUserActionType,
  SetNewUserSActionType,
  SetRefreshingActionType,
} from './actions';

type ActionsType =
  | SetUsersActionType
  | SetFilterActionType
  | AddNewUserActionType
  | SetNewUserSActionType
  | SetRefreshingActionType;

export type InitialStateUserReducerType = typeof initialState;

const initialState = {
  page: 1,
  term: '',
  filter: {term: ''},
  isRefreshing: false,
  users: [] as Array<UsersType>,
  total_pages: null as null | number,
};

export type FilterType = typeof initialState.filter;

export const usersReducer = (
  state: InitialStateUserReducerType = initialState,
  action: ActionsType,
): InitialStateUserReducerType => {
  switch (action.type) {
    case 'USERS/SET_USERS':
      return {
        ...state,
        users: [...state.users, ...action.users],
        page: action.page,
        total_pages: action.total_pages,
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
