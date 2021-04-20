import React, {useCallback, useState} from 'react';
import {UsersType} from '../api/users-api';
import {FlatList, View, RefreshControl} from 'react-native';
import {UsersList} from './UsersList';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersTC} from '../reducers/thunks';
import {AppRootStateType} from '../store';
import Loading from '../utils/loadingUtils';

type PropsType = {
  users: Array<UsersType>;
};

export const Users = React.memo((props: PropsType) => {
  const page = useSelector<AppRootStateType, number>(
    state => state.usersStore.page,
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onRefreshHandler = useCallback(() => {
    setIsRefreshing(true);
    dispatch(getUsersTC(1));
    setIsRefreshing(false);
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    dispatch(getUsersTC(page + 1));
  }, [dispatch, page]);

  return (
    <View>
      <FlatList
        data={props.users}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <UsersList user={item} />}
        onEndReachedThreshold={0.3}
        onEndReached={handleLoadMore}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefreshHandler}
          />
        }
      />
      <Loading />
    </View>
  );
});
