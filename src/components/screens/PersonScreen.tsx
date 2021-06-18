import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {AppRootStateType} from '../../store';
import {UsersType} from '../../api/users-api';
import Loading from '../../utils/loadingUtils';
import {ErrorImage} from '../../utils/errorUtils';
import {AnimationAvatar} from '../AnimationAvatar';
import {RemoveUserModal} from '../RemoveUserModal';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {BACK_IMG, NO_AVATAR} from '../../utils/images';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ControlElement} from '../../utils/ControlElement';
import {PersonStateType} from '../../redux/person-reducer';
import {InitialAppStateType} from '../../redux/app-reducer';
import {InitialStateUserReducerType} from '../../redux/users-reducer';
import {
  GREY,
  BLACK,
  WHITE,
  SOLITUDE,
  IRIS_BLUE,
  VIVID_VIOLET,
} from '../../utils/colors';
import {
  chosenPersonTC,
  refreshPersonTC,
} from '../../redux/thunks/person-thunks';

type routeType = {route: {params: {user: UsersType}}};

export const PersonScreen = ({route}: routeType) => {
  const dispatch = useDispatch();

  const propsUser = route.params.user;
  const {local} = route.params.user;

  useEffect(() => {
    if (!local) {
      dispatch(chosenPersonTC(propsUser.id));
    }
  }, [dispatch, local, propsUser.id]);

  const {person} = useSelector<AppRootStateType, PersonStateType>(
    state => state.personStore,
  );
  const {isLoading} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );

  let user = person;

  if (local) {
    user = propsUser;
  }

  if (isLoading || propsUser.id !== user?.id) {
    return <Loading />;
  }

  return <Content user={user} />;
};

//Content of Person Screen
const Content = (props: {user: UsersType | undefined}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {avatar, first_name, last_name, email, id, local} = props.user || {};

  //Controlling the visibility of windows
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [openEditWindow, setOpenEditWindow] = useState<boolean>(false);

  //Buttons onPress handler
  const onModalHandler = () =>
    navigation.navigate('Management', {user: props.user});
  const modalVisibleOpen = () => setModalVisible(true);
  const editWindowVisible = () => setOpenEditWindow(!openEditWindow);

  const onRefreshHandler = useCallback(() => {
    if (!local && id) {
      dispatch(refreshPersonTC(id));
    }
  }, [dispatch, id, local]);

  const {error, isLoading} = useSelector<AppRootStateType, InitialAppStateType>(
    state => state.appStore,
  );
  const {isRefreshing} = useSelector<
    AppRootStateType,
    InitialStateUserReducerType
  >(state => state.usersStore);

  const {
    wrap,
    text,
    emailSt,
    backImg,
    iconArea,
    container,
    emailView,
    manageView,
    contentArea,
    detailsView,
    touchableArea,
    touchAreaActive,
  } = styles;

  return (
    <SafeAreaView style={container}>
      {isLoading ? <Loading /> : null}
      {error ? (
        <ErrorImage />
      ) : (
        <ScrollView
          style={wrap}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefreshHandler}
            />
          }>
          {modalVisible ? (
            <RemoveUserModal
              id={id || 0}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          ) : null}
          <ImageBackground source={BACK_IMG} style={backImg}>
            <AnimationAvatar avatar={avatar ? avatar : NO_AVATAR} />
          </ImageBackground>
          <View style={detailsView}>
            <View style={contentArea}>
              {local ? (
                <View style={iconArea}>
                  <TouchableOpacity
                    style={openEditWindow ? touchAreaActive : touchableArea}
                    onPress={editWindowVisible}>
                    <Icon
                      name="ellipsis-v"
                      size={openEditWindow ? 20 : 25}
                      color={openEditWindow ? GREY : BLACK}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}

              {openEditWindow ? (
                <View style={manageView}>
                  <ControlElement
                    onModalHandler={onModalHandler}
                    textTitle={'Edit user'}
                    iconName={'user-edit'}
                  />

                  <ControlElement
                    modalVisibleOpen={modalVisibleOpen}
                    textTitle={'Remove user'}
                    iconName={'user-minus'}
                  />
                </View>
              ) : null}

              <Text style={text}>
                {first_name} {last_name}
              </Text>
              <View style={emailView}>
                <Icon name="envelope" size={25} color={VIVID_VIOLET} />
                <Text style={emailSt}>{email}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SOLITUDE,
  },
  wrap: {
    flex: 1,
  },
  backImg: {
    height: 150,
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageView: {
    top: 55,
    zIndex: 1,
    right: 10,
    position: 'absolute',
    flexDirection: 'column',
    shadowColor: BLACK,
    backgroundColor: IRIS_BLUE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
  touchableArea: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchAreaActive: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: SOLITUDE,
  },
  iconArea: {
    width: '100%',
    paddingTop: 10,
    paddingRight: 5,
    alignItems: 'flex-end',
  },
  emailView: {
    paddingLeft: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    marginTop: 80,
    paddingBottom: 10,
    borderColor: BLACK,
    textAlign: 'center',
    fontStyle: 'italic',
    borderBottomWidth: 1,
    marginHorizontal: 30,
    color: IRIS_BLUE,
  },
  emailSt: {
    fontSize: 16,
    paddingLeft: 10,
  },
  contentArea: {
    height: 450,
    width: '100%',
    borderRadius: 20,
    backgroundColor: WHITE,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
  detailsView: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    paddingVertical: 20,
    position: 'relative',
    paddingHorizontal: 20,
    backgroundColor: SOLITUDE,
  },
});
