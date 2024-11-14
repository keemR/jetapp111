import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

const CategorySlider = ({ categories, onCategoryPress }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, isRTL && styles.containerRTL]}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.category}
          onPress={() => onCategoryPress(category)}
        >
          <Image
            source={{ uri: category.image?.src }}
            style={styles.image}
          />
          <Text style={[styles.name, isRTL && styles.nameRTL]}>
            {language === 'ar' ? category.name_ar : category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  containerRTL: {
    transform: [{ scaleX: -1 }],
  },
  content: {
    paddingHorizontal: 16,
  },
  category: {
    marginRight: 16,
    alignItems: 'center',
    width: 80,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  nameRTL: {
    transform: [{ scaleX: -1 }],
  },
});

export default CategorySlider; 