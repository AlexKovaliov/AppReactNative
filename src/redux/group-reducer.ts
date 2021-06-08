import {AddGroupACType, RemoveGroupACType} from './actions/group-action';
import {GroupType} from '../components/screens/GroupScreen/ValidationGroup';

type ActionsType = AddGroupACType | RemoveGroupACType;

export type InitialStateGroupReducerType = typeof initialState;

const initialState = {
  group: [] as Array<GroupType>,
};

export const groupReducer = (
  state: InitialStateGroupReducerType = initialState,
  action: ActionsType,
): InitialStateGroupReducerType => {
  switch (action.type) {
    case 'GROUP/ADD_GROUP':
      return {
        ...state,
        group: [...state.group, action.group],
      };

    case 'GROUP/REMOVE_GROUP':
      return {
        ...state,
        group: state.group.filter(item => item.id !== action.id),
      };

    default:
      return state;
  }
};
