import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native';


const ProductCard = () => {
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                source={{ uri: 'https://cdn.prod.website-files.com/69a1b56f48f05c1e9552e901/69a855941fc6c0a8a82528e3_1f0de9b2-8edf-4190-ae14-d4dded1f52db_720x.webp' }}
                style={styles.image}
                resizeMode="contain"
                />
            </View>
            <Text>Title</Text>
            <Text>Desc</Text>
            <View style={styles.bottomRow}>
                <Text style={styles.title}>Price</Text>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Add to cart</Text>
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
        elevation: 4,              // Android shadow
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 10,

    },
    description: {
        fontSize: 14,
        color: '#999',
        marginBottom: 24,
        lineHeight: 22,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
})


export default ProductCard;