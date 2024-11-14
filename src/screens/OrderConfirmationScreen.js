import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { orderId, paymentId } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.successIcon}>
        <Icon name="check-circle" size={80} color="#4CAF50" />
      </View>

      <Text style={styles.title}>Order Confirmed!</Text>
      <Text style={styles.subtitle}>
        Thank you for your purchase
      </Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Order ID:</Text>
          <Text style={styles.value}>{orderId}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Payment ID:</Text>
          <Text style={styles.value}>{paymentId}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewOrderButton}
          onPress={() => navigation.navigate('OrderDetails', { orderId })}
        >
          <Text style={styles.viewOrderText}>View Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.continueText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  successIcon: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  detailsContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    gap: 16,
  },
  viewOrderButton: {
    backgroundColor: '#E91E63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  continueText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderConfirmationScreen; 