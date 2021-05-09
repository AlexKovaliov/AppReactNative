import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {Users} from '../Users';
import {getUsersTC} from '../../reducers/thunks';
import {ErrorImage} from '../../utils/errorUtils';
import Loading from '../../utils/loadingUtils';
import {InitialPersonStateType} from '../../reducers/app-reducer';
import {useNavigation} from '@react-navigation/native';

export type NewUserType = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  avatar: string;
};

export const UsersScreen = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onModal = () => navigation.navigate('Modal');

  const {error, isLoading} = useSelector<
    AppRootStateType,
    InitialPersonStateType
  >(state => state.appStore);

  useEffect(() => {
    dispatch(getUsersTC(1));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? <Loading /> : null}
        <Users />
        <TouchableOpacity style={styles.button} onPress={onModal}>
          <Text style={styles.textBtn}>+</Text>
        </TouchableOpacity>
        {error ? <ErrorImage /> : null}
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  button: {
    position: 'absolute',
    width: 55,
    height: 55,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3949ab',
    top: 500,
    left: 290,
  },
  textBtn: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
  },
});
