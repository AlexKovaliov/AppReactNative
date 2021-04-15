import React, {useCallback, useState} from 'react';
import {UsersType} from '../api/users-api';
import {FlatList} from 'react-native';
import {UsersList} from './UsersList';
import {useDispatch} from 'react-redux';
import {getUsersTC} from '../reducers/thunks';

type PropsType = {
  users: Array<UsersType>;
};

export const Users = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const onRefreshHandler = useCallback(() => {
    setIsRefreshing(true);
    dispatch(getUsersTC());
  }, [dispatch]);

  return (
    <FlatList
      data={props.users}
      keyExtractor={item => String(item.id)}
      renderItem={({item}) => <UsersList user={item} />}
      refreshing={isRefreshing}
      onRefresh={onRefreshHandler}
    />
  );
});
