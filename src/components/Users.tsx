import React, {useCallback} from 'react';
import {UsersType} from '../api/users-api';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {UsersList} from './UsersList';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersTC} from '../reducers/thunks';
import {AppRootStateType} from '../store';
import Loading from '../utils/loadingUtils';
import {FindUser} from './FindUserForm';
import {setRefreshingAC} from '../reducers/actions';
import {InitialStateUserReducerType} from '../reducers/users-reducer';

type PropsType = {
  users: Array<UsersType>;
};

export const Users = React.memo((props: PropsType) => {
  const {page, isRefreshing} = useSelector<
    AppRootStateType,
    InitialStateUserReducerType
  >(state => state.usersStore);

  const dispatch = useDispatch();

  const onRefreshHandler = useCallback(() => {
    setRefreshingAC(true);
    dispatch(getUsersTC(1));
    setRefreshingAC(false);
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    dispatch(getUsersTC(page + 1));
  }, [dispatch, page]);

  return (
    <View>
      <FlatList
        style={styles.flatList}
        data={props.users}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <UsersList user={item} />}
        onEndReachedThreshold={0.1}
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
