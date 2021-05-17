import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import Loading from '../../utils/loadingUtils';
import {ErrorImage} from '../../utils/errorUtils';
import {Image, StyleSheet, Text, View} from 'react-native';
import {InitialAppStateType} from '../../reducers/app-reducer';
import {InitialStateUserReducerType} from '../../reducers/users-reducer';

type routeType = {
  route: {
    params: {
      id: number;
    };
  };
};

export const PersonScreen = React.memo(({route}: routeType) => {
  const {isLoading} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : <Content id={route.params.id} />}
    </View>
  );
});

const Content = React.memo((props: {id: number}) => {
  const {users} = useSelector<AppRootStateType, InitialStateUserReducerType>(
    state => state.usersStore,
  );
  const {error} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );

  const person = users.find(user => user.id === props.id);

  if (person) {
    const PersonAvatar = (
      <Image
        style={styles.image}
        source={{
          uri: person.avatar
            ? person.avatar
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFe6oKnt1B1FMzZEeMgRWWrsBiqeSRGaCLdA&usqp=CAU',
        }}
      />
    );
    return (
      <View style={styles.container}>
        {error ? (
          <ErrorImage />
        ) : (
          <View style={styles.wrap}>
            <View style={styles.wrapImg}>{PersonAvatar}</View>
            <Text style={styles.text}>
              {person.first_name} {person.last_name}
            </Text>
            <Text style={styles.email}>Email: {person.email}</Text>
=======
  return (
    <View style={styles.container}>
      {props.error ? (
        <ErrorImage />
      ) : (
        <View style={styles.wrap}>
          <View style={styles.wrapImg}>
            <Image style={styles.image} source={{uri: person.avatar}} />
          </View>
        )}
      </View>
    );
  } else {
    return <ErrorImage />;
  }
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
  email: {
    fontSize: 16,
    marginTop: 15,
  },
});
