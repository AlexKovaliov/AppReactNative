import React, {useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Vibration,
  TouchableOpacity,
  View,
} from 'react-native';
import {RemoveGroupModal} from './RemoveGroupModal';
import {NO_AVATAR_GROUP} from '../../../utils/images';
import {useNavigation} from '@react-navigation/native';
import {GroupType} from './CreateGroup/ValidationGroup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLACK, GREY, SOLITUDE} from '../../../utils/colors';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../store';
import {InitialStateGroupReducerType} from '../../../redux/group-reducer';
import Swipeout from 'react-native-swipeout';

type PropsType = {
  group: GroupType;
};

export const GroupList = (props: PropsType) => {
  const navigation = useNavigation();
  const {id} = props.group;
  const {viewGroup, img, text, amountMembers, viewIcon} = styles;

  const {groups} = useSelector<AppRootStateType, InitialStateGroupReducerType>(
    state => state.groupStore,
  );
  const filteredGroup = groups.find(gr => gr.id === id);
  const {avatarGroup, title} = filteredGroup!;
  const amountOfGroupMembers = filteredGroup!.members.length;

  //Displaying a modal window
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  //Buttons onPress handler
  const onGroup = () => navigation.navigate('Group', {group: props.group});
  const modalVisibleOpen = () => {
    Vibration.vibrate();
    setModalVisible(true);
  };

  return (
    <Swipeout
      autoClose={true}
      close={modalVisible}
      right={[{onPress: modalVisibleOpen, type: 'delete', text: 'Delete'}]}>
      <TouchableOpacity style={viewGroup} onPress={onGroup}>
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
        <View style={viewIcon}>
          <Text style={amountMembers}>{amountOfGroupMembers}</Text>
          <Icon name="users" size={20} color={'#000'} />
        </View>
      </TouchableOpacity>
    </Swipeout>
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
});
