import React, {useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  setSuccessAC,
  setSearchBarValueAC,
} from '../../../redux/actions/app-actions';
import {GroupList} from './GroupList';
import {AppRootStateType} from '../../../store';
import Loading from '../../../utils/loadingUtils';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SwipeListView} from 'react-native-swipe-list-view';
import {InitialAppStateType} from '../../../redux/app-reducer';
import {BLACK, TEAL, IRIS_BLUE, WHITE} from '../../../utils/colors';
import {InitialStateGroupReducerType} from '../../../redux/group-reducer';
import {getGroupTC, removeGroupTC} from '../../../redux/thunks/group-thunk';

export const GroupScreen = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    text,
    input,
    rowEdit,
    container,
    rowDelete,
    backBtnView,
    addGroupTouch,
  } = styles;

  const {filterValue, isLoading, isSuccess} = useSelector<
    AppRootStateType,
    InitialAppStateType
  >(state => state.appStore);

  const {groups} = useSelector<AppRootStateType, InitialStateGroupReducerType>(
    state => state.groupStore,
  );

  useEffect(() => {
    dispatch(getGroupTC());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      showMessage({
        type: 'success',
        message: 'Success',
      });
    }
    dispatch(setSuccessAC(false));
  }, [dispatch, isSuccess]);

  //Buttons onPress handler
  const handleAdGroup = () => navigation.navigate('CreateGroup');

  const onSearchHandle = (value: string) =>
    dispatch(setSearchBarValueAC(value));

  const filteredGroup = groups.filter(group =>
    group.title.toLowerCase().includes(filterValue.toLowerCase()),
  );

  const groupsData = filterValue ? filteredGroup : groups;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={container}>
      <TextInput
        placeholder="Search..."
        style={input}
        onChangeText={onSearchHandle}
        placeholderTextColor={'#fff'}
      />

      <SwipeListView
        data={groupsData}
        renderItem={data => <GroupList group={data.item} />}
        renderHiddenItem={data => (
          <View style={backBtnView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateGroup', {group: data.item})
              }
              style={rowEdit}>
              <Icon name="edit" size={20} color={WHITE} />
              <Text style={text}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => dispatch(removeGroupTC(data.item.id))}
              style={rowDelete}>
              <Icon name="trash" size={20} color={WHITE} />
              <Text style={text}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
      <TouchableOpacity style={addGroupTouch} onPress={handleAdGroup}>
        <Icon name="plus" size={20} color={WHITE} />
      </TouchableOpacity>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TEAL,
    flexDirection: 'column',
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
    backgroundColor: IRIS_BLUE,
  },
  rowEdit: {
    width: 75,
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'orange',
    justifyContent: 'space-around',
  },
  backBtnView: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: BLACK,
    borderBottomWidth: 0.5,
  },
  rowDelete: {
    width: 75,
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'space-around',
  },
  text: {
    color: WHITE,
  },
  input: {
    color: WHITE,
    paddingLeft: 10,
    borderColor: WHITE,
    borderBottomWidth: 1,
  },
  toast: {
    zIndex: 1,
  },
});
