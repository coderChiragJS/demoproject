import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity,Alert } from 'react-native';

const DetailScreen = ({ route }) => {
  const { item } = route.params;



  const handleAddToCart = () => {
    Alert.alert(
      'Item Added to Cart',
      'Your item has been successfully added to the cart.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  };



  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.itemImage}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.actionButton} onPress={handleAddToCart}>
          <Text style={styles.actionButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  itemImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E3D4E',
    marginBottom: 12,
  },
  itemDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
