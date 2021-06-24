import {
  FetchUsersACType,
  AddLocalUserACType,
  SetEditedUserACType,
  RemoveLocalUserACType,
  SetRefreshingUsersACType,
} from './actions/users-actions';
import {UsersType} from '../api/users-api';

type ActionsType =
  | FetchUsersACType
  | AddLocalUserACType
  | SetEditedUserACType
  | RemoveLocalUserACType
  | SetRefreshingUsersACType;

export type InitialStateUserReducerType = typeof initialState;

const initialState = {
  page: 1,
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
    case 'USERS/FETCH_USERS':
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

    case 'USERS/ADD_LOCAL_USER':
      return {
        ...state,
        users: [action.localUser, ...state.users],
      };

    case 'USERS/REMOVE_LOCAL_USER':
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
