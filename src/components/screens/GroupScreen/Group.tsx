import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupType} from './CreateGroup/ValidationGroup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {EGYPTIAN_BLUE, GREY, WHITE} from '../../../utils/colors';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {GroupUsers} from './GroupUsers';
import {AppRootStateType} from '../../../store';
import {UsersType} from '../../../api/users-api';
import {CREATE_GROUP_BACK} from '../../../utils/images';
import {InitialStateGroupReducerType} from '../../../redux/group-reducer';

type routeType = {route: {params: {group: GroupType}}};

export const Group = ({route}: routeType) => {
  const navigation = useNavigation();
  const {id} = route.params.group;

  const {container, touch, imgBack, titleGroup} = styles;

  const {groups} = useSelector<AppRootStateType, InitialStateGroupReducerType>(
    state => state.groupStore,
  );

  const filteredGroup = groups.find(gr => gr.id === id);
  if (!filteredGroup) {
    navigation.goBack();
    return null;
  }
  const {members, avatarGroup, title} = filteredGroup;

  //Buttons onPress handler
  const onList = () =>
    navigation.navigate('ListUsers', {group: route.params.group});
  const onEditHandler = () =>
    navigation.navigate('CreateGroup', {group: route.params.group});

  return (
    <SafeAreaView style={container}>
      <View>
        <ImageBackground
          style={imgBack}
          source={{uri: avatarGroup || CREATE_GROUP_BACK}}>
          <Text onPress={onEditHandler} style={titleGroup}>
            {title}
          </Text>
          <TouchableOpacity style={touch} onPress={onList}>
            <Icon name="user-plus" size={20} color={GREY} />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <FlatList
        data={members}
        keyExtractor={(item: UsersType) => String(item.id)}
        renderItem={({item}) => <GroupUsers groupId={id} groupUser={item} />}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EGYPTIAN_BLUE,
  },
  touch: {
    position: 'absolute',
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  imgBack: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleGroup: {
    fontSize: 30,
    marginLeft: 30,
    fontStyle: 'italic',
  },
});
