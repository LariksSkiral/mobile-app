// HomeScreen.js is het hoofdscherm van de app.
// Hier zie je de producten en blogs, met filters, zoekbalk en een toggle ertussen.

import { StatusBar } from 'expo-status-bar';

// We importeren alle React Native componenten die we nodig hebben op dit scherm.
// Switch = aan/uit schakelaar, Button = eenvoudige knop
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Switch, Button } from 'react-native';

// Onze eigen herbruikbare componenten voor producten en blogs
import ProductCard from '../components/ProductCard';

// useNavigation geeft ons toegang tot de navigator zodat we naar andere schermen kunnen gaan
import { useNavigation } from '@react-navigation/native';
import BlogCard from '../components/BlogCard';

// useState = een variabele die de UI opnieuw tekent als hij verandert
// useEffect = code die automatisch uitgevoerd wordt (bijv. als het scherm opent)
import { useState, useEffect } from 'react';

// Picker is een dropdown-menu (selectielijst)
import { Picker } from '@react-native-picker/picker';

// Het Fredoka lettertype inladen vanuit Google Fonts
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

// Een object dat Webflow categorie-ID's vertaalt naar leesbare namen.
// De sleutels (lange strings) zijn ID's uit de database, de waarden zijn de namen.
const categoryNames = {
  "": "All",
  "69a84f16ed18ff169250ece9": "Action",
  "69a84f01f0dd32b2c4e272bf": "Social & Party",
  "69a84ee3962634a645ba3ca7": "Family & Children",
  "69a84ec11399da61b1940a57": "Adult",
  "69a84e6b56671f884459ed49": "Strategy",
};


