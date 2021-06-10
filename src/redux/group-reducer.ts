import {
  AddGroupACType,
  GetGroupACType,
  RemoveGroupACType,
  SetUserGroupACType,
} from './actions/group-action';
import {GroupType} from '../components/screens/GroupScreen/CreateGroup/ValidationGroup';

type ActionsType =
  | AddGroupACType
  | RemoveGroupACType
  | GetGroupACType
  | SetUserGroupACType;

export type InitialStateGroupReducerType = typeof initialState;

const initialState = {
  groups: [] as Array<GroupType>,
  //groupUsers: [] as Array<UsersType>,
};

export const groupReducer = (
  state: InitialStateGroupReducerType = initialState,
  action: ActionsType,
): InitialStateGroupReducerType => {
  console.log('reducer', action);
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
      let newMembers = state.groups.map(group => {
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

    default:
      return state;
  }
};
