// BlogCard.js is een herbruikbaar component dat één blogpost weergeeft als kaart.
// Het heeft dezelfde opbouw als ProductCard, maar zonder prijs en met een afbeelding
// die de bovenkant van de kaart volledig bedekt.

import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Lettertypes inladen: Fredoka voor titels, Nunito voor beschrijvingen
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Nunito_400Regular } from '@expo-google-fonts/nunito';


// De props die dit component verwacht: title, description, image en onPress (een functie)
const BlogCard = ({title, description, image, onPress}) => {
    const navigation = useNavigation();

    // Lettertypes laden en wachten tot ze klaar zijn
    const [fontsLoaded] = useFonts({
        Fredoka_400Regular,
        Fredoka_700Bold,
        Nunito_400Regular,
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.card}>

            {/* Afbeeldingscontainer: de afbeelding bedekt de volledige bovenkant van de kaart.
                Negatieve margins (-20) compenseren de padding van de kaart zodat de afbeelding
                tot aan de randen loopt. */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: image.uri }}
                    style={styles.image}
                    resizeMode="cover" // 'cover' vult de container volledig, snijdt bij indien nodig
                />
            </View>

            {/* Blogtitel */}
            <Text style={styles.title}>{title}</Text>

            {/* Korte samenvatting van de blogpost */}
            <Text style={styles.description}>{description}</Text>

            {/* Onderste rij met de "Read more" knop */}
            <View style={styles.bottomRow}>
                <Pressable
                    style={styles.button}
                    onPress={onPress} // onPress navigeert naar de BlogDetail pagina
                >
                    <Text style={styles.buttonText}>Read more</Text>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
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
        lineHeight: 22,
        fontFamily: 'Nunito_400Regular',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        marginBottom: 20,
        height: 200,
        // Alleen de bovenste hoeken zijn afgerond zodat de afbeelding
        // mooi aansluit bij de afgeronde bovenkant van de kaart
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden', // Knipt de afbeelding bij zodat de afronding zichtbaar blijft
        marginHorizontal: -20, // Compenseert de padding van de kaart (links en rechts)
        marginTop: -20,        // Compenseert de padding van de kaart (boven)
    },
    image: {
        width: '100%',
        height: '100%',
    },
});


export default BlogCard;
