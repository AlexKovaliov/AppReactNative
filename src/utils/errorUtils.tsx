import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, View, Button} from 'react-native';
import {AppRootStateType} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import {onRefreshTC} from '../reducers/thunks';

export function ErrorImage() {
  const dispatch = useDispatch();

  const error = useSelector<AppRootStateType, string | null>(
    state => state.appStore.error,
  );
  const onRefreshHandler = useCallback(() => {
    dispatch(onRefreshTC());
  }, [dispatch]);

  return (
    <View style={styles.containerError}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://www.hostinger.co.uk/assets/images/404-3a53e76ef1.png',
        }}
      />
      <Text style={styles.textError}>Oops! Something went wrong!</Text>
      <Text style={styles.textError}>{error}</Text>
      <Button onPress={onRefreshHandler} title="Refreshing" />
    </View>
  );
}

const styles = StyleSheet.create({
  textError: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontStyle: 'italic',
    color: 'red',
  },
  image: {
    height: 150,
    width: 150,
  },
  containerError: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
  },
});
