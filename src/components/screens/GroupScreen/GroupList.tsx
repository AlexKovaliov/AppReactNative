import React, {useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Vibration,
  TouchableOpacity,
} from 'react-native';
import {RemoveGroupModal} from './RemoveGroupModal';
import {NO_AVATAR_GROUP} from '../../../utils/images';
import {useNavigation} from '@react-navigation/native';
import {GroupType} from './CreateGroup/ValidationGroup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLACK, GREY, SOLITUDE} from '../../../utils/colors';

type PropsType = {
  group: GroupType;
};

export const GroupList = (props: PropsType) => {
  const navigation = useNavigation();
  const {avatarGroup, title, id} = props.group;
  const {viewGroup, img, text, icon} = styles;

  //Displaying a modal window
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  //Buttons onPress handler
  const onGroup = () => navigation.navigate('Group', {group: props.group});
  const modalVisibleOpen = () => {
    Vibration.vibrate();
    setModalVisible(true);
  };

  return (
    <TouchableOpacity
      style={viewGroup}
      onPress={onGroup}
      onLongPress={modalVisibleOpen}>
      {modalVisible ? (
        <RemoveGroupModal
          id={id}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
      <Image
        source={{
          uri: avatarGroup || NO_AVATAR_GROUP,
        }}
        style={img}
      />
      <Text style={text}>{title}</Text>
      <Icon name="chevron-right" style={icon} size={20} color={'#000'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewGroup: {
    height: 70,
    borderBottomWidth: 1,
    borderColor: BLACK,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: SOLITUDE,
    justifyContent: 'space-between',
  },
  img: {
    width: 60,
    height: 60,
    marginLeft: 10,
    borderRadius: 50,
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
  icon: {
    paddingRight: 10,
  },
});