const HomeScreen = () => {
  // useNavigation geeft ons de 'navigation' variabele waarmee we kunnen navigeren
  const navigation = useNavigation();

  // useState([]) maakt een lege array aan als beginwaarde.
  // 'products' bevat de lijst met producten, 'setProducts' past die lijst aan.
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // De geselecteerde categorie voor het filter. Leeg = alles tonen.
  const [selectedCategory, setSelectedCategory] = useState("");

  // De tekst die de gebruiker intypt in de zoekbalk
  const [searchQuery, setSearchQuery] = useState("");

  // De geselecteerde sorteeroptie
  const [sortOption, setSortOption] = useState("price-asc");

  // Welke tab actief is: "products" of "blogs"
  const [activeTab, setActiveTab] = useState("products");

  // Of de "Featured" switch aan staat (true) of uit (false)
  const [showFeatured, setShowFeatured] = useState(false);

  // Deze functie reset alle productfilters terug naar de beginwaarden
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortOption("price-asc");
  };

  // filteredBlogs toont alle blogs als de switch uit staat.
  // Als de switch aan staat (!showFeatured is dan false), worden alleen featured blogs getoond.
  const filteredBlogs = blogs.filter(b => !showFeatured || b.featured === true);

  // useEffect voert de code erin uit zodra het scherm voor het eerst geladen wordt.
  // De lege array [] als tweede argument betekent: voer dit maar één keer uit.
  useEffect(() => {
    // We halen producten op via de Webflow API met een fetch-verzoek
    fetch('https://api.webflow.com/v2/sites/698c80288c1bdc3fa52806be/products/',
    {
      headers: {
        // Authorization is de toegangssleutel (token) voor de API
        Authorization:
        'Bearer 6c7a860bc5f6e0275c13e0931d6bdb7cb4fd0b5eb058b8625234dec0fedb5868',
      },
    },
    )
      // .then() wordt uitgevoerd als het verzoek klaar is — we zetten de response om naar JSON
      .then((response) => response.json())
      // Dan verwerken we de data en slaan we hem op in onze 'products' state
      .then((data) => setProducts(
        // .map() loopt over elk item in de lijst en maakt er een nieuw object van
        data.items.map((item) => ({
          id: item.product.id,
          title: item.product.fieldData.name,
          description: item.product.fieldData.description,
          // De prijs staat in centen (3199 = €31,99), dus we delen door 100
          price: item.skus[0].fieldData.price.value / 100,
          image: { uri: item.skus[0].fieldData["main-image"].url },
          // We zoeken de categorienaam op in ons categoryNames object
          category: categoryNames[item.product.fieldData.category[0]] || "Unknown category",
        })),
      ))
      // .catch() wordt uitgevoerd als er iets misgaat (bijv. geen internet)
      .catch((error) => console.error('Error fetching products:', error));

      // Hetzelfde doen we voor de blogs, maar via een andere API-url (de collectie-url)
      fetch('https://api.webflow.com/v2/collections/69a1b56ff76cbbc0e4399559/items/live',
      {
        headers: {
          Authorization: 'Bearer 6c7a860bc5f6e0275c13e0931d6bdb7cb4fd0b5eb058b8625234dec0fedb5868',
        },
      },
      )
        .then((response) => response.json())
        .then((data) => {
          // Tijdelijke logs om de API-data te inspecteren in de terminal (handig bij debuggen)
          console.log('Blog fieldData keys:', Object.keys(data.items[0].fieldData));
          console.log('Blog item[0] fieldData:', JSON.stringify(data.items[0].fieldData, null, 2));
          setBlogs(data.items.map((item) => ({
            id: item.id,
            title: item.fieldData.name,
            description: item.fieldData.summary,
            image: { uri: item.fieldData["main-image"].url },
            content: item.fieldData["post-body"],
            // ?? false betekent: als het veld niet bestaat, gebruik dan 'false' als standaardwaarde
            featured: item.fieldData["is-featured"] ?? false,
          })));
        })
        .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  // filter() maakt een nieuwe array met alleen de items die aan de voorwaarden voldoen.
  // We checken categorie én zoekterm tegelijk.
  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // sort() sorteert de gefilterde producten op basis van de gekozen sorteeroptie.
  // We maken eerst een kopie met spread [...] zodat we de originele array niet aanpassen.
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;   // Goedkoopste eerst
    if (sortOption === "price-desc") return b.price - a.price;  // Duurste eerst
    if (sortOption === "title-asc") return a.title.localeCompare(b.title);  // A tot Z
    if (sortOption === "title-desc") return b.title.localeCompare(a.title); // Z tot A
    return 0; // Geen verandering als geen optie overeenkomt
  });


  return (
    // View is de basis-container in React Native, vergelijkbaar met een <div> in HTML
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* De tab-balk bovenaan waarmee je wisselt tussen Producten en Blogs */}
      <View style={styles.tabBar}>
        {/* TouchableOpacity is een knop die reageert op aanraking met een doorzichtigheidseffect */}
        <TouchableOpacity
          // style kan een array zijn: de basis-stijl + een extra stijl als de tab actief is
          style={[styles.tabButton, activeTab === "products" && styles.tabButtonActive]}
          onPress={() => setActiveTab("products")}
        >
          <Text style={[styles.tabButtonText, activeTab === "products" && styles.tabButtonTextActive]}>
            Products
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

      {/* ScrollView maakt de inhoud scrollbaar als die niet op het scherm past */}
      <ScrollView>
        {/* && is een kortere manier om iets conditioneel te tonen:
            als activeTab === "products" waar is, wordt de JSX erna getoond */}
        {activeTab === "products" && (
          // <> </> is een Fragment: een onzichtbare wrapper zodat je meerdere elementen
          // naast elkaar kunt zetten zonder een extra View te maken
          <>
            <Text style={styles.sectionTitle}>Our Products</Text>

            {/* TextInput is een invoerveld. value en onChangeText houden de state gesynchroniseerd */}
            <TextInput
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />

            {/* Categorie filter als dropdown (Picker), zelfde opbouw als de sorteer-picker */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Category</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={setSelectedCategory}
                  style={styles.picker}
                >
                  <Picker.Item label="All" value="" />
                  <Picker.Item label="Action" value="Action" />
                  <Picker.Item label="Social & Party" value="Social & Party" />
                  <Picker.Item label="Family & Children" value="Family & Children" />
                  <Picker.Item label="Adult" value="Adult" />
                  <Picker.Item label="Strategy" value="Strategy" />
                </Picker>
              </View>
            </View>

            {/* Sorteer filter als dropdown (Picker) */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sort</Text>
              <View style={styles.pickerContainer}>
                {/* Picker is een dropdown-menu. selectedValue en onValueChange werken
                    net als value en onChangeText bij TextInput */}
                <Picker
                  selectedValue={sortOption}
                  onValueChange={setSortOption}
                  style={styles.picker}
                >
                  <Picker.Item label="Price: Low to High" value="price-asc" />
                  <Picker.Item label="Price: High to Low" value="price-desc" />
                  <Picker.Item label="Title: A to Z" value="title-asc" />
                  <Picker.Item label="Title: Z to A" value="title-desc" />
                </Picker>
              </View>
            </View>

            {/* Button is het eenvoudigste knop-component in React Native.
                onPress roept resetFilters aan, wat alle filter-states terugzet */}
            <View style={styles.resetButtonContainer}>
              <Button title="Clear filters" onPress={resetFilters} color="orange" />
            </View>

            {/* We loopen over sortedProducts en maken voor elk product een ProductCard */}
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                // onPress navigeert naar het Details-scherm en geeft de productdata mee als parameters
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

        {/* De blogs-tab: alleen zichtbaar als activeTab === "blogs" */}
        {activeTab === "blogs" && (
          <>
            <Text style={styles.sectionTitle}>Our Blogs</Text>

            {/* Switch is een aan/uit-schakelaar.
                value = huidige staat, onValueChange = functie die wordt aangeroepen bij wijziging
                trackColor bepaalt de kleur van de baan (aan/uit), thumbColor is de kleur van het bolletje */}
            <View style={styles.switchRow}>
              <Text style={styles.filterLabel}>Featured</Text>
              <Switch
                value={showFeatured}
                onValueChange={setShowFeatured}
                trackColor={{ false: '#f0f0f0', true: 'orange' }}
                thumbColor={showFeatured ? '#fff' : '#ccc'}
              />
            </View>

            {/* filteredBlogs is al gefilterd op basis van de switch-waarde */}
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                onPress={() =>
                    navigation.navigate('BlogDetail', {
                    title: blog.title,
                    description: blog.description,
                    content: blog.content,
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

// StyleSheet.create() maakt een geoptimaliseerd stijlobject aan.
// Dit werkt vergelijkbaar met CSS, maar dan als JavaScript-object.
const styles = StyleSheet.create({
  container: {
    flex: 1, // flex: 1 betekent: neem alle beschikbare ruimte in
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
    marginVertical: 20, // marginVertical = margin boven én onder tegelijk
    marginLeft: 20,
    fontFamily: 'Fredoka_700Bold',
  },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25, // Hoge borderRadius = volledig afgeronde hoeken
    backgroundColor: '#f2f2f2',
    fontSize: 15,
    fontFamily: 'Fredoka_400Regular',
  },
  filterSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'Fredoka_700Bold',
    marginBottom: 6,
    marginLeft: 4,
  },
  chipRow: {
    flexDirection: 'row', // Zet de chips naast elkaar (standaard is kolom)
    gap: 8,               // Ruimte tussen de chips
    paddingRight: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
  },
  chipActive: {
    backgroundColor: 'orange', // Actieve chip krijgt oranje achtergrond
  },
  chipText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Fredoka_400Regular',
  },
  chipTextActive: {
    color: '#fff',
    fontFamily: 'Fredoka_700Bold',
  },
  pickerContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    overflow: 'hidden', // Zorgt dat de afgeronde hoeken zichtbaar blijven
  },
  picker: {
    height: 50,
  },
  resetButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Label links, switch rechts
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    padding: 4,
  },
  tabButton: {
    flex: 1, // Beide knoppen krijgen evenveel ruimte
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
