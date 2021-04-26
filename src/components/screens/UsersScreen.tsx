import React, {useEffect} from 'react';
import {Button, StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {UsersType} from '../../api/users-api';
import {Users} from '../Users';
import {getUsersTC} from '../../reducers/thunks';
import {ErrorImage} from '../../utils/errorUtils';
import Loading from '../../utils/loadingUtils';
import {InitialPersonStateType} from '../../reducers/app-reducer';

export const UsersScreen = React.memo(() => {
  const users = useSelector<AppRootStateType, Array<UsersType>>(
    state => state.usersStore.users,
  );
  const {error, isLoading} = useSelector<
    AppRootStateType,
    InitialPersonStateType
  >(state => state.appStore);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersTC(1));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? <Loading /> : null}
        <Users users={users} />
        <View style={styles.button}>
          <Button onPress={() => {}} title={'Add User'} />
        </View>
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
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
});
