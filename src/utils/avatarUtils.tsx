import {Image, StyleSheet} from 'react-native';
import React from 'react';

export const Avatar = React.memo((props: {avatar: string}) => (
  <Image
    style={styles.image}
    source={{
      uri:
        props.avatar ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFe6oKnt1B1FMzZEeMgRWWrsBiqeSRGaCLdA&usqp=CAU',
    }}
  />
));

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    height: 50,
    width: 50,
  },
});
