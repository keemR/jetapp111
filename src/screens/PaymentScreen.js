import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import Header from '../components/Header';

const PaymentScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);
  const isRTL = language === 'ar';

  const handlePayment = async () => {
    try {
      setLoading(true);
      // Payment processing logic here
      navigation.navigate('OrderConfirmation');
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('payment.title')}
        showBack
        navigation={navigation}
      />
      
      <View style={[styles.content, isRTL && styles.contentRTL]}>
        <Text style={[styles.label, isRTL && styles.textRTL]}>
          {t('payment.cardDetails')}
        </Text>
        
        <CardField
          postalCodeEnabled={true}
          style={styles.cardField}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
        />

        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>
              {t('payment.pay')}
            </Text>
          )}
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
  content: {
    padding: 16,
  },
  contentRTL: {
    direction: 'rtl',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  textRTL: {
    textAlign: 'right',
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 16,
  },
  payButton: {
    backgroundColor: '#E91E63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PaymentScreen; 