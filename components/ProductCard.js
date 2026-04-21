// ProductCard.js is een herbruikbaar component dat één product weergeeft als kaart.
// Het ontvangt gegevens via 'props' en toont die op een vaste manier.

import React, { useState, useEffect } from 'react';

// We importeren de benodigde React Native componenten
// Pressable is een knop die reageert op aanraking (moderner dan TouchableOpacity)
import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

// Lettertypes inladen
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';


// Dit is de component-functie. Tussen de accolades staan de 'props':
// gegevens die van buitenaf meegegeven worden aan dit component.
const ProductCard = ({title, description, price, image, onPress}) => {
    const navigation = useNavigation();

    // useFonts laadt de lettertypes. We destructureren fontsLoaded uit de array
    // (de tweede waarde is een error-object, die negeren we hier)
    const [fontsLoaded] = useFonts({
        Fredoka_400Regular,
        Fredoka_700Bold,
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold,
    });

    // Toon niets zolang de lettertypes nog laden
    if (!fontsLoaded) return null;

    return (
        // De kaart zelf: een witte View met afgeronde hoeken en een schaduw
        <View style={styles.card}>

            {/* Afbeeldingscontainer: centreert de afbeelding */}
            <View style={styles.imageContainer}>
                <Image
                    // source verwacht een object met een 'uri' voor online afbeeldingen
                    source={{ uri: image.uri }}
                    style={styles.image}
                    resizeMode="contain" // Afbeelding past volledig in de box zonder bijsnijden
                />
            </View>

            {/* Producttitel */}
            <Text style={styles.title}>{title}</Text>

            {/* Beschrijving: beperkt tot 4 regels gevolgd door ... */}
            <Text style={styles.description} numberOfLines={4} ellipsizeMode="tail">{description}</Text>

            {/* Onderste rij: prijs links, knop rechts */}
            <View style={styles.bottomRow}>
                {/* De prijs hergebruikt de title-stijl */}
                <Text style={styles.title}>{price}</Text>

                {/* Pressable is de knop. onPress roept de functie aan die meegegeven is als prop */}
                <Pressable
                    style={styles.button}
                    onPress={onPress}
                >
                    <Text style={styles.buttonText}>View more</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'orange',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        margin: 16,
        // Schaduw werkt anders op iOS (shadow*) dan op Android (elevation)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4, // Android schaduw
    },
    title: {
        fontSize: 22,
        color: '#111',
        marginBottom: 10,
        fontFamily: 'Fredoka_700Bold',
    },
    description: {
        fontSize: 14,
        color: '#999',
        marginBottom: 24,
        lineHeight: 22, // Ruimte tussen de regels
        fontFamily: 'Nunito_400Regular',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
    },
    bottomRow: {
        flexDirection: 'row',        // Elementen naast elkaar
        justifyContent: 'space-between', // Prijs helemaal links, knop helemaal rechts
        alignItems: 'center',        // Verticaal uitgelijnd in het midden
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
});


export default ProductCard;
