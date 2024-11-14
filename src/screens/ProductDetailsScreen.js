import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import ImageGallery from '../components/ImageGallery';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { t } = useTranslation();
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const isRTL = language === 'ar';
  
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      variant: selectedVariant,
      quantity,
    }));
    // Show success message
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageGallery images={product.images} />

        <View style={[styles.content, isRTL && styles.contentRTL]}>
          <Text style={[styles.category, isRTL && styles.textRTL]}>
            {isRTL ? product.categories[0]?.name_ar : product.categories[0]?.name}
          </Text>

          <Text style={[styles.name, isRTL && styles.textRTL]}>
            {isRTL ? product.name_ar : product.name}
          </Text>

          <View style={[styles.priceRow, isRTL && styles.priceRowRTL]}>
            {product.sale_price ? (
              <>
                <Text style={[styles.salePrice, isRTL && styles.textRTL]}>
                  {t('common.currency')} {product.sale_price}
                </Text>
                <Text style={[styles.originalPrice, isRTL && styles.textRTL]}>
                  {t('common.currency')} {product.price}
                </Text>
              </>
            ) : (
              <Text style={[styles.price, isRTL && styles.textRTL]}>
                {t('common.currency')} {product.price}
              </Text>
            )}
          </View>

          {product.variations?.length > 0 && (
            <View style={styles.variations}>
              <Text style={[styles.variationTitle, isRTL && styles.textRTL]}>
                {t('product.selectVariation')}
              </Text>
              {/* Render variations */}
            </View>
          )}

          <View style={styles.quantityContainer}>
            <Text style={[styles.quantityLabel, isRTL && styles.textRTL]}>
              {t('product.quantity')}
            </Text>
            <View style={[styles.quantityControls, isRTL && styles.quantityControlsRTL]}>
              <TouchableOpacity 
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                style={styles.quantityButton}
              >
                <Icon name="remove" size={20} color="#666" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity 
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
              >
                <Icon name="add" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Icon name="shopping-cart" size={24} color="#fff" />
            <Text style={styles.addToCartText}>
              {t('product.addToCart')}
            </Text>
          </TouchableOpacity>

          <View style={styles.description}>
            <Text style={[styles.descriptionTitle, isRTL && styles.textRTL]}>
              {t('product.description')}
            </Text>
            <HTML 
              source={{ html: isRTL ? product.description_ar : product.description }}
              contentWidth={width - 32}
              tagsStyles={{
                p: [styles.descriptionText, isRTL && styles.textRTL],
              }}
            />
          </View>
        </View>
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
    padding: 16,
  },
  contentRTL: {
    direction: 'rtl',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  priceRowRTL: {
    flexDirection: 'row-reverse',
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#E91E63',
  },
  salePrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#E91E63',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  variations: {
    marginBottom: 24,
  },
  variationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityControlsRTL: {
    flexDirection: 'row-reverse',
  },
  quantityButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  quantity: {
    paddingHorizontal: 20,
    fontSize: 18,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E91E63',
    padding: 8,
    borderRadius: 4,
  },
  addToCartText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductDetailsScreen; 