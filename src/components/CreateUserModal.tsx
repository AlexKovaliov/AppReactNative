import React from 'react';
import {
  Text,
  View,
  Alert,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';
import {storeDataTC} from '../reducers/thunks';
import {NewUserType} from './screens/UsersScreen';
import {launchCamera /*launchImageLibrary*/} from 'react-native-image-picker';

export const ModalScreen = React.memo(() => {
  const dispatch = useDispatch();
  const {container, content, input, error, btnAddArea} = styles;

  const validation = yup.object().shape({
    first_name: yup
      .string()
      .typeError('Must be a string.')
      .required('Please enter your name'),

    last_name: yup
      .string()
      .typeError('Must be a string.')
      .required('Please enter your last name'),

    email: yup
      .string()
      .email('Invalid email')
      .typeError('Must be a string.')
      .required('Please enter your name'),
  });

  const takePhotoFromCamera = async () => {
    await launchCamera(
      {
        quality: 1,
        mediaType: 'photo',
        saveToPhotos: true,
        includeBase64: false,
      },
      response => {
        response.uri;
      },
    );
  };

  return (
    <View style={container}>
      <Formik
        initialValues={{
          email: '',
          avatar: '',
          last_name: '',
          first_name: '',
          id: Math.random().toString(),
        }}
        onSubmit={(values, actions: FormikHelpers<NewUserType>) => {
          actions.resetForm();
        }}
        validationSchema={validation}>
        {props => (
          <View style={content}>
            <TextInput
              style={input}
              placeholder="First Name"
              value={props.values.first_name}
              onChangeText={props.handleChange('first_name')}
            />
            <Text style={error}>{props.errors.first_name}</Text>

            <TextInput
              style={input}
              placeholder="Last Name"
              value={props.values.last_name}
              onChangeText={props.handleChange('last_name')}
            />
            <Text style={error}>{props.errors.last_name}</Text>

            <TextInput
              placeholder="Email"
              style={input}
              value={props.values.email}
              onChangeText={props.handleChange('email')}
            />
            <Text style={error}>{props.errors.email}</Text>

            <View style={btnAddArea}>
              <Button onPress={takePhotoFromCamera} title="take photo" />
              <Button onPress={() => {}} title="from gallery" />

              {props.isSubmitting ? (
                <ActivityIndicator color={'#3949ab'} size="small" />
              ) : (
                <Button
                  onPress={() =>
                    dispatch(storeDataTC(props.values)) &&
                    Alert.alert('Success')
                  }
                  disabled={props.isSubmitting}
                  title="add"
                />
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#f1f3f6',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
  btnAddArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
