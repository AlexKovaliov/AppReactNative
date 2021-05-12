import {Dispatch} from 'redux';
import {NewUserType} from '../screens/UsersScreen';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addNewUserAC, setStatusSetErrorAC} from '../../reducers/actions';
import {UsersType} from '../../api/users-api';

//почему не пр, я уже просила миллион раз

//почему диспатч передается как параметр, когда у тебя есть мидлварка, которая его добавляет?
export const storeData = async (dispatch: Dispatch, newUser: NewUserType) => {
  try {
    if (!newUser.id) {
      //?? странное условие. и саксесс месадж должен быть после того, как в асин сторадже созраним, вдруг ошибка будет
      return Alert.alert('User is created');
    }
    const jsonValue = JSON.stringify(newUser);
    console.log(jsonValue);
    //ты перезатираешь старых сохранненых юзеров или мне показалось?
    await AsyncStorage.setItem('user', jsonValue);
  } catch (error) {
    //что setStatusSetErrorAC делает? ошибка будет во всем апплике?
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

export const getData = async (dispatch: Dispatch, usersId: UsersType[]) => {
  try {
    const jsonValueUser = await AsyncStorage.getItem('user');
    console.log('data from asyncstorage', jsonValueUser);
    // используй только строгое равенство
    // тут можно проще конструкцию написать
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
};
