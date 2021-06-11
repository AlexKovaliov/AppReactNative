import {Dispatch} from 'redux';
import {setStatusSetErrorAC, setSuccessAC} from '../actions';
import {
  addGroupAC,
  getGroupAC,
  removeGroupAC,
  setUserGroupAC,
  removeUserFromGroupAC,
} from '../actions/group-action';
import {AppRootStateType} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GroupType} from '../../components/screens/GroupScreen/CreateGroup/ValidationGroup';

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

export const setUserGroupTC = (
  groupUsersId: number[],
  groupId: number,
) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
  let users = getState().usersStore.users;
  const member = users.filter(item => groupUsersId.find(id => id === item.id));
  try {
    dispatch(setUserGroupAC(groupId, member));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const removeUserFromGroupTC = (
  memberId: number,
  groupId: number,
) => async (dispatch: Dispatch) => {
  try {
    dispatch(removeUserFromGroupAC(memberId, groupId));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};
