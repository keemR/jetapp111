import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

const NotificationItem = ({ notification, onPress, isRTL }) => {
  const { t } = useTranslation();

  const getIcon = () => {
    switch (notification.type) {
      case 'order':
        return 'local-shipping';
      case 'product':
        return 'shopping-basket';
      case 'promotion':
        return 'local-offer';
      default:
        return 'notifications';
    }
  };

  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: isRTL ? ar : enUS,
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !notification.read && styles.unread,
        isRTL && styles.containerRTL,
      ]}
      onPress={onPress}
    >
      <View style={[
        styles.iconContainer,
        !notification.read && styles.unreadIcon,
      ]}>
        <Icon name={getIcon()} size={24} color="#fff" />
      </View>

      <View style={[styles.content, isRTL && styles.contentRTL]}>
        <Text style={[
          styles.title,
          !notification.read && styles.unreadText,
          isRTL && styles.textRTL,
        ]}>
          {isRTL ? notification.title_ar : notification.title}
        </Text>
        
        <Text style={[styles.message, isRTL && styles.textRTL]}>
          {isRTL ? notification.message_ar : notification.message}
        </Text>
        
        <Text style={[styles.time, isRTL && styles.textRTL]}>
          {getTimeAgo(notification.created_at)}
        </Text>
      </View>

      {!notification.read && (
        <View style={styles.unreadDot} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  containerRTL: {
    flexDirection: 'row-reverse',
  },
  unread: {
    backgroundColor: '#fafafa',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  unreadIcon: {
    backgroundColor: '#E91E63',
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  contentRTL: {
    marginRight: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  unreadText: {
    fontWeight: '600',
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E91E63',
    alignSelf: 'center',
  },
});

export default NotificationItem; 