import React, {useCallback, useState} from 'react';
import {List} from './List';
import {AppRootStateType} from '../../../store';
import {UsersType} from '../../../api/users-api';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, View, Button} from 'react-native';
import {setUserGroupTC} from '../../../redux/thunks/group-thunk';
import {InitialStateUserReducerType} from '../../../redux/users-reducer';
import {GroupType} from './CreateGroup/ValidationGroup';
import {InitialStateGroupReducerType} from '../../../redux/group-reducer';

type routeIdGroupType = {route: {params: {group: GroupType}}};

export const ListOfUsers = ({route}: routeIdGroupType) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {container, btn} = styles;
  const idGroup = route.params.group.id;
  const [selectedUsersId, setSelectedUsersId] = useState<Array<number>>([]);

  const {users} = useSelector<AppRootStateType, InitialStateUserReducerType>(
    state => state.usersStore,
  );

  const {groups} = useSelector<AppRootStateType, InitialStateGroupReducerType>(
    state => state.groupStore,
  );

  const group = groups.find(el => el.id === idGroup);

  //Buttons onPress handler
  const selectUserHandler = useCallback(
    (id: number) => {
      setSelectedUsersId([id, ...selectedUsersId]);
    },
    [selectedUsersId],
  );
  const removeSelectUserHandler = useCallback(
    (id: number) => {
      setSelectedUsersId(selectedUsersId.filter(el => el !== id));
    },
    [selectedUsersId],
  );

  const addUsers = () => {
    if (selectedUsersId) {
      dispatch(setUserGroupTC(selectedUsersId, idGroup));
      navigation.goBack();
    }
  };

  const disabledBtn = selectedUsersId.length === 0;

  return (
    <View style={container}>
      <FlatList
        data={users}
        keyExtractor={(item: UsersType) => String(item.id)}
        renderItem={({item}) => (
          <List
            group={group!}
            user={item}
            selectUserHandler={selectUserHandler}
            removeSelectUserHandler={removeSelectUserHandler}
          />
        )}
      />
      <View style={btn}>
        <Button title={'Add'} disabled={disabledBtn} onPress={addUsers} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 55,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  btn: {
    marginVertical: 10,
  },
});
