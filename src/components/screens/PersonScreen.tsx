import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {UsersType} from '../../api/users-api';
import Loading from '../../utils/loadingUtils';
import {ErrorImage} from '../../utils/errorUtils';
import {Image, StyleSheet, Text, View} from 'react-native';
import {InitialAppStateType} from '../../reducers/app-reducer';

type routeType = {
  route: {
    params: {
      user: UsersType;
    };
  };
};

export const PersonScreen = React.memo(({route}: routeType) => {
  const {isLoading} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : <Content user={route.params.user} />}
    </View>
  );
});

const Content = React.memo((props: {user: UsersType}) => {
  const {error} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );
  const {avatar, first_name, last_name, email} = props.user;
  const {image, container, wrap, wrapImg, text, emailSt} = styles;
  const noAvatar =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFe6oKnt1B1FMzZEeMgRWWrsBiqeSRGaCLdA&usqp=CAU';

  const PersonAvatar = (
    <Image
      style={image}
      source={{
        uri: avatar ? avatar : noAvatar,
      }}
    />
  );

  return (
    <View style={container}>
      {error ? (
        <ErrorImage />
      ) : (
        <View style={wrap}>
          <View style={wrapImg}>{PersonAvatar}</View>

          <Text style={text}>
            {first_name} {last_name}
          </Text>

          <Text style={emailSt}>Email: {email}</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f3f6',
  },
  wrap: {
    marginTop: 20,
    alignItems: 'center',
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
