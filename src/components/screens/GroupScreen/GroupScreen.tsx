import React from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {GroupType} from './ValidationGroup';
import {AppRootStateType} from '../../../store';
import {NO_AVATAR_GROUP} from '../../../utils/images';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {EGYPTIAN_BLUE, GREY, SOLITUDE} from '../../../utils/colors';
import {InitialStateGroupReducerType} from '../../../redux/group-reducer';

export const GroupScreen = React.memo(() => {
  const navigation = useNavigation();
  const {container, addGroupTouch} = styles;

  const {group} = useSelector<AppRootStateType, InitialStateGroupReducerType>(
    state => state.groupStore,
  );

  //Buttons onPress handler
  const handleAdGroup = () => navigation.navigate('CreateGroup');

  return (
    <SafeAreaView style={container}>
      <FlatList
        data={group}
        keyExtractor={(item: GroupType) => String(item.id)}
        renderItem={({item}) => <Group group={item} />}
      />
      <TouchableOpacity style={addGroupTouch} onPress={handleAdGroup}>
        <Icon name="plus" size={20} color={'#000'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
});

type PropsType = {
  group: GroupType;
};

const Group = (props: PropsType) => {
  const {viewGroup, img, text, goArrow} = styles;
  const {avatarGroup, title} = props.group;

  return (
    <View style={viewGroup}>
      <Image
        source={{
          uri: avatarGroup || NO_AVATAR_GROUP,
        }}
        style={img}
      />
      <Text style={text}>{title}</Text>
      <TouchableOpacity style={goArrow} onPress={() => {}}>
        <Icon name="chevron-right" size={20} color={'#000'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: EGYPTIAN_BLUE,
    justifyContent: 'space-around',
  },
  addGroupTouch: {
    right: 20,
    width: 55,
    height: 55,
    bottom: 25,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREY,
  },
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
});
