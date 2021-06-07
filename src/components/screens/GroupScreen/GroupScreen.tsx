import React, {useEffect} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {Group} from './Group';
import {AppRootStateType} from '../../../store';
import {UsersType} from '../../../api/users-api';
import {NO_MEMBERS} from '../../../utils/images';
import {EGYPTIAN_BLUE} from '../../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {getGroupUsersTC} from '../../../redux/thunk/users-thunks';
import {InitialStateUserReducerType} from '../../../redux/users-reducer';

export const GroupScreen = React.memo(() => {
  const {groupUsers} = useSelector<
    AppRootStateType,
    InitialStateUserReducerType
  >(state => state.usersStore);

  const dispatch = useDispatch();
  const {container, textNoGroup, imageBack} = styles;

  useEffect(() => {
    dispatch(getGroupUsersTC());
  }, [dispatch]);

  //Checking if the user is in the group
  const isGroupUser = groupUsers.some(user => user.id);

  return (
    <SafeAreaView style={isGroupUser ? container : null}>
      {!isGroupUser ? (
        <ImageBackground style={imageBack} source={NO_MEMBERS}>
          <Text style={textNoGroup}>There are no members in this group</Text>
        </ImageBackground>
      ) : (
        <FlatList
          data={groupUsers}
          keyExtractor={(item: UsersType) => String(item.id)}
          renderItem={({item}) => <Group groupUser={item} />}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: EGYPTIAN_BLUE,
  },
  textNoGroup: {
    width: 230,
    fontSize: 30,
    marginTop: 10,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  imageBack: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
    alignItems: 'flex-end',
  },
});
