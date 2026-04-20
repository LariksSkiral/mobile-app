import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ProductCard from './components/ProductCard';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useFonts, Fredoka_400Regular, Fredoka_700Bold} from '@expo-google-fonts/fredoka';


import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetail';
import BlogDetail from './screens/BlogDetail';

const Stack = createNativeStackNavigator();
const HeaderOptions = {
  headerStyle: {
    backgroundColor: 'orange',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 32,
  },
  headerTitleAlign: 'center',
};

export default function App() {

  const [fontsLoaded] = useFonts({
  Fredoka_400Regular,
  Fredoka_700Bold,
});

if (!fontsLoaded) return null;


  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="GameNight" component={HomeScreen} options={HeaderOptions}/>
      <Stack.Screen name="Details" component={ProductDetail} options={HeaderOptions} />
      <Stack.Screen name="BlogDetail" component={BlogDetail} options={HeaderOptions}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}


