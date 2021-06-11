import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {GREY} from '../../../../utils/colors';
import {Formik, FormikHelpers} from 'formik';
import {CREATE_GROUP_BACK, NO_AVATAR_GROUP} from '../../../../utils/images';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {readStoragePermission} from '../../../../redux/thunks';
import {launchImageLibrary} from 'react-native-image-picker';
import {GroupType, validationGroup} from './ValidationGroup';
import {createGroupTC} from '../../../../redux/thunks/group-thunk';

export const CreateGroup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    iconImg,
    errorText,
    errorInput,
    avatarImage,
    contentView,
    avatarTouch,
    scrollContent,
    textInputStyle,
  } = styles;

  return (
    <Formik
      initialValues={{
        title: '',
        members: [],
        avatarGroup: '',
        id: Math.random(),
      }}
      onSubmit={(values, actions: FormikHelpers<GroupType>) => {
        dispatch(createGroupTC(values, actions.resetForm, navigation.navigate));
      }}
      validationSchema={validationGroup}>
      {props => {
        const {
          errors,
          isValid,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        } = props;

        const {avatarGroup, title} = props.values;

        //Input values error
        const errorTitle = errors.title && touched.title;

        const handleSelectFromLibrary = async () => {
          await dispatch(readStoragePermission());
          launchImageLibrary(
            {
              quality: 1,
              mediaType: 'photo',
              includeBase64: true,
            },
            response => {
              if (response.uri) {
                handleChange('avatarGroup')(response.uri);
              }
            },
          );
        };

        return (
          <ImageBackground source={CREATE_GROUP_BACK} style={contentView}>
            <ScrollView>
              <View style={scrollContent}>
                <TouchableOpacity
                  style={avatarTouch}
                  onPress={handleSelectFromLibrary}>
                  <Icon
                    size={20}
                    color="#000"
                    style={iconImg}
                    name="plus-circle"
                  />
                  <Image
                    source={{
                      uri: avatarGroup || NO_AVATAR_GROUP,
                    }}
                    style={avatarImage}
                  />
                </TouchableOpacity>

                <TextInput
                  value={title}
                  placeholder="Group Title"
                  onBlur={handleBlur('title')}
                  onChangeText={handleChange('title')}
                  style={errorTitle ? errorInput : textInputStyle}
                />
                {errorTitle ? (
                  <Text style={errorText}>{errors.title}</Text>
                ) : null}

                <Button
                  title="Save group"
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
              </View>
            </ScrollView>
          </ImageBackground>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    alignItems: 'center',
  },
  textInputStyle: {
    marginTop: 80,
    marginBottom: 30,
    backgroundColor: '#fff',
    width: '85%',
    borderWidth: 2,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: GREY,
    borderStyle: 'solid',
  },
  avatarImage: {
    marginTop: 50,
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  contentView: {
    resizeMode: 'stretch',
    flex: 1,
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  errorInput: {
    marginTop: 80,
    marginBottom: 10,
    width: '85%',
    borderWidth: 2,
    paddingLeft: 10,
    borderColor: 'red',
    borderStyle: 'solid',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
  },
  avatarTouch: {
    width: 100,
    height: 100,
  },
  iconImg: {
    right: 5,
    zIndex: 1,
    bottom: 5,
    position: 'absolute',
  },
});