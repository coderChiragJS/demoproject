import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native';

const AddProductScreen = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleAddProduct = async () => {
    try {


      
      if (!title || !price || !category || !description || !image) {
        Alert.alert('Error', 'All fields are required');
        return;
      }

      if (!/^\d+$/.test(price)) {
        Alert.alert('Error', 'Price should be a valid number');
        return;
      }

      
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify({
          title,
          price: parseFloat(price),
          description,
          image,
          category,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

   
      if (response.ok) {
        Alert.alert('Success', 'Thank you! Your product is added.');
        console.log('Product added successfully:', response);
        
        setTitle('');
        setPrice('');
        setCategory('');
        setDescription('');
        setImage('');
      } else {

       
        Alert.alert('Error', 'Failed to add product. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Add New Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        numberOfLines={3}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={(text) => setImage(text)}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonLabel}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007BFF',
  },
  input: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProductScreen;