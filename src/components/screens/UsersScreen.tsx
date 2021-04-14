import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {UsersType} from '../../api/users-api';
import {RequestStatusType} from '../../reducers/app-reducer';
import {Users} from '../Users';
import {getUsersTC} from '../../reducers/thunks';
import Loading from '../../utils/loadingUtils';

export default function UsersScreen() {
  const users = useSelector<AppRootStateType, Array<UsersType>>(
    state => state.user,
  );
  const isLoading = useSelector<AppRootStateType, RequestStatusType>(
    state => state.app.isLoading,
  );
  const error = useSelector<AppRootStateType, string | null>(
    state => state.app.error,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersTC());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : <Users users={users} />}
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: 'red',
  },
});
