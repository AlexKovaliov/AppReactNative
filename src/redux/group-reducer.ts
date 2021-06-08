import {AddGroupACType} from './actions/group-action';
import {GroupType} from '../components/screens/GroupScreen/ValidationGroup';

type ActionsType = AddGroupACType;

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

    default:
      return state;
  }
};
