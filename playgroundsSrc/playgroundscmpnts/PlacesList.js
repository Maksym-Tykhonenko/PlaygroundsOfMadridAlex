import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import AppBackground from './AppBackground';
import Header from './Header';
import { places } from '../playgroundsdata/places';
import PlaceCard from './Card';
import { useStore } from '../playgroundsstore/context';
import { COLORS } from '../playgroudsconstants/colors';

const { height } = Dimensions.get('window');

const PlacesList = ({ screen }) => {
  const { fetchPlaces, savedPlaces } = useStore();

  useFocusEffect(
    useCallback(() => {
      fetchPlaces();
    }, []),
  );

  let placesList;

  screen === 'Saved' ? (placesList = savedPlaces) : (placesList = places);

  return (
    <AppBackground>
      <ScrollView>
        <View style={styles.container}>
          <Header
            title={screen === 'Saved' ? 'Saved place' : 'Recomended place'}
            style={{ width: '60%' }}
          />

          {screen === 'Saved' && (
            <View style={{ alignItems: 'center' }}>
              {savedPlaces.length === 0 && (
                <LinearGradient colors={COLORS} style={styles.borders}>
                  <View style={styles.cardContainer}>
                    <Text style={styles.emptyScreenText}>Empty...</Text>
                  </View>
                </LinearGradient>
              )}
            </View>
          )}

          <View
            style={{ marginTop: 67, paddingHorizontal: 19, marginBottom: 50 }}
          >
            <FlatList
              data={placesList}
              scrollEnabled={false}
              keyExtractor={(_, index) => index}
              renderItem={({ item }) => (
                <PlaceCard place={item} key={item.id} />
              )}
            />
          </View>
        </View>
      </ScrollView>

      {screen === 'Saved' && (
        <View style={{ alignItems: 'center' }}>
          {savedPlaces.length === 0 ? (
            <Image
              source={require('../assets/images/facts2.png')}
              style={styles.image}
            />
          ) : (
            <></>
          )}
        </View>
      )}

      {/* {screen === 'Recommends' && (
        <>
          {Platform.OS === 'ios' && (
            <LinearGradient
              pointerEvents="box-none"
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
              style={styles.bottomGrad}
            />
          )}
        </>
      )} */}
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
  bottomGrad: { width: '100%', height: 300, position: 'absolute', bottom: 0 },
  emptyScreenText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#FFF',
  },
  borders: {
    borderRadius: 14,
    width: 244,
    marginTop: height * 0.16,
  },
  cardContainer: {
    backgroundColor: '#080809',
    margin: 1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    height: 87,
    justifyContent: 'center',
  },
  image: {
    bottom: -55,
  },
});

export default PlacesList;
