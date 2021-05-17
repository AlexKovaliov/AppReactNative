import React, {useCallback} from 'react';
import {UsersList} from './UsersList';
import {AppRootStateType} from '../store';
import {UsersType} from '../api/users-api';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersTC, onRefreshTC} from '../reducers/thunks';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {InitialStateUserReducerType} from '../reducers/users-reducer';

export const Users = React.memo(() => {
  const dispatch = useDispatch();

  const {isRefreshing, users} = useSelector<
    AppRootStateType,
    InitialStateUserReducerType
  >(state => state.usersStore);

  const handleLoadMore = useCallback(() => {
    dispatch(getUsersTC());
  }, [dispatch]);

  const onRefreshHandler = useCallback(() => {
    dispatch(onRefreshTC());
  }, [dispatch]);

  return (
    <FlatList
      style={styles.flatList}
      data={users}
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

const styles = StyleSheet.create({
  inputWrap: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: '78%',
    height: 40,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    backgroundColor: '#f1f3f6',
  },
  flatList: {},
});
