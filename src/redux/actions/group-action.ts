import {GroupType} from '../../components/screens/GroupScreen/ValidationGroup';

export type AddGroupACType = ReturnType<typeof addGroupAC>;
export const addGroupAC = (group: GroupType) =>
  ({type: 'GROUP/ADD_GROUP', group} as const);

export type RemoveGroupACType = ReturnType<typeof removeGroupAC>;
export const removeGroupAC = (id: number) =>
  ({type: 'GROUP/REMOVE_GROUP', id} as const);
