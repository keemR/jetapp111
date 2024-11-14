import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FilterBar = ({ categories, onFilter, onSort }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const isRTL = language === 'ar';

  const sortOptions = [
    { id: 'newest', label: t('filter.newest') },
    { id: 'price_low', label: t('filter.priceLowToHigh') },
    { id: 'price_high', label: t('filter.priceHighToLow') },
    { id: 'popularity', label: t('filter.popularity') },
  ];

  const applyFilters = () => {
    onFilter({
      category: selectedCategory,
      sortBy: sortBy,
    });
    setShowFilters(false);
  };

  return (
    <>
      <View style={[styles.container, isRTL && styles.containerRTL]}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Icon name="filter-list" size={24} color="#666" />
          <Text style={[styles.buttonText, isRTL && styles.textRTL]}>
            {t('filter.filter')}
          </Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={[styles.categoryScroll, isRTL && styles.categoryScrollRTL]}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.selectedChip,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryText,
                isRTL && styles.textRTL,
                selectedCategory === category.id && styles.selectedText,
              ]}>
                {isRTL ? category.name_ar : category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isRTL && styles.modalContentRTL]}>
            <View style={[styles.modalHeader, isRTL && styles.modalHeaderRTL]}>
              <Text style={[styles.modalTitle, isRTL && styles.textRTL]}>
                {t('filter.filters')}
              </Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>
              {t('filter.sortBy')}
            </Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.sortOption, isRTL && styles.sortOptionRTL]}
                onPress={() => setSortBy(option.id)}
              >
                <Text style={[styles.sortText, isRTL && styles.textRTL]}>
                  {option.label}
                </Text>
                {sortBy === option.id && (
                  <Icon name="check" size={20} color="#E91E63" />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>
                {t('filter.apply')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  containerRTL: {
    flexDirection: 'row-reverse',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: '#eee',
    marginHorizontal: 8,
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryScrollRTL: {
    transform: [{ scaleX: -1 }],
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: '#E91E63',
  },
  categoryText: {
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalContentRTL: {
    direction: 'rtl',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortOptionRTL: {
    flexDirection: 'row-reverse',
  },
  sortText: {
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#E91E63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FilterBar; 