import React, {useEffect} from 'react';
import {Button, StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {UsersType} from '../../api/users-api';
import {Users} from '../Users';
import {getUsersTC} from '../../reducers/thunks';
import {ErrorImage} from '../../utils/errorUtils';
import Loading from '../../utils/loadingUtils';
import {InitialPersonStateType} from '../../reducers/app-reducer';
import {useNavigation} from '@react-navigation/native';

export type NewUserType = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  avatar: string;
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
  /*const [newUsers, setNewUsers] = useState<Array<NewUserType>>([]);
  const newMappedUsers = [...newUsers, ...users];
  const addReview = (newUser: NewUserType) => {
    newUser.id = Math.random().toString();
    setNewUsers(currentReviews => {
      return [newUser, ...currentReviews];
    });
  };*/
  const navigation = useNavigation();
  const onModal = () => navigation.navigate('Modal');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? <Loading /> : null}
        <Users users={users} />
        <View style={styles.button}>
          <Button onPress={onModal} title={'Add User'} />
          {/*<ModalAddUser
            addReview={addReview}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />*/}
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
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
