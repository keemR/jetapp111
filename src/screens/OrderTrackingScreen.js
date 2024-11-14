import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import OrderTimeline from '../components/OrderTimeline';
import OrderDetails from '../components/OrderDetails';
import { fetchOrderStatus } from '../api/orders';

const OrderTrackingScreen = ({ route }) => {
  const { orderId } = route.params;
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderData();
  }, [orderId]);

  const loadOrderData = async () => {
    try {
      const data = await fetchOrderStatus(orderId);
      setOrderData(data);
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.orderNumber, isRTL && styles.textRTL]}>
          {t('order.number')}: #{orderId}
        </Text>
        <Text style={[styles.orderStatus, isRTL && styles.textRTL]}>
          {t(`order.status.${orderData.status}`)}
        </Text>
      </View>

      <OrderTimeline 
        status={orderData.status}
        timeline={orderData.timeline}
        isRTL={isRTL}
      />

      <OrderDetails 
        order={orderData}
        isRTL={isRTL}
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 24,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 16,
    color: '#E91E63',
    fontWeight: '500',
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
});

export default OrderTrackingScreen; 