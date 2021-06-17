import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
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
import {RemoveUserModal} from '../RemoveUserModal';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {BACK_IMG, NO_AVATAR} from '../../utils/images';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PersonStateType} from '../../redux/person-reducer';
import {InitialAppStateType} from '../../redux/app-reducer';
import {InitialStateUserReducerType} from '../../redux/users-reducer';
import {BLACK, CERULEAN_BLUE, GREY, SOLITUDE, WHITE} from '../../utils/colors';
import {chosenPersonTC, refreshPersonTC} from '../../redux/thunk/person-thunks';

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

const Content = (props: {user: UsersType | undefined}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {avatar, first_name, last_name, email, id, local} = props.user || {};

  //Controlling the visibility of windows
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [openEditWindow, setOpenEditWindow] = useState<boolean>(false);
  const [openAvatarZoom, setOpenAvatarZoom] = useState<boolean>(false);

  //Buttons onPress handler
  const modalVisibleOpen = () => setModalVisible(true);
  const avatarZoom = () => setOpenAvatarZoom(!openAvatarZoom);
  const editWindowVisible = () => setOpenEditWindow(!openEditWindow);
  const onModalHandler = () => navigation.navigate('Modal', {user: props.user});

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
    image,
    emailSt,
    backImg,
    manageView,
    iconArea,
    detailsView,
    container,
    emailView,
    manageBtn,
    removeText,
    contentArea,
    touchableArea,
    touchAreaActive,
    touchImgZoom,
    touchImg,
    zoomImg,
  } = styles;

  const PersonAvatar = (
    <TouchableOpacity
      style={openAvatarZoom ? touchImgZoom : touchImg}
      onPress={avatarZoom}>
      <Image
        style={openAvatarZoom ? zoomImg : image}
        source={{
          uri: avatar || NO_AVATAR,
        }}
      />
    </TouchableOpacity>
  );

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
            {PersonAvatar}
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
                  <TouchableOpacity style={manageBtn} onPress={onModalHandler}>
                    <Text style={removeText}>Edit user</Text>
                    <Icon name="user-edit" size={25} color={CERULEAN_BLUE} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={manageBtn}
                    onPress={modalVisibleOpen}>
                    <Text style={removeText}>Remove user</Text>
                    <Icon name="user-minus" size={25} color={CERULEAN_BLUE} />
                  </TouchableOpacity>
                </View>
              ) : null}

              <Text style={text}>
                {first_name} {last_name}
              </Text>
              <View style={emailView}>
                <Icon name="envelope" size={25} color={GREY} />
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
  wrapImg: {
    top: 70,
    zIndex: 1,
    width: 150,
    height: 150,
    borderRadius: 10,
    shadowColor: BLACK,
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
  manageView: {
    top: 55,
    zIndex: 1,
    right: 10,
    position: 'absolute',
    flexDirection: 'column',
    shadowColor: BLACK,
    backgroundColor: CERULEAN_BLUE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
  },
  manageBtn: {
    borderWidth: 1,
    borderColor: WHITE,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: SOLITUDE,
    justifyContent: 'flex-end',
  },
  removeText: {
    fontSize: 18,
    paddingRight: 15,
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
  image: {
    zIndex: 1,
    width: 150,
    height: 150,
    borderWidth: 3,
    borderRadius: 10,
    position: 'absolute',
    borderColor: SOLITUDE,
    backgroundColor: WHITE,
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
    color: CERULEAN_BLUE,
  },
  emailSt: {
    fontSize: 16,
    paddingLeft: 10,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  contentArea: {
    height: 450,
    width: '100%',
    borderRadius: 20,
    backgroundColor: WHITE,
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
  zoomImg: {
    zIndex: 1,
    width: 250,
    height: 250,
    borderRadius: 10,
    position: 'absolute',
  },
  touchImgZoom: {
    top: 5,
    zIndex: 1,
    width: 250,
    height: 250,
    borderRadius: 10,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: SOLITUDE,
  },
  touchImg: {
    top: 70,
    zIndex: 1,
    width: 150,
    height: 150,
    borderRadius: 10,
    position: 'absolute',
  },
});
