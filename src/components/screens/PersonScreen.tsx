import React, {useCallback} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {noAvatar} from '../../utils/images';
import {AppRootStateType} from '../../store';
import {UsersType} from '../../api/users-api';
import Loading from '../../utils/loadingUtils';
import {ErrorImage} from '../../utils/errorUtils';
import {chosenPersonTC} from '../../redux/thunks';
import {useDispatch, useSelector} from 'react-redux';
import {InitialAppStateType} from '../../redux/app-reducer';
import {InitialStateUserReducerType} from '../../redux/users-reducer';

type routeType = {
  route: {
    params: {
      user: UsersType;
    };
  };
};

export const PersonScreen = ({route}: routeType) => {
  const {isLoading} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : <Content user={route.params.user} />}
    </View>
  );
};

const Content = (props: {user: UsersType}) => {
  const dispatch = useDispatch();

  const {error} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );
  const {isRefreshing} = useSelector<
    AppRootStateType,
    InitialStateUserReducerType
  >(state => state.usersStore);

  const {avatar, first_name, last_name, email, id} = props.user;

  const {image, container, wrap, wrapImg, text, emailSt} = styles;

  const onRefreshHandler = useCallback(() => {
    dispatch(chosenPersonTC(id));
  }, [dispatch, id]);

  const PersonAvatar = (
    <Image
      style={image}
      source={{
        uri: avatar ? avatar : noAvatar,
      }}
    />
  );

  return (
    <SafeAreaView style={container}>
      {error ? (
        <ErrorImage />
      ) : (
        <ScrollView
          contentContainerStyle={wrap}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefreshHandler}
            />
          }>
          <View style={wrapImg}>{PersonAvatar}</View>

          <Text style={text}>
            {first_name} {last_name}
          </Text>

          <Text style={emailSt}>Email: {email}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f3f6',
  },
  wrap: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapImg: {
    width: 150,
    height: 150,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    fontStyle: 'italic',
  },
  emailSt: {
    fontSize: 16,
    marginTop: 15,
  },
});
