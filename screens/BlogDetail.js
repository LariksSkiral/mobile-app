import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, useWindowDimensions } from 'react-native';
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Nunito_400Regular } from '@expo-google-fonts/nunito';
import RenderHtml from 'react-native-render-html';


const BlogDetail = ({route}) => {
    const {title, description, content, image} = route.params;
    const { width } = useWindowDimensions();

    const [fontsLoaded] = useFonts({
        Fredoka_400Regular,
        Fredoka_700Bold,
        Nunito_400Regular,
    });

    if (!fontsLoaded) return null;

    const tagsStyles = {
        body: {
            fontFamily: 'Nunito_400Regular',
            fontSize: 15,
            color: '#555',
            lineHeight: 26,
        },
        p: {
            marginBottom: 12,
        },
        h1: { fontFamily: 'Fredoka_700Bold', color: '#111', fontSize: 24 },
        h2: { fontFamily: 'Fredoka_700Bold', color: '#111', fontSize: 20 },
        h3: { fontFamily: 'Fredoka_700Bold', color: '#111', fontSize: 18, fontWeight: 'bold' },
        a: { color: 'orange' },
        strong: { fontFamily: 'Nunito_400Regular', fontWeight: 'bold' },
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} resizeMode="cover" />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.summary}>{description}</Text>
                    <View style={styles.divider} />
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
        color: '#999',
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
