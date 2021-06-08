import {GroupType} from '../../components/screens/GroupScreen/ValidationGroup';

export type AddGroupACType = ReturnType<typeof addGroupAC>;
export const addGroupAC = (group: GroupType) =>
  ({type: 'GROUP/ADD_GROUP', group} as const);
