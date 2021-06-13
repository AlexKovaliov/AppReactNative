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
  const onEditHandler = () =>
    navigation.navigate('CreateGroup', {group: props.group});
  const onGroup = () => navigation.navigate('Group', {group: props.group});
  const modalVisibleOpen = () => {
    Vibration.vibrate();
    setModalVisible(true);
  };

  const randomColor =
    'rgb(' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ')';

  return (
    <Swipeout
      autoClose={true}
      close={modalVisible}
      left={[{onPress: onEditHandler, type: 'secondary', text: 'Edit'}]}
      right={[{onPress: modalVisibleOpen, type: 'delete', text: 'Delete'}]}>
      <TouchableOpacity style={viewGroup} onPress={onGroup}>
        {modalVisible ? (
          <RemoveGroupModal
            id={id}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        ) : null}

        {avatarGroup ? (
          <Image
            source={{
              uri: avatarGroup,
            }}
            style={img}
          />
        ) : (
          <View
            style={{backgroundColor: randomColor, height: '100%', width: 70}}
          />
        )}

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
    borderBottomWidth: 0.5,
    borderColor: BLACK,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: SOLITUDE,
    justifyContent: 'space-between',
  },
  img: {
    height: '100%',
    width: 70,
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
