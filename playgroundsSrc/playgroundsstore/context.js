import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState([]);

  // notes

  const savePlace = async data => {
    try {
      const storedNote = await AsyncStorage.getItem('places');
      let places = storedNote !== null ? JSON.parse(storedNote) : [];

      const updatedPlaces = [...places, data];

      await AsyncStorage.setItem('places', JSON.stringify(updatedPlaces));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchPlaces = async () => {
    try {
      const savedData = await AsyncStorage.getItem('places');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedPlaces(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removePlace = async selectedPlace => {
    const jsonValue = await AsyncStorage.getItem('places');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedPlace.id);

    setSavedPlaces(filtered);
    await AsyncStorage.setItem('places', JSON.stringify(filtered));
  };

  // routes

  const saveRoute = async route => {
    try {
      const stored = await AsyncStorage.getItem('routes');
      let routes = stored !== null ? JSON.parse(stored) : [];

      const updatedRoutes = [...routes, route];

      await AsyncStorage.setItem('routes', JSON.stringify(updatedRoutes));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchRoutes = async () => {
    try {
      const savedData = await AsyncStorage.getItem('routes');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedRoutes(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeRoute = async selectedRoute => {
    const jsonValue = await AsyncStorage.getItem('routes');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedRoute.id);

    setSavedRoutes(filtered);
    await AsyncStorage.setItem('routes', JSON.stringify(filtered));
  };

  const value = {
    savePlace,
    fetchPlaces,
    removePlace,
    savedPlaces,
    saveRoute,
    fetchRoutes,
    removeRoute,
    savedRoutes,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
