import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Polyline, Marker } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../playgroundsstore/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import Orientation from 'react-native-orientation-locker';

import AppBackground from '../playgroundscmpnts/AppBackground';
import Header from '../playgroundscmpnts/Header';
import LargeCard from '../playgroundscmpnts/LargeCard';
import RegularButton from '../playgroundscmpnts/RegularButton';
import SmallButton from '../playgroundscmpnts/SmallButton';
import { COLORS } from '../playgroudsconstants/colors';

const { height } = Dimensions.get('window');

const PlaceDetails = ({ route }) => {
  const place = route.params;
  const [showMap, setShowMap] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const { savePlace, fetchPlaces, removePlace } = useStore();
  const [iconColor, setIconColor] = useState(false);
  const [coords, setCoords] = useState([]);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
    }, []),
  );

  useEffect(() => {
    const getRoute = async () => {
      const response = await fetch(
        'https://routes.googleapis.com/directions/v2:computeRoutes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': 'AIzaSyDU9BVwbP1PaxH77r2WhYIunL23CLo0_Mw',
            'X-Goog-FieldMask': 'routes.polyline.encodedPolyline',
          },
          body: JSON.stringify({
            origin: {
              location: {
                latLng: {
                  latitude: place.latitude,
                  longitude: place.longitude,
                },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: 40.416775,
                  longitude: -3.70379,
                },
              },
            },
            travelMode: 'DRIVE',
            routingPreference: 'TRAFFIC_AWARE',
            polylineEncoding: 'ENCODED_POLYLINE',
          }),
        },
      );

      const data = await response.json();
      const encodedPolyline = data.routes[0].polyline.encodedPolyline;
      const decodedPoints = polyline
        .decode(encodedPolyline)
        .map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));
      setCoords(decodedPoints);
    };

    getRoute();
  }, []);

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

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${place.name}
${place.latitude} ${place.longitude}
${place.description}`,
      });
    } catch (error) {
      Alert(error.message);
    }
  };

  return (
    <AppBackground>
      <ScrollView>
        <View style={styles.container}>
          <Header
            title={'Recomended place'}
            style={{ width: '60%' }}
            showMap={showMap}
            setShowMap={setShowMap}
          />

          <View style={{ marginTop: 67, paddingHorizontal: 19 }}>
            {showMap ? (
              <LinearGradient colors={COLORS} style={styles.borders}>
                <View style={styles.cardContainer}>
                  <View style={styles.mapContainer}>
                    {showRoutes ? (
                      <MapView
                        userInterfaceStyle="dark"
                        style={styles.map}
                        initialRegion={{
                          latitude: place.latitude,
                          longitude: place.longitude,
                          latitudeDelta: 0.08,
                          longitudeDelta: 0.08,
                        }}
                      >
                        <Marker
                          coordinate={{
                            latitude: place.latitude,
                            longitude: place.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                          }}
                        >
                          {Platform.OS === 'ios' ? (
                            <Image
                              source={require('../assets/icons/marker.png')}
                            />
                          ) : null}
                        </Marker>
                        <Marker
                          coordinate={{
                            latitude: 40.416775,
                            longitude: -3.70379,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03,
                          }}
                        >
                          {Platform.OS === 'ios' ? (
                            <Image
                              source={require('../assets/icons/currLocation.png')}
                            />
                          ) : null}
                        </Marker>

                        {coords.length > 0 && (
                          <Polyline
                            coordinates={coords}
                            strokeWidth={6}
                            strokeColor="#FFD044"
                          />
                        )}
                      </MapView>
                    ) : (
                      <MapView
                        userInterfaceStyle="dark"
                        style={styles.map}
                        initialRegion={{
                          latitude: place.latitude,
                          longitude: place.longitude,
                          latitudeDelta: 0.03,
                          longitudeDelta: 0.03,
                        }}
                      >
                        <Marker
                          coordinate={{
                            latitude: place.latitude,
                            longitude: place.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                          }}
                        >
                          {Platform.OS === 'ios' ? (
                            <Image
                              source={require('../assets/icons/marker.png')}
                            />
                          ) : null}
                        </Marker>
                      </MapView>
                    )}

                    <RegularButton
                      image={require('../assets/icons/map.png')}
                      title={showRoutes ? 'Route' : 'Map'}
                      style={{ position: 'absolute', top: 25 }}
                      isDisabled
                    />
                  </View>

                  <View style={styles.buttonsWrapper}>
                    <TouchableOpacity
                      style={styles.closeBtn}
                      activeOpacity={0.7}
                      onPress={() => {
                        setShowMap(false);
                      }}
                    >
                      <Image source={require('../assets/icons/close.png')} />
                    </TouchableOpacity>

                    {showRoutes ? (
                      <>
                        <RegularButton
                          image={require('../assets/icons/map.png')}
                          title={'Map'}
                          onPress={() => setShowRoutes(false)}
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
                          image={require('../assets/icons/share.png')}
                          onPress={handleShare}
                        />
                      </>
                    ) : (
                      <>
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
                          onPress={() => setShowRoutes(true)}
                        />
                        <SmallButton
                          image={require('../assets/icons/share.png')}
                          onPress={handleShare}
                        />
                      </>
                    )}
                  </View>
                </View>
              </LinearGradient>
            ) : (
              <LargeCard
                place={place}
                setShowMap={setShowMap}
                setShowRoutes={setShowRoutes}
                share={handleShare}
              />
            )}
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
  map: {
    width: '100%',
    height: 476,
  },
  mapContainer: { alignItems: 'center', borderRadius: 22, overflow: 'hidden' },
  description: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
    marginHorizontal: 64,
    marginVertical: 25,
  },
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
    marginTop: 33,
  },
  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default PlaceDetails;
