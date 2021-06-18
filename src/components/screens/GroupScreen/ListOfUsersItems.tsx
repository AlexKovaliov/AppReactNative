import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {NO_AVATAR} from '../../../utils/images';
import {UsersType} from '../../../api/users-api';
import {GroupType} from './CreateGroup/ValidationGroup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GREY, GREEN, BONDI_BLUE, BLACK} from '../../../utils/colors';
import {removeUserFromGroupTC} from '../../../redux/thunks/group-thunk';

export type PropsType = {
  group: GroupType;
  user: UsersType;
  selectUserHandler: (id: number) => void;
  removeSelectUserHandler: (id: number) => void;
};

export const ListOfUsersItems = (props: PropsType) => {
  const dispatch = useDispatch();

  const {avatar, first_name, last_name, id} = props.user;
  const {img, containerView, contentView} = styles;

  //Follows user selected or not.
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
  const onRemoveMember = () =>
    dispatch(removeUserFromGroupTC(id, props.group.id));

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
          <Icon
            onPress={isCheckBoxSelected}
            name="check-square"
            size={25}
            color={GREEN}
          />
        ) : (
          <Icon
            onPress={isCheckBoxSelected}
            name="square"
            size={25}
            color={BONDI_BLUE}
          />
        )
      ) : (
        <Icon
          onPress={onRemoveMember}
          name="minus-square"
          size={25}
          color={GREY}
        />
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
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: BLACK,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
