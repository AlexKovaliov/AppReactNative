import {UsersType} from '../../api/users-api';

//Getting users
export type FetchUsersACType = ReturnType<typeof fetchUsersAC>;
export const fetchUsersAC = (
  users: Array<UsersType>,
  page: number,
  total_pages: number | null,
) => ({type: 'USERS/FETCH_USERS', users, page, total_pages} as const);

//Refreshing
export type SetRefreshingACType = ReturnType<typeof setRefreshingAC>;
export const setRefreshingAC = (isRefreshing: boolean) =>
  ({type: 'USERS/SET_REFRESHING', isRefreshing} as const);

//Refreshing users
export type SetRefreshingUsersACType = ReturnType<typeof setRefreshingUsersAC>;
export const setRefreshingUsersAC = (users: Array<UsersType>, page: number) =>
  ({type: 'USERS/SET_REFRESHING_USERS', users, page} as const);

//Adding a local user
export type AddLocalUserACType = ReturnType<typeof addLocalUserAC>;
export const addLocalUserAC = (localUser: UsersType) =>
  ({type: 'USERS/ADD_LOCAL_USER', localUser} as const);

//Add edited local user
export type SetEditedUserACType = ReturnType<typeof setEditedUserAC>;
export const setEditedUserAC = (editedUser: UsersType) =>
  ({type: 'USERS/ADD_EDITED_USER', editedUser} as const);

//Removing a local user
export type RemoveLocalUserACType = ReturnType<typeof removeLocalUserAC>;
export const removeLocalUserAC = (id: number) =>
  ({type: 'USERS/REMOVE_LOCAL_USER', id} as const);
