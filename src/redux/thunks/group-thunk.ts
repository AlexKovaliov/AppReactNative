import {Dispatch} from 'redux';
import {
  setStatusSetErrorAC,
  SetStatusSetErrorACType,
  setSuccessAC,
} from '../actions';
import {
  addGroupAC,
  getGroupAC,
  removeGroupAC,
  setUserGroupAC,
  SetUserGroupACType,
  removeUserFromGroupAC,
  RemoveUserFromGroupACType,
} from '../actions/group-action';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../../store';
import {UsersType} from '../../api/users-api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GroupType} from '../../components/screens/GroupScreen/CreateGroup/ValidationGroup';

//Gets a group from AsyncStorage
export const getGroupTC = () => async (dispatch: Dispatch) => {
  try {
    const groupString = await AsyncStorage.getItem('group');
    const group: GroupType[] = groupString ? JSON.parse(groupString) : [];
    if (group) {
      dispatch(getGroupAC(group));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Creating a group
export const createGroupTC = (
  group: GroupType,
  resetForm: () => void,
  navigate: (link: string) => void,
) => async (dispatch: Dispatch) => {
  try {
    const ArrayOldUsers = await AsyncStorage.getItem('group');
    const parsedGroup = ArrayOldUsers ? JSON.parse(ArrayOldUsers) : [];
    const jsonValue = JSON.stringify([group, ...parsedGroup]);
    await AsyncStorage.setItem('group', jsonValue);
    if (group) {
      dispatch(addGroupAC(group));
      dispatch(setSuccessAC(true));
      resetForm();
      navigate('Groups');
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Deleting a group
export const removeGroupTC = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(removeGroupAC(id));
    const arrayGroup = await AsyncStorage.getItem('group');
    const group: Array<GroupType> = arrayGroup ? JSON.parse(arrayGroup) : [];
    const filteredGroup = group.filter(item => item.id !== id);
    await AsyncStorage.setItem('group', JSON.stringify(filteredGroup));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Adds members to a group
export const setUserGroupTC = (
  groupUsersId: number[],
  groupId: number,
) => async (
  dispatch: setUserGroupTCDispatchType,
  getState: () => AppRootStateType,
) => {
  let users = getState().usersStore.users;
  const memberArr = users.filter(item =>
    groupUsersId.find(id => id === item.id),
  );
  try {
    dispatch(setUserGroupAC(groupId, memberArr));
    await dispatch(saveGroupUsersTC(groupId, memberArr));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Saves members to group in AsyncStorage
export const saveGroupUsersTC = (
  groupId: number,
  membersNew: UsersType[],
) => async (dispatch: Dispatch) => {
  try {
    const arrayGroups = await AsyncStorage.getItem('group');
    const groups: Array<GroupType> = arrayGroups ? JSON.parse(arrayGroups) : [];
    const filteredGroup = groups.map(group => {
      if (group.id === groupId) {
        group.members.unshift(...membersNew);
        return group;
      } else {
        return group;
      }
    });
    await AsyncStorage.setItem('group', JSON.stringify(filteredGroup));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Removes members from a group
export const removeUserFromGroupTC = (
  memberId: number,
  groupId: number,
) => async (dispatch: removeUserFromGroupTCDispatchType) => {
  try {
    dispatch(removeUserFromGroupAC(memberId, groupId));
    await dispatch(removeUserFromGroupAsyncStorageTC(memberId, groupId));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Removes members from AsyncStorage
export const removeUserFromGroupAsyncStorageTC = (
  memberId: number,
  groupId: number,
) => async (dispatch: Dispatch) => {
  try {
    const arrayGroups = await AsyncStorage.getItem('group');
    const groups: Array<GroupType> = arrayGroups ? JSON.parse(arrayGroups) : [];

    const filteredGroup = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.filter(member => member.id !== memberId),
        };
      } else {
        return group;
      }
    });

    await AsyncStorage.setItem('group', JSON.stringify(filteredGroup));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

//Thunk types
type removeUserFromGroupTCDispatchType = ThunkDispatch<
  AppRootStateType,
  {},
  RemoveUserFromGroupACType | SetStatusSetErrorACType
>;

type setUserGroupTCDispatchType = ThunkDispatch<
  AppRootStateType,
  {},
  SetUserGroupACType | SetStatusSetErrorACType
>;
