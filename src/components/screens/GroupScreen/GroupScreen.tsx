import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {GroupList} from './GroupList';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../store';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLACK, EGYPTIAN_BLUE, GREY} from '../../../utils/colors';
import {InitialStateGroupReducerType} from '../../../redux/group-reducer';
import {getGroupTC, removeGroupTC} from '../../../redux/thunks/group-thunk';
import {SwipeListView} from 'react-native-swipe-list-view';

export const GroupScreen = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    text,
    rowEdit,
    container,
    rowDelete,
    backBtnView,
    addGroupTouch,
  } = styles;

  useEffect(() => {
    dispatch(getGroupTC());
  }, [dispatch]);

  const {groups} = useSelector<AppRootStateType, InitialStateGroupReducerType>(
    state => state.groupStore,
  );

  //Buttons onPress handler
  const handleAdGroup = () => navigation.navigate('CreateGroup');

  return (
    <SafeAreaView style={container}>
      <SwipeListView
        data={groups}
        renderItem={data => <GroupList id={data.item.id} />}
        renderHiddenItem={data => (
          <View style={backBtnView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateGroup', {group: data.item})
              }
              style={rowEdit}>
              <Icon name="edit" size={20} color={'#fff'} />
              <Text style={text}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => dispatch(removeGroupTC(data.item.id))}
              style={rowDelete}>
              <Icon name="trash" size={20} color={'#fff'} />
              <Text style={text}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />

      <TouchableOpacity style={addGroupTouch} onPress={handleAdGroup}>
        <Icon name="plus" size={20} color={'#000'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
  rowEdit: {
    width: 75,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  backBtnView: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: BLACK,
  },
  rowDelete: {
    width: 75,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: '#fff',
  },
});
