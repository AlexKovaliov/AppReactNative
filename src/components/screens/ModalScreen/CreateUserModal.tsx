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
import {validation} from './ModalScreenUtils';
import {UsersType} from '../../../api/users-api';
import {useNavigation} from '@react-navigation/native';
import {addEditedUserAC} from '../../../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {editedUserDataTC, storeDataTC} from '../../../redux/thunks';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {NO_AVATAR} from '../../../utils/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

type routeType = {
  route: {params?: {user: UsersType}};
};

export const ModalScreen = ({route}: routeType) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const propsUser = route.params ? route.params.user : null;

  const {
    wrap,
    input,
    errorSt,
    areaBtn,
    removeText,
    editArea,
    editWrap,
    content,
    avatarSt,
    errorInput,
    inputArea,
    container,
    textTitle,
    avatarArea,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <ScrollView style={content}>
        <Formik
          initialValues={{
            email: !propsUser ? '' : propsUser.email,
            avatar: !propsUser ? '' : propsUser.avatar,
            local: true,
            last_name: !propsUser ? '' : propsUser.last_name,
            first_name: !propsUser ? '' : propsUser.first_name,
            id: !propsUser ? Math.random() : propsUser.id,
          }}
          onSubmit={(values, actions: FormikHelpers<UsersType>) => {
            if (propsUser && propsUser.local) {
              dispatch(addEditedUserAC(values));
              dispatch(editedUserDataTC(values));
              actions.resetForm();
              navigation.navigate('Users');
            } else {
              dispatch(storeDataTC(values));
              actions.resetForm();
              navigation.navigate('Users');
            }
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
            } = props;

            const {first_name, last_name, email} = props.values;

            const takePhotoFromCamera = async () => {
              launchCamera(
                {
                  quality: 1,
                  mediaType: 'photo',
                  saveToPhotos: true,
                  includeBase64: true,
                },
                response => {
                  if (response.uri) {
                    handleChange('avatar')(response.uri);
                  }
                },
              );
            };

            const choosePhotoFromLibrary = async () => {
              launchImageLibrary(
                {
                  quality: 1,
                  mediaType: 'photo',
                  includeBase64: true,
                },
                response => {
                  if (response.uri) {
                    handleChange('avatar')(response.uri);
                  }
                },
              );
            };

            const errorEmail = errors.email && touched.email;
            const errorLastName = errors.last_name && touched.last_name;
            const errorFirstName = errors.first_name && touched.first_name;

            return (
              <View style={wrap}>
                <View style={avatarArea}>
                  {props.isSubmitting ? (
                    <ActivityIndicator color={'#3949ab'} size="large" />
                  ) : (
                    <Image
                      source={{
                        uri: props.values.avatar || NO_AVATAR,
                      }}
                      style={avatarSt}
                    />
                  )}
                </View>
                <View style={editArea}>
                  <TouchableOpacity
                    style={editWrap}
                    onPress={choosePhotoFromLibrary}>
                    <Text style={removeText}>Choose photo</Text>
                    <Icon name="images" size={25} color="#3949ab" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={editWrap}
                    onPress={takePhotoFromCamera}>
                    <Text style={removeText}>Take Photo</Text>
                    <Icon name="camera" size={25} color="#3949ab" />
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

                  <View style={areaBtn}>
                    <Button
                      onPress={handleSubmit}
                      disabled={!isValid}
                      title="save"
                    />
                    {/*<Button
                      onPress={() => AsyncStorage.clear()}
                      title="clear"
                    />*/}
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
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
  removeText: {
    fontSize: 18,
    paddingRight: 15,
  },
  avatarArea: {
    height: 150,
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#3949ab',
  },
  avatarSt: {
    width: 130,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  editArea: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#3949ab',
    justifyContent: 'space-around',
  },
  editWrap: {
    width: '50%',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#f1f3f6',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  iconArea: {
    right: 40,
    position: 'absolute',
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
    backgroundColor: '#000000',
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
    backgroundColor: '#000000',
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
