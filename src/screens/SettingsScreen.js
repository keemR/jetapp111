import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const isRTL = language === 'ar';

  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: false,
    biometric: false,
  });

  const handleLanguageChange = async () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    await changeLanguage(newLang);
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleClearCache = async () => {
    Alert.alert(
      t('settings.clearCache'),
      t('settings.clearCacheConfirm'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.confirm'),
          onPress: async () => {
            await AsyncStorage.clear();
            // Additional cleanup logic
          },
        },
      ],
      { cancelable: true }
    );
  };

  const settingsSections = [
    {
      title: t('settings.preferences'),
      items: [
        {
          key: 'language',
          icon: 'language',
          label: t('settings.language'),
          value: language === 'ar' ? 'العربية' : 'English',
          type: 'button',
          onPress: handleLanguageChange,
        },
        {
          key: 'notifications',
          icon: 'notifications',
          label: t('settings.notifications'),
          value: settings.notifications,
          type: 'switch',
        },
        {
          key: 'emailUpdates',
          icon: 'mail',
          label: t('settings.emailUpdates'),
          value: settings.emailUpdates,
          type: 'switch',
        },
        {
          key: 'darkMode',
          icon: 'brightness-4',
          label: t('settings.darkMode'),
          value: settings.darkMode,
          type: 'switch',
        },
      ],
    },
    {
      title: t('settings.security'),
      items: [
        {
          key: 'changePassword',
          icon: 'lock',
          label: t('settings.changePassword'),
          type: 'button',
          onPress: () => navigation.navigate('ChangePassword'),
        },
        {
          key: 'biometric',
          icon: 'fingerprint',
          label: t('settings.biometric'),
          value: settings.biometric,
          type: 'switch',
        },
      ],
    },
    {
      title: t('settings.about'),
      items: [
        {
          key: 'privacyPolicy',
          icon: 'privacy-tip',
          label: t('settings.privacyPolicy'),
          type: 'button',
          onPress: () => navigation.navigate('PrivacyPolicy'),
        },
        {
          key: 'terms',
          icon: 'description',
          label: t('settings.terms'),
          type: 'button',
          onPress: () => navigation.navigate('Terms'),
        },
        {
          key: 'clearCache',
          icon: 'cleaning-services',
          label: t('settings.clearCache'),
          type: 'button',
          onPress: handleClearCache,
        },
      ],
    },
  ];

  const renderSettingItem = (item) => {
    return (
      <TouchableOpacity
        key={item.key}
        style={[styles.settingItem, isRTL && styles.settingItemRTL]}
        onPress={item.type === 'button' ? item.onPress : null}
      >
        <View style={[styles.settingLeft, isRTL && styles.settingLeftRTL]}>
          <Icon name={item.icon} size={24} color="#666" />
          <Text style={[styles.settingLabel, isRTL && styles.textRTL]}>
            {item.label}
          </Text>
        </View>

        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={(value) => handleSettingChange(item.key, value)}
            trackColor={{ false: '#ddd', true: '#E91E63' }}
            thumbColor={item.value ? '#fff' : '#f4f3f4'}
          />
        ) : (
          <View style={[styles.settingRight, isRTL && styles.settingRightRTL]}>
            {item.value && (
              <Text style={[styles.settingValue, isRTL && styles.textRTL]}>
                {item.value}
              </Text>
            )}
            <Icon
              name={isRTL ? 'chevron-left' : 'chevron-right'}
              size={24}
              color="#666"
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {settingsSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map(renderSettingItem)}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingItemRTL: {
    direction: 'rtl',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLeftRTL: {
    flexDirection: 'row-reverse',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingRightRTL: {
    flexDirection: 'row-reverse',
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
});

export default SettingsScreen; 