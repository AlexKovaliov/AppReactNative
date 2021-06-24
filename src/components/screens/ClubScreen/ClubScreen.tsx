import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BLACK, GREY, TEAL, VIVID_VIOLET} from '../../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const ClubScreen = () => {
  const navigation = useNavigation();

  const {touch, iconPadding, textItem, viewItem} = styles;

  const onTouchHandler = () => navigation.navigate('Jokes');

  return (
    <SafeAreaView>
      <TouchableOpacity style={touch} onPress={onTouchHandler}>
        <View style={viewItem}>
          <Icon
            size={25}
            name="bookmark"
            style={iconPadding}
            color={VIVID_VIOLET}
          />
          <Icon name="laugh-squint" size={25} color={TEAL} />
          <Text style={textItem}>Jokes</Text>
        </View>
        <Icon name="chevron-right" size={25} color={TEAL} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  touch: {
    borderColor: GREY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
  textItem: {
    color: BLACK,
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  viewItem: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPadding: {
    paddingRight: 10,
  },
});
