import React from 'react';
import {Button, StyleSheet, TextInput, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NewUserType} from './screens/UsersScreen';
import {Formik, FormikHelpers} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {addNewUserAC} from '../reducers/actions';
import { UsersType } from "../api/users-api";

/*type routeType = {
  route: {
    params: {
      addReview: (newUser: NewUserType) => void;
    };
  };
};*/

export function ModalScreen(/*{route}: routeType*/) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  /*const addReview = route.params.addReview;*/
  const navigationGoBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          avatar: '',
          id: Math.random().toString(),
        }}
        onSubmit={(values, actions: FormikHelpers<NewUserType>) => {
          actions.resetForm();
          /*addReview(values);*/
        }}>
        {props => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={props.handleChange('first_name')}
              value={props.values.first_name}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={props.handleChange('last_name')}
              value={props.values.last_name}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
            />
            <View style={styles.buttonArea}>
              <Button onPress={navigationGoBack} title="Dismiss" />
              <Button
                onPress={() => storeData(props.values, dispatch)}
                title="Submit"
              />
              <Button onPress={() => getData()} title="Get" />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export const storeData = async (newUser: NewUserType, dispatch: Dispatch) => {
  try {
    const jsonValue = JSON.stringify(newUser);
    console.log(jsonValue);
    await AsyncStorage.setItem('user', jsonValue);
    let user: UsersType = JSON.parse(jsonValue);
    dispatch(addNewUserAC(user));
  } catch (error) {
    return <Text>{error}</Text>;
  }
};

export const getData = async () => {
  try {
    const jsonValueUser = await AsyncStorage.getItem('user');
    console.log(jsonValueUser);
    return jsonValueUser != null ? JSON.parse(jsonValueUser) : null;
  } catch (error) {
    return <Text>{error}</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  input: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#f1f3f6',
    marginBottom: 30,
  },
});
