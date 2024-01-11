


import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from 'react-native';
import { Button } from 'react-native-elements';
import FilterModal from './Modelscreen';


const ListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const applyFilter = useCallback((minPrice, maxPrice) => {
    const filteredItems = data.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );
    setFilteredData(filteredItems);
    closeFilterModal();
  }, [data]);

  const fetchData = useCallback(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
        setRefreshing(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = useCallback(
    (text) => {
      const filteredItems = data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setSearchQuery(text);
      setFilteredData(filteredItems);
    },
    [data]
  );


  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setSearchQuery('');
    setFilteredData(data);
    fetchData();
  }, [fetchData]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', { item })}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.textContainer}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
        <Text style={styles.itemDescription} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <Button
            title="Filter by"
            onPress={openFilterModal}
            containerStyle={styles.filterButtonContainer}
            buttonStyle={styles.filterButton}
            titleStyle={styles.filterButtonText}
          />
        </View>
        
      </View>
      <Button
        title="Add Product"
        onPress={() => {
          navigation.navigate('AddProduct');
        }}
        containerStyle={styles.addButtonContainer}
        buttonStyle={styles.addButton}
        titleStyle={styles.addButtonText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredData.length === 0 ? (
        <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={closeFilterModal}
        onApplyFilter={applyFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 10,
    backgroundColor: '#007BFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  filterButtonContainer: {
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 16,
    elevation: 3,
    flexDirection: 'row',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007BFF',
  },
  itemDescription: {
    fontSize: 16,
    color: '#555',
  },
  itemPrice: {
    fontSize: 16,
    color: 'red',
  },
  
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },

 
  addButtonContainer: {
    marginTop: 10,
    marginHorizontal: 100,
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding:5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ListScreen;
