import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmallButton from './SmallButton';
import RegularButton from './RegularButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { useStore } from '../playgroundsstore/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../playgroudsconstants/colors';

const { height } = Dimensions.get('window');

const LargeCard = ({ place, setShowMap, setShowRoutes, share }) => {
  const navigation = useNavigation();
  const { savePlace, fetchPlaces, removePlace } = useStore();
  const [iconColor, setIconColor] = useState(false);

  useFocusEffect(
    useCallback(() => {
      renderFavorites(place);
      fetchPlaces();
    }, []),
  );

  const toggleSaved = selectedPlace => {
    if (iconColor) removePlace(selectedPlace), setIconColor(false);
    else savePlace(selectedPlace), setIconColor(true);
  };

  const renderFavorites = async item => {
    const jsonValue = await AsyncStorage.getItem('places');

    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.id === item.id);

      return data == null ? setIconColor(false) : setIconColor(true);
    }
  };

  return (
    <LinearGradient colors={COLORS} style={styles.borders}>
      <View style={styles.cardContainer}>
        <Image source={place.image} style={styles.image} />
        <Text style={styles.name}>{place.name}</Text>

        <Text style={styles.coordinates}>
          {place.latitude} {place.longitude}
        </Text>

        <Text style={styles.description}>{place.description}</Text>

        <View style={styles.buttonsWrapper}>
          <RegularButton
            image={require('../assets/icons/map.png')}
            title={'Map'}
            onPress={() => setShowMap(true)}
          />
          <SmallButton
            image={
              iconColor
                ? require('../assets/icons/saved.png')
                : require('../assets/icons/save.png')
            }
            onPress={() => toggleSaved(place)}
          />
          <SmallButton
            image={require('../assets/icons/route.png')}
            onPress={() => {
              setShowMap(true), setShowRoutes(true);
            }}
          />
          <SmallButton
            image={require('../assets/icons/share.png')}
            onPress={share}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.072 },
  buttonsWrap: {
    flexDirection: 'row',
    gap: 10,
  },
  button: { width: 193, marginBottom: 30 },
  name: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
    marginBottom: 16,
  },
  coordinates: {
    fontWeight: '700',
    fontSize: 13,
    color: '#FECF43',
    marginBottom: 21,
  },
  description: {
    fontWeight: '400',
    fontSize: 15,
    color: '#FFFFFF6B',
    marginBottom: 32,
  },
  borders: {
    marginBottom: 13,
    borderRadius: 14,
    width: '100%',
  },
  cardContainer: {
    padding: 16,
    paddingBottom: 19,
    backgroundColor: '#080809',
    margin: 1,
    borderRadius: 14,
  },
  image: { width: '100%', height: 224, borderRadius: 23, marginBottom: 21 },
  buttonsWrapper: {
    flexDirection: 'row',
    gap: 11,
  },
});

export default LargeCard;
