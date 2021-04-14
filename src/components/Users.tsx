import React from 'react';
import {UsersType} from '../api/users-api';
import {FlatList} from 'react-native';
import {UsersList} from './UsersList';

type PropsType = {
  users: Array<UsersType>;
};

export const Users = React.memo((props: PropsType) => {
  return (
    <FlatList
      data={props.users}
      keyExtractor={item => String(item.id)}
      renderItem={({item}) => <UsersList user={item} />}
    />
  );
});
