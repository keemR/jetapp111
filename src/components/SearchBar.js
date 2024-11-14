import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

const SearchBar = ({ value, onChangeText, onSubmit }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <View style={[styles.container, isRTL && styles.containerRTL]}>
      <Icon 
        name="search" 
        size={24} 
        color="#666"
        style={[styles.searchIcon, isRTL && styles.searchIconRTL]} 
      />
      <TextInput
        style={[styles.input, isRTL && styles.inputRTL]}
        placeholder={t('search.placeholder')}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        textAlign={isRTL ? 'right' : 'left'}
      />
      {value.length > 0 && (
        <TouchableOpacity 
          onPress={() => onChangeText('')}
          style={[styles.clearButton, isRTL && styles.clearButtonRTL]}
        >
          <Icon name="close" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    margin: 16,
  },
  containerRTL: {
    flexDirection: 'row-reverse',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchIconRTL: {
    marginRight: 0,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    fontFamily: 'Arial',
  },
  inputRTL: {
    textAlign: 'right',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonRTL: {
    padding: 8,
  },
});

export default SearchBar; 