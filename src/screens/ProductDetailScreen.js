import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import ImageGallery from '../components/ImageGallery';
import HTML from 'react-native-render-html';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.images[0]?.src,
      variant: selectedVariant,
    };
    dispatch(addToCart(itemToAdd));
  };

  return (
    <ScrollView style={styles.container}>
      <ImageGallery images={product.images} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${parseFloat(product.price).toFixed(2)}</Text>
        
        {product.variations?.length > 0 && (
          <View style={styles.variantsContainer}>
            {product.attributes.map((attr) => (
              <View key={attr.id} style={styles.attributeContainer}>
                <Text style={styles.attributeTitle}>{attr.name}</Text>
                <View style={styles.optionsContainer}>
                  {attr.options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.optionButton,
                        selectedVariant === option && styles.selectedOption,
                      ]}
                      onPress={() => setSelectedVariant(option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        <HTML 
          source={{ html: product.description }} 
          contentWidth={width - 32}
          tagsStyles={{
            p: styles.description,
          }}
        />

        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 16,
  },
  variantsContainer: {
    marginBottom: 16,
  },
  attributeContainer: {
    marginBottom: 12,
  },
  attributeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
  optionText: {
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#E91E63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProductDetailScreen; 