import {
  AddGroupACType,
  GetGroupACType,
  RemoveGroupACType,
  RemoveUserFromGroupACType,
  SetUserGroupACType,
} from './actions/group-action';
import {GroupType} from '../components/screens/GroupScreen/CreateGroup/ValidationGroup';

type ActionsType =
  | AddGroupACType
  | RemoveGroupACType
  | GetGroupACType
  | SetUserGroupACType
  | RemoveUserFromGroupACType;

export type InitialStateGroupReducerType = typeof initialState;

const initialState = {
  groups: [] as Array<GroupType>,
};

export const groupReducer = (
  state: InitialStateGroupReducerType = initialState,
  action: ActionsType,
): InitialStateGroupReducerType => {
  switch (action.type) {
    case 'GROUP/ADD_GROUP':
      return {
        ...state,
        groups: [action.group, ...state.groups],
      };

    case 'GROUP/REMOVE_GROUP':
      return {
        ...state,
        groups: state.groups.filter(item => item.id !== action.id),
      };

    case 'GROUP/GET_GROUP':
      return {
        ...state,
        groups: action.group,
      };

    case 'GROUP/ADD_USER_TO_GROUP':
      const newMembers = state.groups.map(group => {
        if (group.id === action.groupId) {
          return {...group, members: [...group.members, ...action.members]};
        } else {
          return group;
        }
      });
      return {
        ...state,
        groups: newMembers,
      };

    case 'GROUP/REMOVE_USER_FROM_GROUP':
      const filteredMember = state.groups.map(group => {
        if (group.id === action.groupId) {
          return {
            ...group,
            members: [
              ...group.members.filter(member => member.id !== action.memberId),
            ],
          };
        } else {
          return group;
        }
      });

      return {
        ...state,
        groups: filteredMember,
      };

    default:
      return state;
  }
};
