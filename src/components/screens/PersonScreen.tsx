import React, {useCallback, useEffect} from 'react';
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
  const {avatar, first_name, last_name, email, id} = props.user;

  useEffect(() => {
    if (id.toString().length <= 2) {
      dispatch(chosenPersonTC(id));
    }
  }, [dispatch, id]);

  const onRefreshHandler = useCallback(() => {
    if (id.toString().length <= 2) {
      dispatch(chosenPersonTC(id));
    }
  }, [dispatch, id]);

  const {error} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );
  const {isRefreshing} = useSelector<
    AppRootStateType,
    InitialStateUserReducerType
  >(state => state.usersStore);

  const {image, container, wrap, wrapImg, text, emailSt, wrapName} = styles;

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
          <View style={wrapName}>
            <Text style={text}>
              {first_name} {last_name}
            </Text>
          </View>

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
  background: {
    width: '100%',
    height: '40%',
  },
  wrap: {
    width: 355,
    height: '100%',
    position: 'relative',
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
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 50,
    width: 50,
  },
  wrapName: {
    marginTop: 10,
    width: 180,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
