import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const COLORS = ['#FFD044', 'rgb(221, 167, 32)'];

const Header = ({ title, style }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
        <LinearGradient
          colors={COLORS}
          style={styles.backBtn}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.9, y: 0 }}
        >
          <Image source={require('../assets/icons/back.png')} />
        </LinearGradient>
      </TouchableOpacity>

      <LinearGradient
        colors={COLORS}
        style={[styles.titleContainer, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 0 }}
      >
        <Text style={styles.headerTitle}>{title}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsWrap: {
    flexDirection: 'row',
    gap: 10,
  },
  button: { width: 193 },
  btnText: {
    fontWeight: '700',
    fontSize: 15,
  },
  header: { flexDirection: 'row', gap: 7, marginHorizontal: 57 },
  backBtn: {
    width: 76,
    height: 76,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    width: '50%',
    height: 76,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#272727',
    paddingHorizontal: 17,
  },
});

export default Header;
