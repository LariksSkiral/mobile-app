import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Image } from 'react-native';
import { Pressable } from 'react-native';
import { useState } from 'react';




const ProductDetail = ({route}) => {
    const {title, description, price, image} = route.params;

    const [quantity, setQuantity] = useState(1); //declareren van variables in react native
    const increaseQuantity = () => {setQuantity(quantity + 1)};
    const decreaseQuantity = () => { if (quantity > 1) { setQuantity(quantity - 1) } };
  return (
   <View style={styles.container}>
    <StatusBar style="auto" />
    <ScrollView>
        <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        </View>
        
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>€{price}</Text>
        </View>

        <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantityControls}>
                <Pressable onPress={decreaseQuantity} style={styles.quantityButton}>
                    <Text style={styles.buttonText}>-</Text>
                </Pressable>

                <Text style={styles.quantityValue}>{quantity}</Text>

                <Pressable onPress={increaseQuantity} style={styles.quantityButton}>
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>

                <Text style={styles.totalPrice}>Total: €{(quantity * parseFloat(price)).toFixed(2)}</Text>
            </View>
        </View>
    </ScrollView>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
  },
    imageContainer: {
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    }, 
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    price: {
        fontSize: 20,
        color: 'green',
        marginBottom: 20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    quantityLabel: {
        fontSize: 18,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
    },
    quantityValue: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    totalPrice: {
        fontSize: 18,
        marginLeft: 20,
    },  
    detailsContainer: {
        paddingHorizontal: 20,
    },
  
});

export default ProductDetail;
