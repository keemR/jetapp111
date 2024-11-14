import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const AddressForm = ({ address, setAddress, isRTL }) => {
  const { t } = useTranslation();

  const inputStyle = [styles.input, isRTL && styles.inputRTL];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={[inputStyle, styles.halfInput]}
          placeholder={t('address.firstName')}
          value={address.firstName}
          onChangeText={(text) => setAddress({ ...address, firstName: text })}
          textAlign={isRTL ? 'right' : 'left'}
        />
        <TextInput
          style={[inputStyle, styles.halfInput]}
          placeholder={t('address.lastName')}
          value={address.lastName}
          onChangeText={(text) => setAddress({ ...address, lastName: text })}
          textAlign={isRTL ? 'right' : 'left'}
        />
      </View>

      <TextInput
        style={inputStyle}
        placeholder={t('address.email')}
        value={address.email}
        onChangeText={(text) => setAddress({ ...address, email: text })}
        keyboardType="email-address"
        textAlign={isRTL ? 'right' : 'left'}
      />

      <TextInput
        style={inputStyle}
        placeholder={t('address.phone')}
        value={address.phone}
        onChangeText={(text) => setAddress({ ...address, phone: text })}
        keyboardType="phone-pad"
        textAlign={isRTL ? 'right' : 'left'}
      />

      <TextInput
        style={inputStyle}
        placeholder={t('address.streetAddress')}
        value={address.address}
        onChangeText={(text) => setAddress({ ...address, address: text })}
        textAlign={isRTL ? 'right' : 'left'}
      />

      <View style={styles.row}>
        <TextInput
          style={[inputStyle, styles.halfInput]}
          placeholder={t('address.city')}
          value={address.city}
          onChangeText={(text) => setAddress({ ...address, city: text })}
          textAlign={isRTL ? 'right' : 'left'}
        />
        <TextInput
          style={[inputStyle, styles.halfInput]}
          placeholder={t('address.state')}
          value={address.state}
          onChangeText={(text) => setAddress({ ...address, state: text })}
          textAlign={isRTL ? 'right' : 'left'}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          style={[inputStyle, styles.halfInput]}
          placeholder={t('address.country')}
          value={address.country}
          onChangeText={(text) => setAddress({ ...address, country: text })}
          textAlign={isRTL ? 'right' : 'left'}
        />
        <TextInput
          style={[inputStyle, styles.halfInput]}
          placeholder={t('address.postalCode')}
          value={address.postalCode}
          onChangeText={(text) => setAddress({ ...address, postalCode: text })}
          textAlign={isRTL ? 'right' : 'left'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputRTL: {
    textAlign: 'right',
  },
  halfInput: {
    flex: 1,
  },
});

export default AddressForm; 