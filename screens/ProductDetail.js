// ProductDetail.js toont de detailpagina van één product.
// Dit scherm krijgt productgegevens mee via 'route.params' vanuit de navigatie.

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';

// useState bewaren we de hoeveelheid die de gebruiker wil bestellen
import { useState } from 'react';
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Nunito_400Regular } from '@expo-google-fonts/nunito';


// 'route' is een prop die React Navigation automatisch meegeeft.
// Via route.params haal je de gegevens op die bij navigation.navigate() zijn meegegeven.
const ProductDetail = ({route}) => {
    // We destructureren de params: halen elk veld er apart uit
    const {title, description, price, image} = route.params;

    // quantity bijhouden: begint op 1
    const [quantity, setQuantity] = useState(1);

    // Verhoog de hoeveelheid met 1
    const increaseQuantity = () => setQuantity(quantity + 1);

    // Verlaag de hoeveelheid met 1, maar nooit lager dan 1
    const decreaseQuantity = () => { if (quantity > 1) setQuantity(quantity - 1); };

    const [fontsLoaded] = useFonts({
        Fredoka_400Regular,
        Fredoka_700Bold,
        Nunito_400Regular,
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>

                {/* Afbeelding die de volledige breedte van het scherm vult */}
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} resizeMode="contain" />
                </View>

                {/* Alle tekstuele content staat in een View met padding */}
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>

                    {/* Prijsrij: label links, oranje badge rechts */}
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Price</Text>
                        <View style={styles.priceBadge}>
                            {/* parseFloat zet de prijs om naar een getal, toFixed(2) zorgt voor 2 decimalen */}
                            <Text style={styles.priceValue}>€{parseFloat(price).toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Een dunne horizontale lijn als scheiding */}
                    <View style={styles.divider} />

                    {/* Hoeveelheid-sectie */}
                    <Text style={styles.sectionLabel}>Quantity</Text>
                    <View style={styles.quantityRow}>

                        {/* Min-knop: roept decreaseQuantity aan */}
                        <Pressable onPress={decreaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>−</Text>
                        </Pressable>

                        {/* Huidige hoeveelheid tonen */}
                        <Text style={styles.quantityValue}>{quantity}</Text>

                        {/* Plus-knop */}
                        <Pressable onPress={increaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </Pressable>

                        {/* Totaalprijs: hoeveelheid × prijs, afgerond op 2 decimalen */}
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>€{(quantity * parseFloat(price)).toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* "Add to cart" knop onderaan. De onPress-functie is hier nog niet gekoppeld
                        aan een winkelwagenfunctie — dat kan later uitgebreid worden. */}
                    <Pressable style={styles.cartButton}>
                        <Text style={styles.cartButtonText}>Add to cart</Text>
                    </Pressable>
                </View>
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
        width: '100%',
        height: 280,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 28,
        color: '#111',
        fontFamily: 'Fredoka_700Bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: '#999',
        lineHeight: 24,
        fontFamily: 'Nunito_400Regular',
        marginBottom: 24,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    priceLabel: {
        fontSize: 16,
        color: '#888',
        fontFamily: 'Fredoka_700Bold',
    },
    priceBadge: {
        backgroundColor: 'orange',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20, // Volledig afgerond = pill-vorm
    },
    priceValue: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Fredoka_700Bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 16,
        color: '#888',
        fontFamily: 'Fredoka_700Bold',
        marginBottom: 12,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    quantityButton: {
        backgroundColor: 'orange',
        width: 40,
        height: 40,
        borderRadius: 20, // Ronde knop
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Fredoka_700Bold',
        lineHeight: 26,
    },
    quantityValue: {
        fontSize: 22,
        fontFamily: 'Fredoka_700Bold',
        color: '#111',
        marginHorizontal: 20,
        minWidth: 24,
        textAlign: 'center',
    },
    totalContainer: {
        marginLeft: 'auto', // Duwt de totaalprijs naar rechts
        alignItems: 'flex-end',
    },
    totalLabel: {
        fontSize: 13,
        color: '#aaa',
        fontFamily: 'Fredoka_400Regular',
    },
    totalValue: {
        fontSize: 22,
        color: '#111',
        fontFamily: 'Fredoka_700Bold',
    },
    cartButton: {
        backgroundColor: 'orange',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
    },
    cartButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Fredoka_700Bold',
    },
});

export default ProductDetail;
