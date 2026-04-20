import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import BlogCard from '../components/BlogCard';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

const categoryNames = {
  "": "All",
  "69a84f16ed18ff169250ece9": "Action",
  "69a84f01f0dd32b2c4e272bf": "Social & Party",
  "69a84ee3962634a645ba3ca7": "Family & Children",
  "69a84ec11399da61b1940a57": "Adult",
  "69a84e6b56671f884459ed49": "Strategy",
};


const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    // Fetch products and blogs
    fetch('https://api.webflow.com/v2/sites/698c80288c1bdc3fa52806be/products/',
    {
      headers: {
        Authorization:
        'Bearer 6c7a860bc5f6e0275c13e0931d6bdb7cb4fd0b5eb058b8625234dec0fedb5868',
      },
    },
    )
      .then((response) => response.json())
      .then((data) => setProducts(
        
        data.items.map((item) => ({
          id: item.product.id,
          title: item.product.fieldData.name,
          description: item.product.fieldData.description,
          price: item.skus[0].fieldData.price.value / 100, // 3199 = $31.99          
          image: { uri: item.skus[0].fieldData["main-image"].url },
          category: categoryNames [item.product.fieldData.category[0]] || "Onbekende categorie",
        })),
      ))
      .catch((error) => console.error('Error fetching products:', error));

      fetch('https://api.webflow.com/v2/collections/69a1b56ff76cbbc0e4399559/items/live',
      {
        headers: {
          Authorization: 'Bearer 6c7a860bc5f6e0275c13e0931d6bdb7cb4fd0b5eb058b8625234dec0fedb5868',
        },
      },
      )
        .then((response) => response.json())
        .then((data) => setBlogs(
          data.items.map((item) => ({
            id: item.id,
            title: item.fieldData.name,
            description: item.fieldData.summary,
            image: { uri: item.fieldData["main-image"].url },
          }))
        ))
        .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  const filteredProducts = products.filter(
    (p) => 
      (selectedCategory === "" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "title-asc") return a.title.localeCompare(b.title);
    if (sortOption === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });



  return (
   <View style={styles.container}>
    <StatusBar style="auto" />

    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "products" && styles.tabButtonActive]}
        onPress={() => setActiveTab("products")}
      >
        <Text style={[styles.tabButtonText, activeTab === "products" && styles.tabButtonTextActive]}>
          Producten
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "blogs" && styles.tabButtonActive]}
        onPress={() => setActiveTab("blogs")}
      >
        <Text style={[styles.tabButtonText, activeTab === "blogs" && styles.tabButtonTextActive]}>
          Blogs
        </Text>
      </TouchableOpacity>
    </View>

    <ScrollView>
      {activeTab === "products" && (
        <>
          <Text style={styles.sectionTitle}>Onze Producten</Text>

          <TextInput
            placeholder="Zoek producten..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />

          <Picker
            selectedValue={selectedCategory}
            onValueChange={setSelectedCategory}
            style={{ height: 50, width: 200, marginLeft: 20 }}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Action" value="Action" />
            <Picker.Item label="Social & Party" value="Social & Party" />
            <Picker.Item label="Family & Children" value="Family & Children" />
            <Picker.Item label="Adult" value="Adult" />
            <Picker.Item label="Strategy" value="Strategy" />
          </Picker>

          <Picker
            selectedValue={sortOption}
            onValueChange={setSortOption}
            style={{ height: 50, width: 200, marginLeft: 20 }}
          >
            <Picker.Item label="Price: Low to High" value="price-asc" />
            <Picker.Item label="Price: High to Low" value="price-desc" />
            <Picker.Item label="Title: A to Z" value="title-asc" />
            <Picker.Item label="Title: Z to A" value="title-desc" />
          </Picker>

          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              onPress={() =>
                navigation.navigate('Details', {
                  title: product.title,
                  description: product.description,
                  price: product.price,
                  image: product.image,
                })}
            />
          ))}
        </>
      )}

      {activeTab === "blogs" && (
        <>
          <Text style={styles.sectionTitle}>Onze Blogs</Text>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              onPress={() =>
                navigation.navigate('BlogDetail', {
                  title: blog.title,
                  description: blog.description,
                  image: blog.image,
                })}
            />
          ))}
        </>
      )}
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
        marginVertical: 20,
        marginLeft: 20,
        fontFamily: 'Fredoka_700Bold',
    },
    searchInput: {
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
        fontSize: 15,
        fontFamily: 'Fredoka_400Regular',
    },
    tabBar: {
        flexDirection: 'row',
        margin: 16,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        padding: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    tabButtonActive: {
        backgroundColor: 'orange',
    },
    tabButtonText: {
        fontSize: 16,
        color: '#888',
        fontFamily: 'Fredoka_700Bold',
    },
    tabButtonTextActive: {
        color: '#fff',
    },

});

export default HomeScreen;
