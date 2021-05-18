import React from 'react';
import {AppRootStateType} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setStatusSetErrorAC} from '../reducers/actions';
import {Image, StyleSheet, Text, View, Button} from 'react-native';

export function ErrorImage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const error = useSelector<AppRootStateType, string | null>(
    state => state.appStore.error,
  );

  const {containerError, image, textError} = styles;

  const onComeHome = () => {
    navigation.navigate('Users');
    dispatch(setStatusSetErrorAC(false, null));
  };

  return (
    <View style={containerError}>
      <Image
        style={image}
        source={{
          uri: 'https://www.hostinger.co.uk/assets/images/404-3a53e76ef1.png',
        }}
      />
      <Text style={textError}>Oops! Something went wrong!</Text>
      <Text style={textError}>{error}</Text>
      <Button title={'come home'} onPress={onComeHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  textError: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  image: {
    width: 150,
    height: 150,
  },
  containerError: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'red',
    width: 150,
    height: 90,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
  },
});
