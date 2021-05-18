import React, {useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Users} from '../Users';
import {AppRootStateType} from '../../store';
import Loading from '../../utils/loadingUtils';
import {getAllUsers} from '../../reducers/thunks';
import {ErrorImage} from '../../utils/errorUtils';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {InitialAppStateType} from '../../reducers/app-reducer';

export type NewUserType = {
  id: string;
  email: string;
  avatar: string;
  last_name: string;
  first_name: string;
};

export const UsersScreen = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onModal = () => navigation.navigate('Modal');

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const {error, isLoading} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );
  const {safeArea, container, button, textBtn} = styles;

  return (
    <SafeAreaView style={safeArea}>
      <View style={container}>
        {isLoading ? <Loading /> : null}
        <Users />
        <TouchableOpacity style={button} onPress={onModal}>
          <Text style={textBtn}>+</Text>
        </TouchableOpacity>
        {error ? <ErrorImage /> : null}
      </View>
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
    top: 500,
    left: 290,
    width: 55,
    height: 55,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3949ab',
  },
  textBtn: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
});
