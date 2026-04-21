// App.js is het startpunt van de hele applicatie.
// Hier wordt de navigatie opgezet: welke schermen bestaan er en hoe zien de headers eruit?

// We importeren losse onderdelen die we nodig hebben uit verschillende bibliotheken.
// 'StatusBar' zorgt voor de statusbalk bovenaan het scherm (tijd, batterij, etc.)
import { StatusBar } from 'expo-status-bar';

// Basiscomponenten van React Native om iets op het scherm te zetten
import { StyleSheet, Text, View, ScrollView } from 'react-native';

// Ons eigen ProductCard component (niet direct gebruikt hier, maar geïmporteerd)
import ProductCard from './components/ProductCard';

// React zelf en useState: useState laat ons variabelen bijhouden die de UI kunnen updaten
import React, {useState} from 'react';

// NavigationContainer is de 'wrapper' die de hele navigatie mogelijk maakt
import { NavigationContainer } from '@react-navigation/native';

// createNativeStackNavigator maakt een stapelnavigatie: schermen stapelen op elkaar
// (zoals een browser die pagina's op elkaar stapelt met een terugknop)
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// We laden het Fredoka lettertype in vanuit Google Fonts
import {useFonts, Fredoka_400Regular, Fredoka_700Bold} from '@expo-google-fonts/fredoka';

// We importeren alle schermen die in de navigatie gebruikt worden
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetail';
import BlogDetail from './screens/BlogDetail';

// Stack is de navigator die we gebruiken om tussen schermen te wisselen
const Stack = createNativeStackNavigator();

// HeaderOptions bevat de stijlinstellingen voor de oranje navigatiebalk bovenaan elk scherm.
// Dit object hergebruiken we voor elk scherm zodat we niet alles hoeven te herhalen.
const HeaderOptions = {
  headerStyle: {
    backgroundColor: 'orange', // Achtergrondkleur van de header
  },
  headerTintColor: '#fff', // Kleur van de tekst en de terugknop in de header
  headerTitleStyle: {
    fontFamily: 'Fredoka_700Bold', // Lettertype van de titel in de header
    fontSize: 32,
  },
  headerTitleAlign: 'center', // Titel staat in het midden van de header
};

// Dit is de hoofdcomponent van de app. 'export default' betekent dat dit het
// hoofdbestand is dat Expo opstart.
export default function App() {

  // useFonts laadt de lettertypes asynchroon (op de achtergrond).
  // 'fontsLoaded' wordt 'true' zodra de lettertypes klaar zijn om te gebruiken.
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  // Zolang de lettertypes nog niet geladen zijn, tonen we niets (null = leeg scherm).
  // Dit voorkomt dat tekst zonder lettertype even zichtbaar is.
  if (!fontsLoaded) return null;

  return (
    // NavigationContainer moet om alles heen staan zodat navigatie werkt
    <NavigationContainer>
      {/* Stack.Navigator beheert welk scherm bovenop ligt */}
      <Stack.Navigator>
        {/* Elk Stack.Screen is één scherm in de app.
            'name' is de naam die je gebruikt bij navigation.navigate('...')
            'component' is het scherm dat getoond wordt
            'options' bevat de stijl van de header */}
        <Stack.Screen name="GameNight" component={HomeScreen} options={HeaderOptions}/>
        <Stack.Screen name="Details" component={ProductDetail} options={HeaderOptions} />
        {/* Voor BlogDetail gebruiken we een spread (...HeaderOptions) om de bestaande opties
            te kopiëren, en overschrijven we alleen de 'title' zodat de header "Details" toont
            in plaats van de scherm-naam "BlogDetail" */}
        <Stack.Screen name="BlogDetail" component={BlogDetail} options={{...HeaderOptions, title: 'Details'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
