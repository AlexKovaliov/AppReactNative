import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NewUserType} from './screens/UsersScreen';
import {Formik, FormikHelpers} from 'formik';
import {useDispatch} from 'react-redux';
import {storeData} from './asyncStorage/StoreData';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

//camera isn't finish
export const ModalScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigationGoBack = () => navigation.goBack();

  const takePhotoFromCamera = async () => {
    await launchCamera({mediaType: 'photo', quality: 1}, response => {});
  };

  //при клавиатуре дизайн едет
  //после нажатия кнопки add ничего не происзодит, не понятно, создается юзер или нет

  return (
    <View style={styles.container}>
      <View style={styles.closeArea}>
        <TouchableOpacity style={styles.closeBtn} onPress={navigationGoBack}>
          <Text style={styles.textBtn}>x</Text>
        </TouchableOpacity>
      </View>
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
        }}>
        {props => (
          <View style={styles.content}>
          {/*валидация*/}
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
            <View style={styles.btnAddArea}>
              {/*<Button onPress={navigationGoBack} title="Dismiss" />*/}
              <TouchableOpacity
                style={styles.button}
                onPress={() => storeData(dispatch, props.values)}>
                <Text style={styles.textBtn}>add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={takePhotoFromCamera}>
                <Text style={styles.textBtn}>photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                /*onPress={chosePhotoFromLibrary}*/>
                <Text style={styles.textBtn}>from library</Text>
              </TouchableOpacity>
              {/*<Button
                onPress={() => storeData(dispatch, props.values)}
                title="Submit"
              />*/}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

// need to change styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  closeArea: {
    alignItems: 'flex-end',
  },
  closeBtn: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3949ab',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  input: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#f1f3f6',
    marginBottom: 30,
  },
  btnAddArea: {
    marginTop: 30,
    alignItems: 'flex-end',
  },
  button: {
    width: 55,
    height: 55,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3949ab',
  },
  textBtn: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
});
