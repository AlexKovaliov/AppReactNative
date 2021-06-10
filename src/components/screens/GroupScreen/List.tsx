import React, {useState} from 'react';
import {NO_AVATAR} from '../../../utils/images';
import {UsersType} from '../../../api/users-api';
import {GroupType} from './CreateGroup/ValidationGroup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export type PropsType = {
  group: GroupType;
  user: UsersType;
  selectUserHandler: (id: number) => void;
  removeSelectUserHandler: (id: number) => void;
};

export const List = (props: PropsType) => {
  const {avatar, first_name, last_name, id} = props.user;
  const {img, containerView, contentView, checkbox} = styles;
  const [isSelected, setSelection] = useState(false);

  //Buttons onPress handler
  const isCheckBoxSelected = () => {
    if (!isSelected) {
      setSelection(!isSelected);
      props.selectUserHandler(id);
    } else {
      setSelection(!isSelected);
      props.removeSelectUserHandler(id);
    }
  };

  //Checking if the user is in the group
  const isAddedMembers = props.group.members.every(user => user.id !== id);

  return (
    <View style={containerView}>
      <View style={contentView}>
        <Image source={{uri: avatar || NO_AVATAR}} style={img} />
        <Text>
          {first_name}
          {last_name}
        </Text>
      </View>
      {isAddedMembers ? (
        isSelected ? (
          <TouchableOpacity style={checkbox} onPress={isCheckBoxSelected}>
            <Icon name="check" size={20} color={'green'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={checkbox} onPress={isCheckBoxSelected} />
        )
      ) : (
        <Icon name="check" size={20} color={'blue'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  containerView: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 25,
    backgroundColor: 'pink',
  },
});
