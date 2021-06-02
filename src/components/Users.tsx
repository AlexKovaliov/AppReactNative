import React, {useCallback} from 'react';
import {UsersList} from './UsersList';
import {AppRootStateType} from '../store';
import {UsersType} from '../api/users-api';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsersTC, onRefreshTC} from '../redux/thunks';
import {FlatList, RefreshControl} from 'react-native';
import {InitialStateUserReducerType} from '../redux/users-reducer';

export const Users = React.memo(() => {
  const dispatch = useDispatch();

  const {isRefreshing, users, filterValue} = useSelector<
    AppRootStateType,
    InitialStateUserReducerType
  >(state => state.usersStore);

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
