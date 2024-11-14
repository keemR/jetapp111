import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserProfileScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const user = useSelector(state => state.auth.user);
  const isRTL = language === 'ar';

  const menuItems = [
    {
      id: 'orders',
      icon: 'shopping-bag',
      label: t('profile.myOrders'),
      screen: 'OrderHistory',
    },
    {
      id: 'addresses',
      icon: 'location-on',
      label: t('profile.addresses'),
      screen: 'AddressBook',
    },
    {
      id: 'wishlist',
      icon: 'favorite',
      label: t('profile.wishlist'),
      screen: 'Wishlist',
    },
    {
      id: 'settings',
      icon: 'settings',
      label: t('profile.settings'),
      screen: 'Settings',
    },
    {
      id: 'help',
      icon: 'help',
      label: t('profile.help'),
      screen: 'Help',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <View style={[styles.userInfo, isRTL && styles.userInfoRTL]}>
            <Text style={[styles.name, isRTL && styles.textRTL]}>
              {user.name}
            </Text>
            <Text style={[styles.email, isRTL && styles.textRTL]}>
              {user.email}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editButtonText}>
            {t('profile.editProfile')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menu}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, isRTL && styles.menuItemRTL]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={[styles.menuIcon, isRTL && styles.menuIconRTL]}>
              <Icon name={item.icon} size={24} color="#666" />
            </View>
            <Text style={[styles.menuLabel, isRTL && styles.textRTL]}>
              {item.label}
            </Text>
            <Icon
              name={isRTL ? 'chevron-left' : 'chevron-right'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, isRTL && styles.logoutButtonRTL]}
        onPress={() => {/* Handle logout */}}
      >
        <Icon name="exit-to-app" size={24} color="#E91E63" />
        <Text style={[styles.logoutText, isRTL && styles.textRTL]}>
          {t('profile.logout')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 16,
  },
  userInfoRTL: {
    marginLeft: 0,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  editButton: {
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  menu: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemRTL: {
    flexDirection: 'row-reverse',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuIconRTL: {
    marginRight: 0,
    marginLeft: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 24,
  },
  logoutButtonRTL: {
    flexDirection: 'row-reverse',
  },
  logoutText: {
    fontSize: 16,
    color: '#E91E63',
    marginLeft: 8,
  },
});

export default UserProfileScreen; 