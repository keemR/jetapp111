import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelector } from 'react-redux';
import StepIndicator from '../components/StepIndicator';
import ShippingForm from '../components/ShippingForm';
import PaymentForm from '../components/PaymentForm';
import OrderSummary from '../components/OrderSummary';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckoutScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const cart = useSelector(state => state.cart);
  const isRTL = language === 'ar';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});

  const steps = [
    { label: t('checkout.shipping'), icon: 'local-shipping' },
    { label: t('checkout.payment'), icon: 'payment' },
    { label: t('checkout.review'), icon: 'receipt' },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShippingForm
            data={shippingData}
            onSubmit={(data) => {
              setShippingData(data);
              setCurrentStep(1);
            }}
            isRTL={isRTL}
          />
        );
      case 1:
        return (
          <PaymentForm
            data={paymentData}
            onSubmit={(data) => {
              setPaymentData(data);
              setCurrentStep(2);
            }}
            isRTL={isRTL}
          />
        );
      case 2:
        return (
          <OrderSummary
            cart={cart}
            shipping={shippingData}
            payment={paymentData}
            onPlaceOrder={handlePlaceOrder}
            isRTL={isRTL}
          />
        );
      default:
        return null;
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Process order logic here
      navigation.navigate('OrderConfirmation', {
        orderId: 'ORDER123', // Replace with actual order ID
      });
    } catch (error) {
      console.error('Order error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, isRTL && styles.backButtonRTL]}
        >
          <Icon 
            name={isRTL ? "chevron-right" : "chevron-left"} 
            size={28} 
            color="#333" 
          />
        </TouchableOpacity>
        <Text style={[styles.title, isRTL && styles.textRTL]}>
          {t('checkout.title')}
        </Text>
      </View>

      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        isRTL={isRTL}
      />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {renderStepContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  backButtonRTL: {
    transform: [{ scaleX: -1 }],
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
    marginLeft: 0,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});

export default CheckoutScreen; 