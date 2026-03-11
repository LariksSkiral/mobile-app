import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ProductCard from './components/ProductCard';


export default function App() {
  return (
   <View style={styles.container}>
    <StatusBar style="auto" />
    <ScrollView>
      <Text>Onze Producten</Text>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </ScrollView>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
});
