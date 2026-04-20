import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import { useState } from 'react';
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Nunito_400Regular } from '@expo-google-fonts/nunito';


const ProductDetail = ({route}) => {
    const {title, description, price, image} = route.params;
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => setQuantity(quantity + 1);
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
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} resizeMode="contain" />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Prijs</Text>
                        <View style={styles.priceBadge}>
                            <Text style={styles.priceValue}>€{parseFloat(price).toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionLabel}>Aantal</Text>
                    <View style={styles.quantityRow}>
                        <Pressable onPress={decreaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>−</Text>
                        </Pressable>
                        <Text style={styles.quantityValue}>{quantity}</Text>
                        <Pressable onPress={increaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </Pressable>

                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Totaal</Text>
                            <Text style={styles.totalValue}>€{(quantity * parseFloat(price)).toFixed(2)}</Text>
                        </View>
                    </View>

                    <Pressable style={styles.cartButton}>
                        <Text style={styles.cartButtonText}>In winkelwagen</Text>
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
        borderRadius: 20,
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
        borderRadius: 20,
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
        marginLeft: 'auto',
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
