// BlogDetail.js toont de volledige inhoud van één blogpost.
// De bloggegevens worden via route.params ontvangen vanuit de navigatie.

import { StatusBar } from 'expo-status-bar';

// useWindowDimensions geeft de breedte en hoogte van het scherm terug.
// We hebben de breedte nodig om de HTML-content correct op te maken.
import { StyleSheet, Text, View, ScrollView, Image, useWindowDimensions } from 'react-native';

import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Nunito_400Regular } from '@expo-google-fonts/nunito';

// RenderHtml is een externe bibliotheek die HTML-tekst omzet naar React Native componenten.
// Dit is nodig omdat Webflow de bloginhoud als HTML opslaat (met <p>, <h2>, etc.)
import RenderHtml from 'react-native-render-html';


const BlogDetail = ({route}) => {
    // We halen alle meegegeven gegevens op uit de navigatieparameters
    const {title, description, content, image} = route.params;

    // De schermbreedte ophalen — we gebruiken dit voor de breedte van de HTML-renderer
    const { width } = useWindowDimensions();

    const [fontsLoaded] = useFonts({
        Fredoka_400Regular,
        Fredoka_700Bold,
        Nunito_400Regular,
    });

    if (!fontsLoaded) return null;

    // tagsStyles bepaalt hoe HTML-elementen eruit zien.
    // Elk sleutelwoord (body, p, h1...) komt overeen met een HTML-tag.
    const tagsStyles = {
        body: {
            fontFamily: 'Nunito_400Regular',
            fontSize: 15,
            color: '#555',
            lineHeight: 26,
        },
        p: {
            marginBottom: 12, // Extra ruimte onder elke alinea
        },
        // Koppen in verschillende groottes, allemaal met het Fredoka lettertype
        h1: { fontFamily: 'Fredoka_700Bold', color: '#111', fontSize: 24 },
        h2: { fontFamily: 'Fredoka_700Bold', color: '#111', fontSize: 20 },
        h3: { fontFamily: 'Fredoka_700Bold', color: '#111', fontSize: 18, fontWeight: 'bold' },
        a: { color: 'orange' }, // Links in oranje
        strong: { fontFamily: 'Nunito_400Regular', fontWeight: 'bold' }, // Vetgedrukte tekst
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>

                {/* Cover-afbeelding bovenaan, vult de volledige breedte */}
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} resizeMode="cover" />
                </View>

                <View style={styles.content}>
                    {/* Blogtitel */}
                    <Text style={styles.title}>{title}</Text>

                    {/* Samenvatting van de blog (description/summary uit Webflow) */}
                    <Text style={styles.summary}>{description}</Text>

                    {/* Dunne scheidingslijn tussen samenvatting en volledige inhoud */}
                    <View style={styles.divider} />

                    {/* RenderHtml zet de HTML-string om naar zichtbare tekst met opmaak.
                        contentWidth moet de beschikbare breedte zijn (scherm min padding aan beide kanten).
                        source={{ html: content }} is de HTML-string die gerenderd wordt. */}
                    <RenderHtml
                        contentWidth={width - 48}
                        source={{ html: content }}
                        tagsStyles={tagsStyles}
                    />
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
        marginBottom: 16,
    },
    summary: {
        fontSize: 15,
        color: '#999', // Lichtgrijs om te onderscheiden van de hoofdinhoud
        lineHeight: 24,
        fontFamily: 'Nunito_400Regular',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
});

export default BlogDetail;
