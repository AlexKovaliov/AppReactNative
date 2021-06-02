import {UsersType} from '../api/users-api';
import {
  SetUsersActionType,
  SetFilterActionType,
  AddNewUserActionType,
  SetRefreshingActionType,
  RemoveNewUserActionType,
  AddEditedUserActionType,
  SetRefreshingUsersActionType,
} from './actions';

type ActionsType =
  | SetUsersActionType
  | SetFilterActionType
  | AddNewUserActionType
  | AddEditedUserActionType
  | RemoveNewUserActionType
  | SetRefreshingActionType
  | SetRefreshingUsersActionType;

export type InitialStateUserReducerType = typeof initialState;

const initialState = {
  page: 1,
  success: false,
  filterValue: '',
  isRefreshing: false,
  users: [] as Array<UsersType>,
  total_pages: null as null | number,
};

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

    case 'USERS/SET_REFRESHING_USERS':
      return {
        ...state,
        users: action.users,
        page: action.page,
      };

    case 'USERS/SET_FILTER':
      return {
        ...state,
        filterValue: action.filterValue,
      };

    case 'USERS/SET_REFRESHING':
      return {...state, isRefreshing: action.isRefreshing};

    case 'USERS/ADD_NEW_USER':
      return {
        ...state,
        users: [action.newUser, ...state.users],
      };

    case 'USERS/REMOVE_NEW_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id),
      };

    case 'USERS/ADD_EDITED_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.editedUser.id ? action.editedUser : user,
        ),
      };

    default:
      return state;
  }
};
