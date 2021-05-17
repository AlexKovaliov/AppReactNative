import {Dispatch} from 'redux';
import {NewUserType} from '../screens/UsersScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setStatusSetErrorAC} from '../../reducers/actions';

/*export const storeData = async (dispatch: Dispatch, newUser: NewUserType) => {
  try {
    const jsonValue = JSON.stringify(newUser);
    console.log('storeData', jsonValue);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};*/

/*export const getData = async (dispatch: Dispatch, users: UsersType[]) => {
  try {
    const jsonValueUser = await AsyncStorage.getItem('user');
    console.log('data from asyncstorage(getData)', jsonValueUser);
    let usersNew = jsonValueUser !== null ? JSON.parse(jsonValueUser) : null;
    if (users.some(el => el.id === usersNew.id)) {
      return;
    } else {
      dispatch(addNewUserAC(usersNew));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};*/
