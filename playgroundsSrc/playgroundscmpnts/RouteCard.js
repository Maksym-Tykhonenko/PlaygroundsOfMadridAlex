import {
  Dimensions,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../playgroudsconstants/colors';
import SmallButton from './SmallButton';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useEffect, useState } from 'react';
import polyline from '@mapbox/polyline';
import { useStore } from '../playgroundsstore/context';

const { height } = Dimensions.get('window');

const RouteCard = ({ place }) => {
  const [coords, setCoords] = useState([]);
  const { removeRoute } = useStore();

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
                  latitude: place.originLat,
                  longitude: place.originLong,
                },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: place.destinationLat,
                  longitude: place.destinationLong,
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

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${place.route}
 1 Location: ${place.originLat} ${place.originLong}
 2 Location: ${place.destinationLat} ${place.destinationLong}`,
      });
    } catch (error) {
      Alert(error.message);
    }
  };

  const handleDeleteRoute = () => {
    removeRoute(place);
  };

  return (
    <LinearGradient colors={COLORS} style={styles.borders}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{place.route}</Text>
        <View style={styles.sectionWrap}>
          <View
            style={{
              flexDirection: 'row',
              gap: 14,
            }}
          >
            <Image source={require('../assets/images/cardRoute.png')} />
            <View style={{ gap: 39 }}>
              <Text style={styles.cardCoordinates}>
                {place.originLat} {place.originLong}
              </Text>
              <Text style={styles.cardCoordinates}>
                {place.destinationLat} {place.destinationLong}
              </Text>
            </View>
          </View>

          <View style={styles.buttonsWrap}>
            <View style={styles.line} />
            <View style={{ gap: 8 }}>
              <SmallButton
                image={require('../assets/icons/delete.png')}
                onPress={handleDeleteRoute}
              />
              <SmallButton
                image={require('../assets/icons/share.png')}
                onPress={handleShare}
              />
            </View>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            userInterfaceStyle="dark"
            style={styles.map}
            initialRegion={{
              latitude: place.originLat,
              longitude: place.originLong,
              latitudeDelta: 0.3,
              longitudeDelta: 0.3,
            }}
          >
            <Marker
              coordinate={{
                latitude: place.originLat,
                longitude: place.originLong,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              {Platform.OS === 'ios' ? (
                <Image source={require('../assets/icons/marker.png')} />
              ) : null}
            </Marker>
            <Marker
              coordinate={{
                latitude: place.destinationLat,
                longitude: place.destinationLong,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}
            >
              {Platform.OS === 'ios' ? (
                <Image source={require('../assets/icons/currLocation.png')} />
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
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.072 },
  button: { width: 193, marginBottom: 30 },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
    marginBottom: 18,
  },
  cardCoordinates: {
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  borders: {
    marginBottom: 7,
    borderRadius: 14,
    width: '100%',
  },
  cardContainer: {
    padding: 20,
    paddingTop: 28,
    backgroundColor: '#080809',
    margin: 1,
    borderRadius: 14,
    gap: 4,
  },
  line: {
    width: 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
    height: 124,
    top: -11,
  },
  sectionWrap: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonsWrap: { gap: 21, top: -25, flexDirection: 'row' },
  map: {
    width: '100%',
    height: 140,
  },
  mapContainer: { alignItems: 'center', borderRadius: 22, overflow: 'hidden' },
});

export default RouteCard;
