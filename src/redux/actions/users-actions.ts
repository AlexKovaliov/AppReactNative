import {UsersType} from '../../api/users-api';

// users-reducer /////
export type FetchUsersACType = ReturnType<typeof fetchUsersAC>;
export const fetchUsersAC = (
  users: Array<UsersType>,
  page: number,
  total_pages: number | null,
) => ({type: 'USERS/FETCH_USERS', users, page, total_pages} as const);

export type SetSearchBarValueACType = ReturnType<typeof setSearchBarValueAC>;
export const setSearchBarValueAC = (filterValue: string) =>
  ({type: 'USERS/SET_FILTER', filterValue} as const);

export type SetRefreshingACType = ReturnType<typeof setRefreshingAC>;
export const setRefreshingAC = (isRefreshing: boolean) =>
  ({type: 'USERS/SET_REFRESHING', isRefreshing} as const);

export type SetRefreshingUsersACType = ReturnType<typeof setRefreshingUsersAC>;
export const setRefreshingUsersAC = (users: Array<UsersType>, page: number) =>
  ({type: 'USERS/SET_REFRESHING_USERS', users, page} as const);

export type AddLocalUserACType = ReturnType<typeof addLocalUserAC>;
export const addLocalUserAC = (localUser: UsersType) =>
  ({type: 'USERS/ADD_LOCAL_USER', localUser} as const);

export type SetEditedUserACType = ReturnType<typeof setEditedUserAC>;
export const setEditedUserAC = (editedUser: UsersType) =>
  ({type: 'USERS/ADD_EDITED_USER', editedUser} as const);

export type RemoveLocalUserACType = ReturnType<typeof removeLocalUserAC>;
export const removeLocalUserAC = (id: number) =>
  ({type: 'USERS/REMOVE_LOCAL_USER', id} as const);

export type SetUserGroupACType = ReturnType<typeof setUserGroupAC>;
export const setUserGroupAC = (groupUser: UsersType) =>
  ({type: 'USERS/ADD_USER_TO_GROUP', groupUser} as const);

export type GetUserGroupACType = ReturnType<typeof getUserGroupAC>;
export const getUserGroupAC = (groupUser: UsersType[]) =>
  ({type: 'USERS/GET_USER_GROUP', groupUser} as const);

export type RemoveUserFromGroupACType = ReturnType<
  typeof removeUserFromGroupAC
>;
export const removeUserFromGroupAC = (id: number) =>
  ({type: 'USERS/REMOVE_USER_FROM_GROUP', id} as const);
