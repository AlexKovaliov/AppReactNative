import React from 'react';
import {NO_AVATAR} from './images';
import {Image, StyleSheet} from 'react-native';

export const Avatar = (props: {avatar: string; local?: boolean}) => (
  <Image
    style={styles.image}
    source={{
      uri: props.avatar || NO_AVATAR,
    }}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
