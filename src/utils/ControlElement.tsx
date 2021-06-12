import React from 'react';
import {CERULEAN_BLUE, SOLITUDE, WHITE} from './colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type ControlElementProps = {
  onModalHandler?: () => void;
  modalVisibleOpen?: () => void;
  textTitle: string;
  iconName: string;
};

export const ControlElement = (props: ControlElementProps) => {
  const {touch, text} = styles;
  const {onModalHandler, textTitle, iconName, modalVisibleOpen} = props;

  return (
    <TouchableOpacity
      style={touch}
      onPress={onModalHandler || modalVisibleOpen}>
      <Text style={text}>{textTitle}</Text>
      <Icon name={iconName} size={25} color={CERULEAN_BLUE} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    borderWidth: 1,
    borderColor: WHITE,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: SOLITUDE,
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 18,
    paddingRight: 15,
  },
});
