import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { updateFCMToken } from '../api/user';

export const initNotifications = async () => {
  try {
    // Request permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // Get FCM token
      const fcmToken = await messaging().getToken();
      const storedToken = await AsyncStorage.getItem('fcmToken');

      if (fcmToken !== storedToken) {
        // Save new token
        await AsyncStorage.setItem('fcmToken', fcmToken);
        // Update token on server
        await updateFCMToken(fcmToken);
      }
    }
  } catch (error) {
    console.error('Notification setup failed:', error);
  }
};

export const setupNotificationListeners = (navigation) => {
  // Handle background messages
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background message:', remoteMessage);
    // Handle background message
  });

  // Handle foreground messages
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('Foreground message:', remoteMessage);
    // Show local notification
    if (Platform.OS === 'ios') {
      // Handle iOS notification
    } else {
      // Handle Android notification
    }
  });

  // Handle notification open
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification opened app:', remoteMessage);
    handleNotificationNavigation(remoteMessage, navigation);
  });

  // Check if app was opened from notification
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Initial notification:', remoteMessage);
        handleNotificationNavigation(remoteMessage, navigation);
      }
    });

  return unsubscribe;
};

const handleNotificationNavigation = (remoteMessage, navigation) => {
  const { type, data } = remoteMessage.data;

  switch (type) {
    case 'order':
      navigation.navigate('OrderTracking', { orderId: data.orderId });
      break;
    case 'product':
      navigation.navigate('ProductDetail', { productId: data.productId });
      break;
    // Add more cases as needed
  }
}; 