import {Dispatch} from 'redux';
import {addGroupAC} from '../actions/group-action';
import {setStatusSetErrorAC, setSuccessAC} from '../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GroupType} from '../../components/screens/GroupScreen/ValidationGroup';

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
      navigate('Group');
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};
