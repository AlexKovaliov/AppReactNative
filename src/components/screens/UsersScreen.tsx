import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Users} from '../Users';
import Loading from '../../utils/loadingUtils';
import {getAllUsers} from '../../redux/thunks';
import {ErrorImage} from '../../utils/errorUtils';
import {AppRootStateType} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {InitialAppStateType} from '../../redux/app-reducer';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {setSuccessAC} from '../../redux/actions';

export const UsersScreen = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onModal = () => navigation.navigate('Modal');
  const {safeArea, container, button} = styles;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const {error, isLoading, success} = useSelector<
    AppRootStateType,
    InitialAppStateType
  >(state => state.appStore);

  useEffect(() => {
    if (success) {
      showMessage({
        type: 'success',
        message: 'Success',
      });
    }
    dispatch(setSuccessAC(false));
  }, [dispatch, success]);

  return (
    <SafeAreaView style={safeArea}>
      <View style={container}>
        {isLoading ? <Loading /> : null}
        <Users />
        <TouchableOpacity style={button} onPress={onModal}>
          <Icon name="user-plus" size={25} color="#fff" />
        </TouchableOpacity>
        {error ? <ErrorImage /> : null}
      </View>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#3949ab',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textBtn: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
  },
});
