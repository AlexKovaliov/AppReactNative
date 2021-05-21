import React from 'react';
import {noAvatar} from './images';
import {Image, StyleSheet} from 'react-native';

export const Avatar = (props: {avatar: string}) => (
  <Image
    style={styles.image}
    source={{
      uri: props.avatar || noAvatar,
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
