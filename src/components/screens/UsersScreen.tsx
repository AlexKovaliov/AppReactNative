import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {UsersType} from '../../api/users-api';
import {Users} from '../Users';
import {getUsersTC} from '../../reducers/thunks';
import {ErrorImage} from '../../utils/errorUtils';

export const UsersScreen = React.memo(() => {
  const users = useSelector<AppRootStateType, Array<UsersType>>(
    state => state.usersStore.users,
  );
  const error = useSelector<AppRootStateType, string | null>(
    state => state.appStore.error,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersTC(1));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Users users={users} />
      {error ? <ErrorImage /> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
