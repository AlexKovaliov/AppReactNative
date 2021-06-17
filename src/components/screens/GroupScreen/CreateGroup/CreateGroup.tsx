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
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CERULEAN_BLUE, GREY, SOLITUDE} from '../../../../utils/colors';
import {Formik, FormikHelpers} from 'formik';
import {CREATE_GROUP_BACK} from '../../../../utils/images';
import {useNavigation} from '@react-navigation/native';
import {readStoragePermission} from '../../../../redux/thunks';
import {launchImageLibrary} from 'react-native-image-picker';
import {GroupType, validationGroup} from './ValidationGroup';
import {
  createGroupTC,
  editingGroupTC,
} from '../../../../redux/thunks/group-thunk';
import {AppRootStateType} from '../../../../store';
import {InitialAppStateType} from '../../../../redux/app-reducer';

type routeType = {
  route: {params?: {group: GroupType}};
};

export const CreateGroup = ({route}: routeType) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const propsGroup = route.params ? route.params?.group : null;

  const {isLoading} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );

  const {
    content,
    errorText,
    imageBack,
    errorInput,
    avatarImage,
    avatarTouch,
    scrollContent,
    textInputStyle,
  } = styles;

  return (
    <Formik
      initialValues={{
        title: propsGroup ? propsGroup.title : '',
        members: propsGroup ? propsGroup.members : [],
        avatarGroup: propsGroup ? propsGroup.avatarGroup : '',
        id: propsGroup ? propsGroup.id : Math.random(),
      }}
      onSubmit={(values, actions: FormikHelpers<GroupType>) => {
        if (propsGroup) {
          dispatch(
            editingGroupTC(values, actions.resetForm, navigation.navigate),
          );
        } else {
          dispatch(
            createGroupTC(values, actions.resetForm, navigation.navigate),
          );
        }
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
          <SafeAreaView>
            <ScrollView>
              <ImageBackground
                blurRadius={40}
                source={{uri: CREATE_GROUP_BACK}}
                style={imageBack}>
                <View style={scrollContent}>
                  <TouchableOpacity
                    style={avatarTouch}
                    onPress={handleSelectFromLibrary}>
                    {avatarGroup ? (
                      <Image
                        source={{
                          uri: avatarGroup,
                        }}
                        style={avatarImage}
                      />
                    ) : (
                      <Text>Tap to download group image</Text>
                    )}
                  </TouchableOpacity>

                  <View style={content}>
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

                    {isLoading ? (
                      <ActivityIndicator color={CERULEAN_BLUE} size="large" />
                    ) : (
                      <Button
                        title={propsGroup ? 'Save changes' : 'Save group'}
                        disabled={!isValid}
                        onPress={handleSubmit}
                      />
                    )}
                  </View>
                </View>
              </ImageBackground>
            </ScrollView>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    width: 250,
    height: 300,
    borderWidth: 1,
    borderColor: SOLITUDE,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 10,
    shadowRadius: 6.27,
    shadowOpacity: 0.34,
  },
  textInputStyle: {
    marginTop: 30,
    marginBottom: 30,
    borderBottomWidth: 2,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: GREY,
    borderStyle: 'solid',
    backgroundColor: '#fff',
  },
  imageBack: {
    height: 520,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  errorInput: {
    marginTop: 30,
    paddingLeft: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: 'red',
    borderStyle: 'solid',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
  },
  avatarImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  avatarTouch: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: SOLITUDE,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
