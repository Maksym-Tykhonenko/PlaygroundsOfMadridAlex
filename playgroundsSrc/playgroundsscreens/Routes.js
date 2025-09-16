import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import MediumButton from '../playgroundscmpnts/MediumButton';
import { useStore } from '../playgroundsstore/context';
import AppBackground from '../playgroundscmpnts/AppBackground';
import Header from '../playgroundscmpnts/Header';
import RouteCard from '../playgroundscmpnts/RouteCard';

const { height } = Dimensions.get('window');

const Routes = ({}) => {
  const { fetchRoutes, savedRoutes } = useStore();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchRoutes();
    }, []),
  );

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header title={'My routes'} style={{ width: '60%' }} />
          {savedRoutes.length === 0 && (
            <Text style={styles.emptyScreenText}>No routes...</Text>
          )}
          <View style={{ paddingHorizontal: 20, marginTop: 51 }}>
            {savedRoutes.map(route => (
              <RouteCard place={route} key={route.id} />
            ))}
          </View>
          <View
            style={[
              savedRoutes.length !== 0 && { marginTop: height * 0.2 },
              { alignItems: 'center' },
            ]}
          >
            <MediumButton
              title={'Add new'}
              style={styles.btnWrap}
              textStyle={styles.btnText}
              onPress={() => navigation.navigate('AddRoute')}
              icon={true}
            />
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
  emptyScreenText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
    marginTop: height * 0.24,
    marginBottom: 24,
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
  btnWrap: { width: 162, flexDirection: 'row', gap: 5 },
});

export default Routes;
