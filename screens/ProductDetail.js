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
        <Text>Product Detail</Text>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>

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

                <Text style={styles.totalPrice}>Total: €{(quantity * parseFloat(price.replace('€', ''))).toFixed(2)}</Text>
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
  },
  
});

export default ProductDetail;
