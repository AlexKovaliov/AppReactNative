import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';
import {UsersType} from '../../../api/users-api';
import {storeDataTC} from '../../../redux/thunks';
import FlashMessage from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import {SuccessMessage, validation} from './ModalScreenUtils';
import {camera, gallery, noAvatar} from '../../../utils/images';

export const ModalScreen = () => {
  const dispatch = useDispatch();

  const {
    wrap,
    input,
    image,
    button,
    errorSt,
    areaBtn,
    content,
    avatarSt,
    errorInput,
    inputArea,
    container,
    textTitle,
    avatarArea,
    galleryBtn,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <ScrollView style={content}>
        <Formik
          initialValues={{
            email: '',
            avatar: '',
            last_name: '',
            first_name: '',
            id: Math.random(),
          }}
          onSubmit={(values, actions: FormikHelpers<UsersType>) => {
            dispatch(storeDataTC(values));
            SuccessMessage();
            actions.resetForm();
          }}
          validationSchema={validation}>
          {props => {
            let {
              errors,
              isValid,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            } = props;

            let {first_name, last_name, email, avatar} = props.values;

            const choosePhotoFromLibrary = () => {
              ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                compressImageQuality: 0.7,
              }).then(el => {
                handleChange('avatar')(el.path);
              });
            };

            const takePhotoFromCamera = () => {
              ImagePicker.openCamera({
                width: 300,
                height: 300,
                cropping: true,
                compressImageQuality: 0.7,
              }).then(el => {
                handleChange('avatar')(el.path);
              });
            };

            const disabled =
              !!errors.email ||
              email.trim() === '' ||
              last_name.trim() === '' ||
              first_name.trim() === '';

            let errorEmail = errors.email && touched.email;
            let errorLastName = errors.last_name && touched.last_name;
            let errorFirstName = errors.first_name && touched.first_name;

            return (
              <View style={wrap}>
                <View style={avatarArea}>
                  <Image
                    source={{
                      uri: avatar ? avatar : noAvatar,
                    }}
                    style={avatarSt}
                  />
                  <TouchableOpacity
                    style={button}
                    onPress={takePhotoFromCamera}>
                    <Image style={image} source={{uri: camera}} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={galleryBtn}
                    onPress={choosePhotoFromLibrary}>
                    <Image style={image} source={{uri: gallery}} />
                  </TouchableOpacity>
                </View>
                <View style={inputArea}>
                  <Text style={textTitle}>User Profile</Text>

                  <TextInput
                    value={first_name}
                    placeholder="First Name"
                    style={errorFirstName ? errorInput : input}
                    onBlur={handleBlur('first_name')}
                    onChangeText={handleChange('first_name')}
                  />
                  {errorFirstName ? (
                    <Text style={errorSt}>{errors.first_name}</Text>
                  ) : null}

                  <TextInput
                    value={last_name}
                    placeholder="Last Name"
                    style={errorLastName ? errorInput : input}
                    onBlur={handleBlur('last_name')}
                    onChangeText={handleChange('last_name')}
                  />
                  {errorLastName ? (
                    <Text style={errorSt}>{errors.last_name}</Text>
                  ) : null}

                  <TextInput
                    value={email}
                    placeholder="Email"
                    autoCompleteType={'email'}
                    style={errorEmail ? errorInput : input}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                  />
                  {errorEmail ? (
                    <Text style={errorSt}>{errors.email}</Text>
                  ) : null}

                  {isSubmitting ? (
                    <ActivityIndicator color={'#3949ab'} size="large" />
                  ) : (
                    <View style={areaBtn}>
                      <Button
                        onPress={handleSubmit}
                        //оставил дополнительную проверку т.к. isValid не достаточно,
                        // на момент входа isValid true кнопка активна и после submit тоже активна
                        // и можно пробелы поставить и отправить, isValid не ругается
                        disabled={!isValid || disabled}
                        title="save"
                      />
                    </View>
                  )}
                </View>
              </View>
            );
          }}
        </Formik>
        <FlashMessage position="top" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  content: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  avatarArea: {
    height: 150,
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3949ab',
  },
  avatarSt: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  button: {
    top: 85,
    right: 85,
    width: 55,
    height: 55,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f3f6',
  },
  areaBtn: {
    marginTop: 25,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  galleryBtn: {
    top: 85,
    left: 85,
    width: 55,
    height: 55,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f3f6',
  },
  wrap: {
    height: 580,
  },
  inputArea: {
    height: 380,
    marginTop: 20,
    paddingBottom: 20,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  textTitle: {
    fontSize: 18,
    color: '#3949ab',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 10,
  },
  input: {
    marginBottom: 20,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#f1f3f6',
  },
  errorInput: {
    marginBottom: 20,
    borderColor: 'red',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  errorSt: {
    color: 'red',
    fontSize: 14,
    textAlign: 'left',
  },
});
