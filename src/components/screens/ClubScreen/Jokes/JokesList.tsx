import React from 'react';
import {JokesType} from '../../../../api/jokes-api';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLACK, GREY, TEAL} from '../../../../utils/colors';

type JokesListType = {
  joke: JokesType;
};

export const JokesList = (props: JokesListType) => {
  const {type, punchline, setup, id} = props.joke;
  const {
    view,
    textType,
    typeView,
    iconView,
    jokesView,
    textSetup,
    contentView,
    textPunchline,
  } = styles;

  return (
    <View style={view}>
      <View style={typeView}>
        <Text style={textType}>{type}</Text>
      </View>

      <View style={jokesView}>
        <View style={iconView}>
          <Icon name="comments" size={20} color={TEAL} />
          <Text>{id.toString()}</Text>
        </View>

        <View style={contentView}>
          <Text style={textSetup}>{setup}</Text>
          <Text style={textPunchline}>{punchline}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingBottom: 5,
    borderColor: BLACK,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  typeView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textSetup: {
    color: BLACK,
    fontStyle: 'italic',
  },
  textType: {
    color: GREY,
    fontSize: 12,
  },
  textPunchline: {
    marginTop: 7,
    color: BLACK,
    fontStyle: 'italic',
  },
  jokesView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  contentView: {
    paddingHorizontal: 10,
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
