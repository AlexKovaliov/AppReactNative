import {Dispatch} from 'redux';
import {NewUserType} from '../screens/UsersScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setStatusSetErrorAC} from '../../reducers/actions';

/*export const storeData = async (dispatch: Dispatch, newUser: NewUserType) => {
  try {
    const jsonValue = JSON.stringify(newUser);
    console.log('storeData', jsonValue);

export const storeData = async (dispatch: Dispatch, newUser: NewUserType) => {
  try {
    if (!newUser.id) {
      return Alert.alert('User is created');
    }
    const jsonValue = JSON.stringify(newUser);
    console.log(jsonValue);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (error) {
    //что setStatusSetErrorAC делает? ошибка будет во всем апплике?
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};*/

/*export const getData = async (dispatch: Dispatch, users: UsersType[]) => {
  try {
    const jsonValueUser = await AsyncStorage.getItem('user');
    console.log('data from asyncstorage(getData)', jsonValueUser);
    let usersNew = jsonValueUser !== null ? JSON.parse(jsonValueUser) : null;
    if (users.some(el => el.id === usersNew.id)) {
    console.log('data from asyncstorage', jsonValueUser)
    let usersNew = jsonValueUser != null ? JSON.parse(jsonValueUser) : null;
    // передать айдишники чтоб перебрать их - плохо
    if (usersId.some(el => el.id === usersNew.id)) {
      return;
    } else {
      dispatch(addNewUserAC(usersNew));
    }
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};*/
