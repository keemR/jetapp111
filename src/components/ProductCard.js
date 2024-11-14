import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 32) / 2;

const ProductCard = ({ product, onPress, isRTL }) => {
  const { t } = useTranslation();

  const {
    name,
    name_ar,
    price,
    sale_price,
    images,
    stock_status,
    categories,
  } = product;

  return (
    <TouchableOpacity 
      style={[styles.card, isRTL && styles.cardRTL]} 
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{ uri: images[0]?.src }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {sale_price && (
          <View style={styles.saleTag}>
            <Text style={styles.saleText}>
              {t('product.sale')}
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.details, isRTL && styles.detailsRTL]}>
        <Text 
          style={[styles.category, isRTL && styles.textRTL]}
          numberOfLines={1}
        >
          {isRTL ? categories[0]?.name_ar : categories[0]?.name}
        </Text>

        <Text 
          style={[styles.name, isRTL && styles.textRTL]}
          numberOfLines={2}
        >
          {isRTL ? name_ar : name}
        </Text>

        <View style={[styles.priceContainer, isRTL && styles.priceContainerRTL]}>
          {sale_price ? (
            <>
              <Text style={[styles.salePrice, isRTL && styles.textRTL]}>
                {t('common.currency')} {sale_price}
              </Text>
              <Text style={[styles.originalPrice, isRTL && styles.textRTL]}>
                {t('common.currency')} {price}
              </Text>
            </>
          ) : (
            <Text style={[styles.price, isRTL && styles.textRTL]}>
              {t('common.currency')} {price}
            </Text>
          )}
        </View>

        {stock_status === 'instock' ? (
          <TouchableOpacity 
            style={[styles.addToCartButton, isRTL && styles.addToCartButtonRTL]}
          >
            <Icon name="add-shopping-cart" size={20} color="#fff" />
            <Text style={styles.addToCartText}>
              {t('product.addToCart')}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={[styles.outOfStock, isRTL && styles.textRTL]}>
            {t('product.outOfStock')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardRTL: {
    direction: 'rtl',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: cardWidth,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  saleTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#E91E63',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  saleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    padding: 12,
  },
  detailsRTL: {
    alignItems: 'flex-end',
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceContainerRTL: {
    flexDirection: 'row-reverse',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E91E63',
  },
  salePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E91E63',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E91E63',
    padding: 8,
    borderRadius: 4,
  },
  addToCartButtonRTL: {
    flexDirection: 'row-reverse',
  },
  addToCartText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  outOfStock: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});

export default ProductCard; 