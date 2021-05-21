import React, {useEffect} from 'react';
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Users} from '../Users';
import {addUser} from '../../utils/images';
import {AppRootStateType} from '../../store';
import Loading from '../../utils/loadingUtils';
import {getAllUsers} from '../../redux/thunks';
import {ErrorImage} from '../../utils/errorUtils';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {InitialAppStateType} from '../../redux/app-reducer';

export const UsersScreen = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onModal = () => navigation.navigate('Modal');
  const {safeArea, container, button, image} = styles;

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const {error, isLoading} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );

  return (
    <SafeAreaView style={safeArea}>
      <View style={container}>
        {isLoading ? <Loading /> : null}
        <Users />
        <TouchableOpacity style={button} onPress={onModal}>
          <Image style={image} source={{uri: addUser}} />
        </TouchableOpacity>
        {error ? <ErrorImage /> : null}
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  button: {
    right: 20,
    width: 55,
    height: 55,
    bottom: 25,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3949ab',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textBtn: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
  },
});
