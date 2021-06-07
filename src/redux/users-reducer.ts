import {UsersType} from '../api/users-api';
import {
  FetchUsersACType,
  SetUserGroupACType,
  GetUserGroupACType,
  AddLocalUserACType,
  SetEditedUserACType,
  SetRefreshingACType,
  RemoveLocalUserACType,
  SetSearchBarValueACType,
  SetRefreshingUsersACType,
  RemoveUserFromGroupACType,
} from './actions/users-actions';

type ActionsType =
  | FetchUsersACType
  | SetSearchBarValueACType
  | AddLocalUserACType
  | SetEditedUserACType
  | RemoveLocalUserACType
  | SetRefreshingACType
  | SetRefreshingUsersACType
  | SetUserGroupACType
  | RemoveUserFromGroupACType
  | GetUserGroupACType;

export type InitialStateUserReducerType = typeof initialState;

const initialState = {
  page: 1,
  filterValue: '',
  isRefreshing: false,
  users: [] as Array<UsersType>,
  groupUsers: [] as Array<UsersType>,
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

    case 'USERS/SET_FILTER':
      return {
        ...state,
        filterValue: action.filterValue,
      };

    case 'USERS/SET_REFRESHING':
      return {...state, isRefreshing: action.isRefreshing};

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

    case 'USERS/ADD_USER_TO_GROUP':
      return {
        ...state,
        groupUsers: [
          ...state.groupUsers,
          ...state.users.filter(user => user.id === action.groupUser.id),
        ],
      };

    case 'USERS/REMOVE_USER_FROM_GROUP':
      return {
        ...state,
        groupUsers: state.groupUsers.filter(user => user.id !== action.id),
      };

    case 'USERS/GET_USER_GROUP':
      return {
        ...state,
        groupUsers: action.groupUser,
      };

    default:
      return state;
  }
};
