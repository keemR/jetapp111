import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import CartItem from '../components/CartItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CartScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const isRTL = language === 'ar';

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  if (cart.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="shopping-cart" size={64} color="#ccc" />
        <Text style={[styles.emptyText, isRTL && styles.textRTL]}>
          {t('cart.empty')}
        </Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.continueButtonText, isRTL && styles.textRTL]}>
            {t('cart.continueShopping')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemsList}>
        {cart.items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            isRTL={isRTL}
          />
        ))}
      </ScrollView>

      <View style={[styles.summary, isRTL && styles.summaryRTL]}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, isRTL && styles.textRTL]}>
            {t('cart.subtotal')}
          </Text>
          <Text style={[styles.summaryValue, isRTL && styles.textRTL]}>
            {t('common.currency')} {cart.subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, isRTL && styles.textRTL]}>
            {t('cart.shipping')}
          </Text>
          <Text style={[styles.summaryValue, isRTL && styles.textRTL]}>
            {t('common.currency')} {cart.shipping.toFixed(2)}
          </Text>
        </View>

        <View style={[styles.totalRow, isRTL && styles.totalRowRTL]}>
          <Text style={[styles.totalLabel, isRTL && styles.textRTL]}>
            {t('cart.total')}
          </Text>
          <Text style={[styles.totalValue, isRTL && styles.textRTL]}>
            {t('common.currency')} {cart.total.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutButtonText}>
            {t('cart.proceedToCheckout')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  continueButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemsList: {
    flex: 1,
  },
  summary: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  summaryRTL: {
    direction: 'rtl',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalRowRTL: {
    flexDirection: 'row-reverse',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E91E63',
  },
  checkoutButton: {
    backgroundColor: '#E91E63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CartScreen; 