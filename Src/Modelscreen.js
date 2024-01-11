import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button, Slider } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

const FilterModal = ({ isVisible, onClose, onApplyFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPrice, setCurrentPrice] = useState(priceRange[0]);

  const applyFilter = () => {
    onClose();
    onApplyFilter(priceRange[0], priceRange[1]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter by Price</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1000}
            step={1}
            value={currentPrice}
            onValueChange={(value) => setCurrentPrice(value)}
            onSlidingComplete={(value) => setPriceRange([value, priceRange[1]])}
            thumbTintColor="#007BFF"
            minimumTrackTintColor="#007BFF"
          />
          <View style={styles.rangeLabels}>
            <Text style={styles.rangeLabel}>Min: ${priceRange[0].toFixed(2)}</Text>
            <Text style={styles.rangeLabel}>Max: ${priceRange[1].toFixed(2)}</Text>
          </View>
          <Text style={styles.currentPrice}>Selected Price: ${currentPrice.toFixed(2)}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Apply " onPress={applyFilter} buttonStyle={styles.applyButton} />
            <Button title="Close" onPress={onClose} buttonStyle={styles.closeButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: width * 0.05,
    borderRadius: 16,
    width: width * 0.8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#007BFF',
  },
  slider: {
    width: width * 0.7,
    marginBottom: 16,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   marginBottom:20
  },
  rangeLabel: {
    fontSize: 16,
    color: 'red',
  },
  currentPrice: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    width: 120,
  },
  closeButton: {
    backgroundColor: 'gray',
    borderRadius: 8,
    width: 120,
  },
});

export default FilterModal;
