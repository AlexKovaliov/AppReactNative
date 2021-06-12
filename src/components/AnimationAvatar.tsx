import React, {useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {SOLITUDE, WHITE} from '../utils/colors';

type AnimationPropsType = {
  avatar: string;
};

export const AnimationAvatar = (props: AnimationPropsType) => {
  const {touchImg} = styles;
  const animationValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(0);

  const runAnimationOnClick = () => {
    scaleValue.current = scaleValue.current === 0 ? 1 : 0;
    Animated.spring(animationValue, {
      toValue: scaleValue.current,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity style={touchImg} onPress={runAnimationOnClick}>
      <Animated.Image
        source={{uri: props.avatar}}
        style={{
          zIndex: 1,
          width: 150,
          height: 150,
          borderWidth: 3,
          borderRadius: 10,
          position: 'absolute',
          borderColor: SOLITUDE,
          backgroundColor: WHITE,
          transform: [
            {
              scale: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2],
              }),
            },
          ],
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchImg: {
    top: 70,
    zIndex: 1,
    width: 150,
    height: 150,
    borderRadius: 10,
    position: 'absolute',
  },
});
