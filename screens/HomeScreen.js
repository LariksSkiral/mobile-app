import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
   <View style={styles.container}>
    <StatusBar style="auto" />
    <ScrollView>
      <Text>Onze Producten</Text>
      <ProductCard 
      title="Product 1"
      description="Dit is een leuk product"
      price="19,99"
      image= {{ uri: 'https://cdn.prod.website-files.com/69a1b56f48f05c1e9552e901/69a855941fc6c0a8a82528e3_1f0de9b2-8edf-4190-ae14-d4dded1f52db_720x.webp' }}
         onPress={() => 
            navigation.navigate('Details', {
                title: "Product 1",
                description: "Dit is een leuk product", 
                price: "19,99", 
                image: { uri: 'https://cdn.prod.website-files.com/69a1b56f48f05c1e9552e901/69a855941fc6c0a8a82528e3_1f0de9b2-8edf-4190-ae14-d4dded1f52db_720x.webp' } })}
      />
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

export default HomeScreen;
