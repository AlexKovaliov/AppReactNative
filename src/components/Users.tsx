import React, {useCallback} from 'react';
import {UsersList} from './UsersList';
import {AppRootStateType} from '../store';
import {UsersType} from '../api/users-api';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, RefreshControl} from 'react-native';
import {InitialAppStateType} from '../redux/app-reducer';
import {fetchUsersTC, onRefreshTC} from '../redux/thunks/users-thunk';

export const Users = React.memo(() => {
  const dispatch = useDispatch();

  const users = useSelector<AppRootStateType, Array<UsersType>>(
    state => state.usersStore.users,
  );

  const {filterValue, isRefreshing} = useSelector<
    AppRootStateType,
    InitialAppStateType
  >(state => state.appStore);

  const handleLoadMore = useCallback(() => {
    dispatch(fetchUsersTC());
  }, [dispatch]);

  const onRefreshHandler = useCallback(() => {
    dispatch(onRefreshTC());
  }, [dispatch]);

  const filteredUsers = users.filter(
    user =>
      user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
      user.first_name.toLowerCase().includes(filterValue.toLowerCase()) ||
      user.last_name.toLowerCase().includes(filterValue.toLowerCase()),
  );

  const usersData = !filterValue ? users : filteredUsers;

  return (
    <FlatList
      data={usersData}
      keyExtractor={(item: UsersType) => String(item.id)}
      renderItem={({item}) => <UsersList user={item} />}
      onEndReachedThreshold={0.5}
      onEndReached={handleLoadMore}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefreshHandler}
        />
      }
    />
  );
});
