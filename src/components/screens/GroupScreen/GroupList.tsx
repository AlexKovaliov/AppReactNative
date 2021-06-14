import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLACK, GREY, SOLITUDE} from '../../../utils/colors';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../store';
import {InitialStateGroupReducerType} from '../../../redux/group-reducer';
import {CREATE_GROUP_BACK} from '../../../utils/images';

type PropsType = {
  id: number;
};

export const GroupList = (props: PropsType) => {
  const {id} = props;
  const navigation = useNavigation();
  const {viewGroup, img, text, amountMembers, viewIcon} = styles;

  const {groups} = useSelector<AppRootStateType, InitialStateGroupReducerType>(
    state => state.groupStore,
  );
  const filteredGroup = groups.find(gr => gr.id === id);
  const {avatarGroup, title} = filteredGroup!;
  const amountOfGroupMembers = filteredGroup!.members.length;

  //Buttons onPress handler
  const onGroup = () => navigation.navigate('Group', {group: filteredGroup});

  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} style={viewGroup} onPress={onGroup}>
        <Image
          source={{
            uri: avatarGroup ? avatarGroup : CREATE_GROUP_BACK,
          }}
          style={img}
        />

        <Text style={text}>{title}</Text>
        <View style={viewIcon}>
          <Text style={amountMembers}>{amountOfGroupMembers}</Text>
          <Icon name="users" size={20} color={'#000'} />
        </View>
      </TouchableOpacity>
    </View>
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
});
