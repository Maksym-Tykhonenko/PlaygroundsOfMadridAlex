import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import AppBackground from '../playgroundscmpnts/AppBackground';

import { AnimatedFactCard } from '../playgroundscmpnts/AnimatedFactCard';
import MediumButton from '../playgroundscmpnts/MediumButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const [isVisiblePopUp, setIsVisiblePopUp] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisiblePopUp(false);
    }, 4500);
  }, []);

  return (
    <AppBackground>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Image
              source={require('../assets/images/home.png')}
              style={{ top: 30 }}
            />
            {isVisiblePopUp && (
              <View style={styles.cardWrap}>
                <AnimatedFactCard
                  item={`Hello!
Where do we start?`}
                  index={0}
                  isVisible
                  style={{ top: 0 }}
                />
              </View>
            )}
          </View>
          <View style={styles.navigationContainer}>
            <MediumButton
              title={'Recomended place'}
              style={styles.button}
              onPress={() => navigation.navigate('Recommends')}
              textStyle={styles.btnText}
            />
            <MediumButton
              title={'Interesting Facts'}
              style={styles.button}
              textStyle={styles.btnText}
              onPress={() => navigation.navigate('Facts')}
            />
            <MediumButton
              title={'Saved place'}
              style={styles.button}
              textStyle={styles.btnText}
              onPress={() => navigation.navigate('Saved')}
            />
            <View style={styles.buttonsWrap}>
              <MediumButton
                title={'My routes'}
                style={{ width: 125 }}
                textStyle={styles.btnText}
                onPress={() => navigation.navigate('Routes')}
              />
              <MediumButton
                title={'Info'}
                style={{ width: 125 }}
                onPress={() => navigation.navigate('Info')}
                textStyle={styles.btnText}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: height * 0.05 },
  navigationContainer: {
    width: '100%',
    paddingTop: 28,
    paddingHorizontal: 67,
    alignItems: 'center',
    gap: 9,
    marginBottom: 40,
  },
  buttonsWrap: {
    flexDirection: 'row',
    gap: 10,
  },
  button: { width: 259 },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
  },
  cardWrap: { width: 240, position: 'absolute', right: 0, bottom: 28 },
});

export default Home;
