import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Image } from 'react-native';
import { Pressable } from 'react-native';
import { useState } from 'react';




const BlogDetail = ({route}) => {
    const {title, description, image} = route.params;


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
    detailsContainer: {
        paddingHorizontal: 20,
    },
  
});

export default BlogDetail;
