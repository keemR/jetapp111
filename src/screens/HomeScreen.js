import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import CategorySlider from '../components/CategorySlider';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts, fetchCategories } from '../api/wordpress';

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isRTL = language === 'ar';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Header 
        title={t('home.title')} 
        showCart 
        navigation={navigation} 
      />
      
      <ScrollView
        style={[styles.content, isRTL && styles.contentRTL]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CategorySlider 
          categories={categories}
          onCategoryPress={(category) => 
            navigation.navigate('Category', { category })
          }
        />
        
        <ProductGrid 
          products={products}
          onProductPress={(product) => 
            navigation.navigate('ProductDetail', { product })
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  contentRTL: {
    transform: [{ scaleX: I18nManager.isRTL ? 1 : -1 }],
  },
});

export default HomeScreen; 