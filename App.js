import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {OrderDeliveryScreen, RestaurantScreen} from './src/screens';
import {SCREEN} from './src/routes/routes';
import Tabs from './src/navigation/tabs';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            display: 'flex',
          },
        }}>
        <Stack.Screen name={SCREEN.TABS} component={Tabs} />
        <Stack.Screen
          name={SCREEN.ORDER_DELIVERY_SCREEN}
          component={OrderDeliveryScreen}
        />
        <Stack.Screen
          name={SCREEN.RESTAURANT_SCREEN}
          component={RestaurantScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
