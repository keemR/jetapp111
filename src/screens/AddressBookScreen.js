import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddressForm from '../components/AddressForm';

const AddressBookScreen = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [showAddForm, setShowAddForm] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      type: 'home',
      isDefault: true,
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1234567890',
    },
    // Add more sample addresses
  ]);

  const handleDeleteAddress = (addressId) => {
    Alert.alert(
      t('address.deleteTitle'),
      t('address.deleteConfirm'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.delete'),
          onPress: () => {
            setAddresses(prev => prev.filter(addr => addr.id !== addressId));
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleSetDefault = (addressId) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  const renderAddress = (address) => (
    <View 
      key={address.id} 
      style={[styles.addressCard, isRTL && styles.addressCardRTL]}
    >
      <View style={styles.addressHeader}>
        <View style={[styles.addressType, isRTL && styles.addressTypeRTL]}>
          <Icon 
            name={address.type === 'home' ? 'home' : 'business'} 
            size={20} 
            color="#666" 
          />
          <Text style={[styles.addressTypeText, isRTL && styles.textRTL]}>
            {t(`address.type.${address.type}`)}
          </Text>
        </View>
        {address.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>
              {t('address.default')}
            </Text>
          </View>
        )}
      </View>

      <Text style={[styles.addressText, isRTL && styles.textRTL]}>
        {`${address.firstName} ${address.lastName}\n${address.street}\n${address.city}, ${address.state} ${address.zipCode}\n${address.country}`}
      </Text>

      <Text style={[styles.phoneText, isRTL && styles.textRTL]}>
        {address.phone}
      </Text>

      <View style={[styles.actions, isRTL && styles.actionsRTL]}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteAddress(address.id)}
        >
          <Icon name="delete" size={20} color="#E91E63" />
          <Text style={[styles.actionText, styles.deleteText]}>
            {t('common.delete')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {/* Handle edit */}}
        >
          <Icon name="edit" size={20} color="#666" />
          <Text style={styles.actionText}>
            {t('common.edit')}
          </Text>
        </TouchableOpacity>

        {!address.isDefault && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSetDefault(address.id)}
          >
            <Icon name="star" size={20} color="#666" />
            <Text style={styles.actionText}>
              {t('address.setDefault')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {addresses.map(renderAddress)}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddForm(true)}
      >
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>
          {t('address.addNew')}
        </Text>
      </TouchableOpacity>

      {showAddForm && (
        <AddressForm
          onClose={() => setShowAddForm(false)}
          onSubmit={(newAddress) => {
            setAddresses(prev => [...prev, { id: Date.now().toString(), ...newAddress }]);
            setShowAddForm(false);
          }}
          isRTL={isRTL}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  addressCardRTL: {
    direction: 'rtl',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTypeRTL: {
    flexDirection: 'row-reverse',
  },
  addressTypeText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  defaultBadge: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  addressText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  phoneText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  actionsRTL: {
    flexDirection: 'row-reverse',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    padding: 4,
  },
  actionText: {
    marginLeft: 4,
    color: '#666',
  },
  deleteText: {
    color: '#E91E63',
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#E91E63',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AddressBookScreen; 