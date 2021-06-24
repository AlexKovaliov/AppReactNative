import React, {useCallback, useEffect} from 'react';
import {JokesList} from './JokesList';
import {AppRootStateType} from '../../../../store';
import {JokesType} from '../../../../api/jokes-api';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../../utils/loadingUtils';
import {InitialAppStateType} from '../../../../redux/app-reducer';
import {FlatList, SafeAreaView, RefreshControl} from 'react-native';
import {InitialJokesStateType} from '../../../../redux/jokes-reducer';
import {fetchJokesTC, onRefreshTC} from '../../../../redux/thunks/jokes-thunk';

export const Jokes = () => {
  const dispatch = useDispatch();

  const {jokes} = useSelector<AppRootStateType, InitialJokesStateType>(
    state => state.jokesStore,
  );

  const {isRefreshing, isLoading} = useSelector<
    AppRootStateType,
    InitialAppStateType
  >(state => state.appStore);

  useEffect(() => {
    dispatch(fetchJokesTC());
  }, [dispatch]);

  const onRefreshHandler = useCallback(() => {
    dispatch(onRefreshTC());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView>
      <FlatList
        data={jokes}
        keyExtractor={(item: JokesType) => String(item.id)}
        renderItem={({item}) => <JokesList joke={item} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefreshHandler}
          />
        }
      />
    </SafeAreaView>
  );
};
