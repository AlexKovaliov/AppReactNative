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
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {UsersType} from '../api/users-api';
import {storeDataTC} from '../redux/thunks';
import {Formik, FormikHelpers} from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import {camera, gallery, noAvatar} from '../utils/images';
import FlashMessage, {showMessage} from 'react-native-flash-message';

export const ModalScreen = React.memo(() => {
  const dispatch = useDispatch();

  const {
    input,
    error,
    image,
    avatarSt,
    content,
    button,
    wrap,
    inputArea,
    container,
    textTitle,
    avatarArea,
    galleryBtn,
  } = styles;

  const validation = yup.object().shape({
    first_name: yup.string().required('Please enter your name'),
    last_name: yup.string().required('Please enter your last name'),
    email: yup
      .string()
      .email('Invalid email')
      .required('Please enter your email'),
  });

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
            actions.resetForm();
          }}
          validationSchema={validation}>
          {props => {
            const {handleChange, isSubmitting, errors} = props;
            const {first_name, last_name, email} = props.values;

            const choosePhotoFromLibrary = () => {
              ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                compressImageQuality: 0.7,
              }).then(el => {
                props.values.avatar = el.path;
              });
            };

            const takePhotoFromCamera = async () => {
              ImagePicker.openCamera({
                width: 300,
                height: 300,
                cropping: true,
                compressImageQuality: 0.7,
              }).then(el => {
                props.values.avatar = el.path;
              });
            };

            const disabled =
              !!errors.email ||
              email.trim() === '' ||
              last_name.trim() === '' ||
              first_name.trim() === '';

            const onSetValue = () => {
              dispatch(storeDataTC(props.values));
              showMessage({
                type: 'success',
                message: 'Success',
                description: 'The user has been created',
              });
            };

            return (
              <View style={wrap}>
                <View style={avatarArea}>
                  <Image
                    source={{
                      uri: props.values.avatar ? props.values.avatar : noAvatar,
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
                  {errors.first_name || errors.last_name || errors.email ? (
                    <Text style={error}>
                      {errors.first_name || errors.last_name || errors.email}
                    </Text>
                  ) : (
                    <Text style={textTitle}>User Profile</Text>
                  )}

                  <TextInput
                    style={input}
                    value={first_name}
                    placeholder="First Name"
                    onChangeText={handleChange('first_name')}
                  />

                  <TextInput
                    style={input}
                    value={last_name}
                    placeholder="Last Name"
                    onChangeText={handleChange('last_name')}
                  />

                  <TextInput
                    style={input}
                    value={email}
                    placeholder="Email"
                    autoCompleteType={'email'}
                    onChangeText={handleChange('email')}
                  />

                  {isSubmitting ? (
                    <ActivityIndicator color={'#3949ab'} size="small" />
                  ) : (
                    <Button
                      onPress={onSetValue}
                      disabled={disabled}
                      title="save"
                    />
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
});

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
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
  },
});
