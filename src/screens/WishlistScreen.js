import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

const WishlistScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    // Show success message
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="favorite-border" size={64} color="#ccc" />
      <Text style={[styles.emptyText, isRTL && styles.textRTL]}>
        {t('wishlist.empty')}
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.browseButtonText}>
          {t('wishlist.browse')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderWishlistItem = ({ item }) => (
    <View style={[styles.productCard, isRTL && styles.productCardRTL]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
      >
        <FastImage
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>

      <View style={[styles.productInfo, isRTL && styles.productInfoRTL]}>
        <Text style={[styles.productName, isRTL && styles.textRTL]}>
          {isRTL ? item.name_ar : item.name}
        </Text>
        
        <Text style={[styles.productPrice, isRTL && styles.textRTL]}>
          {t('common.currency')} {item.price}
        </Text>

        <View style={[styles.actions, isRTL && styles.actionsRTL]}>
          <TouchableOpacity
            style={[styles.actionButton, styles.removeButton]}
            onPress={() => handleRemoveFromWishlist(item.id)}
          >
            <Icon name="delete" size={20} color="#E91E63" />
            <Text style={[styles.actionText, styles.removeText]}>
              {t('common.remove')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.addToCartButton]}
            onPress={() => handleAddToCart(item)}
          >
            <Icon name="shopping-cart" size={20} color="#fff" />
            <Text style={[styles.actionText, styles.addToCartText]}>
              {t('common.addToCart')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        renderItem={renderWishlistItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  productCardRTL: {
    flexDirection: 'row-reverse',
  },
  productImage: {
    width: 120,
    height: 120,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productInfoRTL: {
    alignItems: 'flex-end',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#E91E63',
    fontWeight: '600',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionsRTL: {
    flexDirection: 'row-reverse',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  removeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  addToCartButton: {
    backgroundColor: '#E91E63',
    marginLeft: 8,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  removeText: {
    color: '#E91E63',
  },
  addToCartText: {
    color: '#fff',
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
});

export default WishlistScreen; 