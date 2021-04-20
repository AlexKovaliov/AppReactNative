import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppRootStateType} from '../store';
import {useSelector} from 'react-redux';

export function ErrorImage() {
  const error = useSelector<AppRootStateType, string | null>(
    state => state.appStore.error,
  );

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
    </View>
  );
}

const styles = StyleSheet.create({
  textError: {
    marginTop: 10,
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
    backgroundColor: 'grey',
  },
});
