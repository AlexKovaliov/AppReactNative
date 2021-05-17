import React from 'react';
import {Image, StyleSheet} from 'react-native';

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
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
