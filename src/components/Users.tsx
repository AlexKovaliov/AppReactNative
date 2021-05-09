import React, {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {UsersList} from './UsersList';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersTC, onRefreshTC} from '../reducers/thunks';
import {AppRootStateType} from '../store';
import {InitialStateUserReducerType} from '../reducers/users-reducer';
import {UsersType} from '../api/users-api';

export const Users = () => {
  const dispatch = useDispatch();

  const {page, isRefreshing, users} = useSelector<
    AppRootStateType,
    InitialStateUserReducerType
  >(state => state.usersStore);

  const onRefreshHandler = useCallback(() => {
    dispatch(onRefreshTC());
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    dispatch(getUsersTC(page + 1));
  }, [dispatch, page]);

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
};

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    height: 40,
    width: '78%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#f1f3f6',
  },
  flatList: {},
});
