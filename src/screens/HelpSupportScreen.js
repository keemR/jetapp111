import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Linking,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAQSection from '../components/FAQSection';

const HelpSupportScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  const supportOptions = [
    {
      id: 'chat',
      icon: 'chat',
      title: t('support.liveChat'),
      description: t('support.liveChatDesc'),
      action: () => navigation.navigate('LiveChat'),
    },
    {
      id: 'email',
      icon: 'email',
      title: t('support.email'),
      description: t('support.emailDesc'),
      action: () => Linking.openURL('mailto:support@example.com'),
    },
    {
      id: 'phone',
      icon: 'phone',
      title: t('support.phone'),
      description: t('support.phoneDesc'),
      action: () => Linking.openURL('tel:+1234567890'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#666" />
        <TextInput
          style={[styles.searchInput, isRTL && styles.textRTL]}
          placeholder={t('support.searchPlaceholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          textAlign={isRTL ? 'right' : 'left'}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>
          {t('support.howCanWeHelp')}
        </Text>
        <View style={styles.supportGrid}>
          {supportOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.supportCard}
              onPress={option.action}
            >
              <Icon name={option.icon} size={32} color="#E91E63" />
              <Text style={[styles.supportTitle, isRTL && styles.textRTL]}>
                {option.title}
              </Text>
              <Text style={[styles.supportDesc, isRTL && styles.textRTL]}>
                {option.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FAQSection isRTL={isRTL} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>
          {t('support.commonTopics')}
        </Text>
        {[
          'orders',
          'shipping',
          'returns',
          'payment',
          'account',
        ].map((topic) => (
          <TouchableOpacity
            key={topic}
            style={[styles.topicItem, isRTL && styles.topicItemRTL]}
            onPress={() => navigation.navigate('HelpTopic', { topic })}
          >
            <Text style={[styles.topicText, isRTL && styles.textRTL]}>
              {t(`support.topics.${topic}`)}
            </Text>
            <Icon
              name={isRTL ? 'chevron-left' : 'chevron-right'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  supportCard: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  supportDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topicItemRTL: {
    flexDirection: 'row-reverse',
  },
  topicText: {
    fontSize: 16,
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
});

export default HelpSupportScreen; 