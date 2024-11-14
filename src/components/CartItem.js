import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CartItem = ({ item, onQuantityChange, isRTL }) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, isRTL && styles.containerRTL]}>
      <FastImage
        source={{ uri: item.images[0]?.src }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={[styles.details, isRTL && styles.detailsRTL]}>
        <Text style={[styles.name, isRTL && styles.textRTL]} numberOfLines={2}>
          {isRTL ? item.name_ar : item.name}
        </Text>

        {item.variant && (
          <Text style={[styles.variant, isRTL && styles.textRTL]}>
            {isRTL ? item.variant.name_ar : item.variant.name}
          </Text>
        )}

        <Text style={[styles.price, isRTL && styles.textRTL]}>
          {t('common.currency')} {(item.price * item.quantity).toFixed(2)}
        </Text>

        <View style={[styles.quantityContainer, isRTL && styles.quantityContainerRTL]}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onQuantityChange(item.id, item.quantity - 1)}
          >
            <Icon name="remove" size={20} color="#666" />
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onQuantityChange(item.id, item.quantity + 1)}
          >
            <Icon name="add" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onQuantityChange(item.id, 0)}
      >
        <Icon name="close" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  containerRTL: {
    flexDirection: 'row-reverse',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  detailsRTL: {
    marginLeft: 0,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  variant: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E91E63',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainerRTL: {
    flexDirection: 'row-reverse',
  },
  quantityButton: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  removeButton: {
    padding: 4,
  },
});

export default CartItem; 