import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppBackground from '../playgroundscmpnts/AppBackground';
import MediumButton from '../playgroundscmpnts/MediumButton';
import Header from '../playgroundscmpnts/Header';

const { height } = Dimensions.get('window');

const handleShare = async () => {
  try {
    await Share.share({
      message: `This is a guide to sporty Madrid with a map, photos, facts and
saved places. Created for those who want to explore the city
through sports.`,
    });
  } catch (error) {
    Alert(error.message);
  }
};

const Info = () => {
  return (
    <AppBackground>
      <ScrollView>
        <View style={styles.container}>
          <Header title={'Info'} />

          <View style={{ alignItems: 'center', marginTop: 67 }}>
            <Image source={require('../assets/images/info.png')} />
            <Text style={styles.description}>
              This is a guide to sporty Madrid with a map, photos, facts and
              saved places. Created for those who want to explore the city
              through sports.
            </Text>
            <MediumButton
              title={'SHARE'}
              style={styles.button}
              textStyle={styles.btnText}
              onPress={handleShare}
            />
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.072 },
  buttonsWrap: {
    flexDirection: 'row',
    gap: 10,
  },
  button: { width: 193, marginBottom: 30 },
  btnText: {
    fontWeight: '700',
    fontSize: 15,
  },
  description: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 64,
    marginVertical: 25,
  },
});

export default Info;
