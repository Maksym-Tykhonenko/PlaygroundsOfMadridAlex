import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MediumButton = ({ onPress, title, style, textStyle, icon }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        colors={['#FFD044', 'rgb(221, 167, 32)']}
        style={[styles.button, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {icon && <Image source={require('../assets/icons/add.png')} />}
        <Text style={[styles.btnText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 185,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  btnText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#272727',
  },
});

export default MediumButton;
