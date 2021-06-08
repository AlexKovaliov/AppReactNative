import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Users} from '../Users';
import {ErrorImage} from '../../utils/errorUtils';
import {AppRootStateType} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {CERULEAN_BLUE, WHITE} from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getAllUsers} from '../../redux/thunk/users-thunks';
import {InitialAppStateType} from '../../redux/app-reducer';
import {setSuccessAC} from '../../redux/actions/app-actions';
import FlashMessage, {showMessage} from 'react-native-flash-message';

export const UsersScreen = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {safeArea, container, button} = styles;
  const onModal = () => navigation.navigate('Modal');
  const {error, isLoading, isSuccess} = useSelector<
    AppRootStateType,
    InitialAppStateType
  >(state => state.appStore);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      showMessage({
        type: 'success',
        message: 'Success',
      });
    }
    dispatch(setSuccessAC(false));
  }, [dispatch, isSuccess]);

  return (
    <SafeAreaView style={safeArea}>
      <View style={container}>
        <Users />
        <TouchableOpacity style={button} onPress={onModal}>
          <Icon name="user-plus" size={20} color={WHITE} />
        </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator color={CERULEAN_BLUE} size="large" />
        ) : null}
        {error ? <ErrorImage /> : null}
      </View>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  button: {
    right: 20,
    width: 55,
    height: 55,
    bottom: 25,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CERULEAN_BLUE,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textBtn: {
    fontSize: 30,
    color: WHITE,
    textAlign: 'center',
  },
});
