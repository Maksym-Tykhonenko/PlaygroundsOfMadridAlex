import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RegularButton = ({
  onPress,
  title,
  image,
  style,
  textStyle,
  isDisabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={style}
      disabled={isDisabled}
    >
      <LinearGradient
        colors={['#FFD044', 'rgb(221, 167, 32)']}
        style={[styles.button]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 0 }}
      >
        <Image source={image} />
        <Text style={[styles.btnText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 107,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    gap: 11,
  },
  btnText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#272727',
  },
});

export default RegularButton;
