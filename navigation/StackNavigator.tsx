import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ConsejosScreen from '../screens/ConsejosScreen';

export type RootStackParamList = {
  Home: undefined;
  Consejos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TAKEMED' }} />
      <Stack.Screen name="Consejos" component={ConsejosScreen} options={{ title: 'TAKEMED' }} />
    </Stack.Navigator>
  );
}
