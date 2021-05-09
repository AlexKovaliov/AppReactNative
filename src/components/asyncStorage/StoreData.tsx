import {Dispatch} from 'redux';
import {NewUserType} from '../screens/UsersScreen';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addNewUserAC, setStatusSetErrorAC} from '../../reducers/actions';
import {UsersType} from '../../api/users-api';

export const storeData = async (dispatch: Dispatch, newUser: NewUserType) => {
  try {
    if (!newUser.id) {
      return Alert.alert('User is created');
    }
    const jsonValue = JSON.stringify(newUser);
    console.log(jsonValue);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const getData = async (dispatch: Dispatch, usersId: UsersType[]) => {
  try {
    const jsonValueUser = await AsyncStorage.getItem('user');
    console.log('data from asyncstorage', jsonValueUser);
    let usersNew = jsonValueUser != null ? JSON.parse(jsonValueUser) : null;
    if (usersId.some(el => el.id === usersNew.id)) {
      return;
    } else {
      dispatch(addNewUserAC(usersNew));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};
