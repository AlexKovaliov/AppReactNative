import {GroupType} from '../../components/screens/GroupScreen/CreateGroup/ValidationGroup';
import {UsersType} from '../../api/users-api';

//Adding a group
export type AddGroupACType = ReturnType<typeof addGroupAC>;
export const addGroupAC = (group: GroupType) =>
  ({type: 'GROUP/ADD_GROUP', group} as const);

//Deleting a group
export type RemoveGroupACType = ReturnType<typeof removeGroupAC>;
export const removeGroupAC = (id: number) =>
  ({type: 'GROUP/REMOVE_GROUP', id} as const);

//Getting a group
export type GetGroupACType = ReturnType<typeof getGroupAC>;
export const getGroupAC = (group: GroupType[]) =>
  ({type: 'GROUP/GET_GROUP', group} as const);

//Editing a group
export type SetEditedGroupACType = ReturnType<typeof setEditedGroupAC>;
export const setEditedGroupAC = (updatedGroups: GroupType[]) =>
  ({type: 'GROUP/ADD_EDITED_GROUP', updatedGroups} as const);

//Add a member to a group
export type SetUserGroupACType = ReturnType<typeof setUserGroupAC>;
export const setUserGroupAC = (groupId: number, members: UsersType[]) =>
  ({type: 'GROUP/ADD_USER_TO_GROUP', groupId, members} as const);

//Removing a member from a group
export type RemoveUserFromGroupACType = ReturnType<
  typeof removeUserFromGroupAC
>;
export const removeUserFromGroupAC = (memberId: number, groupId: number) =>
  ({type: 'GROUP/REMOVE_USER_FROM_GROUP', groupId, memberId} as const);
