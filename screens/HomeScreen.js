import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import BlogCard from '../components/BlogCard';


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
   <View style={styles.container}>
    <StatusBar style="auto" />
    <ScrollView>
      <Text style={styles.sectionTitle}>Onze Producten</Text>
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
      <BlogCard 
      title="Blog 1"
      description="Dit is een leuk artikel"
      image= {{ uri: 'https://cdn.prod.website-files.com/69a1b56f48f05c1e9552e901/69a855941fc6c0a8a82528e3_1f0de9b2-8edf-4190-ae14-d4dded1f52db_720x.webp' }}
         onPress={() => 
            navigation.navigate('BlogDetail', {
                title: "Blog 1",
                description: "Dit is een leuk artikel", 
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
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
        height: 200,
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        marginLeft: 20,
    },
  
});

export default HomeScreen;
