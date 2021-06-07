import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Users} from '../Users';
import {AppRootStateType} from '../../store';
import {ErrorImage} from '../../utils/errorUtils';
import {useDispatch, useSelector} from 'react-redux';
import {CERULEAN_BLUE, WHITE} from '../../utils/colors';
import {getAllUsers} from '../../redux/thunk/users-thunks';
import {InitialAppStateType} from '../../redux/app-reducer';
import {setSuccessAC} from '../../redux/actions/app-actions';
import FlashMessage, {showMessage} from 'react-native-flash-message';

export const UsersScreen = React.memo(() => {
  const dispatch = useDispatch();
  const {safeArea, container} = styles;

  const {error, isLoading, isSuccess} = useSelector<
    AppRootStateType,
    InitialAppStateType
  >(state => state.appStore);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      showMessage({
        type: 'success',
        message: 'Success',
      });
    }
    dispatch(setSuccessAC(false));
  }, [dispatch, isSuccess]);

  return (
    <SafeAreaView style={safeArea}>
      <View style={container}>
        <Users />
        {isLoading ? (
          <ActivityIndicator color={CERULEAN_BLUE} size="large" />
        ) : null}
        {error ? <ErrorImage /> : null}
      </View>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
});
