import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import AppBackground from '../playgroundscmpnts/AppBackground';
import Header from '../playgroundscmpnts/Header';
import MediumButton from '../playgroundscmpnts/MediumButton';
import { useStore } from '../playgroundsstore/context';

const { height } = Dimensions.get('window');

const AddRoute = ({}) => {
  const { saveRoute } = useStore();
  const [routeTitle, setRouteTitle] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const navigation = useNavigation();

  const [originLat, originLong] = origin.split(' ').map(Number);
  const [destinationLat, destinationLong] = destination.split(' ').map(Number);

  const handleSaveRoute = () => {
    const newRoute = {
      id: Date.now(),
      route: routeTitle,
      originLat,
      originLong,
      destinationLat,
      destinationLong,
    };

    saveRoute(newRoute);

    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  const isVisible = origin || destination || routeTitle;

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header title={'ADD ROUTE'} style={{ width: '60%' }} />
          <View style={{ paddingHorizontal: 57 }}>
            <Text style={[styles.sectionTitle, { marginTop: 55 }]}>Title</Text>
            <TextInput
              placeholder="Name route"
              style={[styles.input, routeTitle && { fontWeight: '700' }]}
              value={routeTitle}
              maxLength={20}
              onChangeText={setRouteTitle}
              placeholderTextColor={'rgba(255, 255, 255, 0.21)'}
            />
            <Text style={styles.sectionTitle}>1 Location</Text>
            <TextInput
              placeholder="Coordinates"
              style={[styles.input, origin && { fontWeight: '700' }]}
              value={origin}
              onChangeText={setOrigin}
              keyboardType="numeric"
              placeholderTextColor={'rgba(255, 255, 255, 0.21)'}
            />
            <Text style={styles.sectionTitle}>2 Location</Text>
            <TextInput
              placeholder="Coordinates"
              style={[styles.input, destination && { fontWeight: '700' }]}
              placeholderTextColor={'rgba(255, 255, 255, 0.21)'}
              value={destination}
              keyboardType="numeric"
              onChangeText={setDestination}
            />

            <Image
              source={require('../assets/images/route.png')}
              style={{ position: 'absolute', bottom: 30, left: 16 }}
            />
          </View>

          <View style={{ marginTop: 40, alignItems: 'center' }}>
            {isVisible && (
              <MediumButton
                title={'SAVE'}
                style={{ width: 162 }}
                textStyle={styles.btnText}
                onPress={() => handleSaveRoute()}
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
  button: { width: 193, marginBottom: 30 },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
    marginTop: 29,
    marginBottom: 8,
  },
  image: { position: 'absolute', bottom: 116 },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 30,
    marginHorizontal: 75,
    top: 30,
  },
  input: {
    width: '100%',
    height: 87,
    borderWidth: 1,
    borderColor: 'rgba(240, 182, 37, 0.28)',
    borderRadius: 14,
    paddingHorizontal: 22,
    color: '#fff',
    fontWeight: '400',
    fontSize: 14,
  },
});

export default AddRoute;
