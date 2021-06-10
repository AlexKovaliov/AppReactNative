import {Dispatch} from 'redux';
import {setStatusSetErrorAC, setSuccessAC} from '../actions';
import {
  addGroupAC,
  getGroupAC,
  removeGroupAC,
  setUserGroupAC,
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
  /* const group = getState().groupStore.groups.find(g => g.id === groupId);*/
  let users = getState().usersStore.users;
  /* const groupUsers = users.map(user => user.id);*/
  /*console.log('group', group);
  console.log('groupUsers', groupUsers);*/
  const filt = users.filter(item => groupUsersId.find(id => id === item.id));

  try {
    console.log('filt', filt);
    dispatch(setUserGroupAC(groupId, filt));

    // if (group) {
    //   let newUser = [] as UsersType[];
    //   users.forEach(u => {
    //     for (let i = 0; i < groupUsersId.length; i++) {
    //       if (u.id === groupUsersId[i]) {
    //         newUser.push(u);
    //       }
    //     }
    // });
    // console.log('newUser', newUser);
    // dispatch(setUserGroupAC(group, newUser));
    // }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};
