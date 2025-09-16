import { createStackNavigator } from '@react-navigation/stack';

import Info from '../playgroundsscreens/Info';
import Recommends from '../playgroundsscreens/Recommends';
import Saved from '../playgroundsscreens/Saved';
import PlaceDetails from '../playgroundsscreens/PlaceDetails';
import Facts from '../playgroundsscreens/Facts';
import AddRoute from '../playgroundsscreens/AddRoute';
import Routes from '../playgroundsscreens/Routes';
import Onboard from '../playgroundsscreens/Onboard';
import Home from '../playgroundsscreens/Home';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Recommends" component={Recommends} />
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
      <Stack.Screen name="Facts" component={Facts} />
      <Stack.Screen name="AddRoute" component={AddRoute} />
      <Stack.Screen name="Routes" component={Routes} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
