import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {UsersType} from '../../api/users-api';
import {Users} from '../Users';
import {getUsersTC} from '../../reducers/thunks';
import {ErrorImage} from '../../utils/errorUtils';
import Loading from '../../utils/loadingUtils';
import {InitialPersonStateType} from '../../reducers/app-reducer';
import {ModalAddUser} from '../Modal';

export type NewUserType = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  avatar: string | null;
};

export const UsersScreen = React.memo(() => {
  const dispatch = useDispatch();
  const users = useSelector<AppRootStateType, Array<UsersType>>(
    state => state.usersStore.users,
  );
  const {error, isLoading} = useSelector<
    AppRootStateType,
    InitialPersonStateType
  >(state => state.appStore);

  useEffect(() => {
    dispatch(getUsersTC(1));
  }, [dispatch]);
  const [newUsers, setNewUsers] = useState<Array<NewUserType>>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const newMappedUsers = [...newUsers, ...users];

  const addReview = (newUser: NewUserType) => {
    newUser.id = Math.random().toString();
    setNewUsers(currentReviews => {
      return [newUser, ...currentReviews];
    });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? <Loading /> : null}
        <Users newMappedUsers={newMappedUsers} />
        <View style={styles.button}>
          <Button
            disabled={modalVisible}
            onPress={() => setModalVisible(!modalVisible)}
            title={'Add User'}
          />
          <ModalAddUser
            addReview={addReview}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
        {error ? <ErrorImage /> : null}
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  button: {
    paddingHorizontal: 10,
  },
});
