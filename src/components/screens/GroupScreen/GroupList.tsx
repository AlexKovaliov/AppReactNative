import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Vibration,
  TouchableOpacity,
} from 'react-native';
import {GroupType} from './ValidationGroup';
import {RemoveGroupModal} from './RemoveGroupModal';
import {GREY, SOLITUDE} from '../../../utils/colors';
import {NO_AVATAR_GROUP} from '../../../utils/images';
import Icon from 'react-native-vector-icons/FontAwesome5';

type PropsType = {
  group: GroupType;
};

export const GroupList = (props: PropsType) => {
  const {avatarGroup, title, id} = props.group;
  const {viewGroup, img, text, goArrow, removeTouch} = styles;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  //Buttons onPress handler
  const modalVisibleOpen = () => {
    Vibration.vibrate();
    setModalVisible(true);
  };

  return (
    <View style={viewGroup}>
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
      <TouchableOpacity style={removeTouch} onLongPress={modalVisibleOpen}>
        <Text style={text}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={goArrow} onPress={() => {}}>
        <Icon name="chevron-right" size={20} color={'#000'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewGroup: {
    height: 70,
    borderRadius: 5,
    marginVertical: 5,
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
});
