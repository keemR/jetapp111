import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const numColumns = 2;

const ProductList = ({ products, onProductPress }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <FlatList
      data={products}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <ProductCard 
          product={item}
          onPress={() => onProductPress(item)}
          isRTL={isRTL}
        />
      )}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={[
        styles.container,
        isRTL && styles.containerRTL
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  containerRTL: {
    direction: 'rtl',
  },
});

export default ProductList; 