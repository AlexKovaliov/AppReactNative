import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupType} from './CreateGroup/ValidationGroup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  GREY,
  BLACK,
  WHITE,
  SOLITUDE,
  VIVID_VIOLET,
} from '../../../utils/colors';

type PropsType = {
  group: GroupType;
};

export const GroupList = (props: PropsType) => {
  const navigation = useNavigation();

  const {title, avatarGroup, members} = props.group;

  const {
    img,
    text,
    viewIcon,
    viewGroup,
    amountMembers,
    defaultImgText,
  } = styles;

  const amountOfGroupMembers = members.length;

  //Buttons onPress handler
  const onGroup = () => navigation.navigate('Group', {group: props.group});

  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} style={viewGroup} onPress={onGroup}>
        {avatarGroup ? (
          <Image source={{uri: avatarGroup}} style={img} />
        ) : (
          <Text style={defaultImgText}>{title[0]}</Text>
        )}

        <Text style={text}>{title}</Text>
        <View style={viewIcon}>
          <Text style={amountMembers}>{amountOfGroupMembers}</Text>
          <Icon name="users" size={20} color={BLACK} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewGroup: {
    height: 70,
    borderColor: BLACK,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    backgroundColor: SOLITUDE,
    justifyContent: 'space-between',
  },
  img: {
    width: 70,
    height: '100%',
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  goArrow: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    backgroundColor: GREY,
    justifyContent: 'center',
  },
  removeTouch: {
    width: 150,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountMembers: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewIcon: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: '100%',
    width: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  defaultImgText: {
    width: 70,
    fontSize: 20,
    color: WHITE,
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: VIVID_VIOLET,
  },
});
