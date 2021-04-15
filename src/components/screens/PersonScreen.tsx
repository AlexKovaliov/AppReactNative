import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {UsersType} from '../../api/users-api';
import {ErrorType, RequestStatusType} from '../../reducers/app-reducer';
import {chosenPersonTC} from '../../reducers/thunks';
import Loading from '../../utils/loadingUtils';
import {ErrorImage} from '../../utils/errorUtils';

export const PersonScreen = React.memo(({route}: any) => {
  const isLoading = useSelector<AppRootStateType, RequestStatusType>(
    state => state.app.isLoading,
  );
  const error = useSelector<AppRootStateType, string | null>(
    state => state.app.error,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chosenPersonTC(route.params.id));
  }, [dispatch, route.params.id]);

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : <Content error={error} />}
    </View>
  );
});

const Content = React.memo((props: {error: ErrorType}) => {
  const person = useSelector<AppRootStateType, UsersType>(
    state => state.person,
  );

  return (
    <View style={styles.container}>
      {props.error ? (
        <ErrorImage />
      ) : (
        <View style={styles.wrap}>
          <View style={styles.wrapImg}>
            <Image style={styles.image} source={{uri: person.avatar}} />
          </View>
          <Text style={styles.text}>
            {person.first_name} {person.last_name}
          </Text>
          <Text style={styles.email}>Email: {person.email}</Text>
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
    alignItems: 'center',
    marginTop: 30,
  },
  wrapImg: {
    height: 150,
    width: 150,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    fontStyle: 'italic',
  },
  email: {
    marginTop: 15,
    fontSize: 16,
  },
});
