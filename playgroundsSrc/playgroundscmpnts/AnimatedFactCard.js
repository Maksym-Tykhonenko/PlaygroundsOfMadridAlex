import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS } from '../playgroudsconstants/colors';

export const AnimatedFactCard = ({
  item,
  index,
  isVisible,
  delay = 200,
  style,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (isVisible) {
      const animationDelay = index * delay;
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
          }),
        ]).start();
      }, animationDelay);
    } else {
      fadeAnim.setValue(0);
      translateY.setValue(20);
    }
  }, [isVisible, index, delay, fadeAnim, translateY]);

  return (
    <Animated.View
      style={[
        styles.listItem,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <LinearGradient colors={COLORS} style={styles.borders}>
        <View style={styles.cardContainer}>
          <Image
            source={require('../assets/images/factLogo.png')}
            style={styles.image}
          />
          <Text style={[styles.description, style]}>{item}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontWeight: '700',
    fontSize: 15,
    color: '#FFF',
    width: '74%',
    top: 5,
  },
  borders: {
    marginBottom: 7,
    borderRadius: 14,
    width: '100%',

    shadowColor: 'rgba(11, 11, 11, 0.7)',
    shadowOffset: { width: 8, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 19,
    elevation: 15,
  },
  cardContainer: {
    padding: 10,
    backgroundColor: '#080809',
    margin: 1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listItem: { width: '100%' },
});
