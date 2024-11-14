import analytics from '@react-native-firebase/analytics';
import * as Sentry from '@sentry/react-native';

export const initializeMonitoring = () => {
  // Initialize Sentry
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,
  });

  // Initialize Firebase Analytics
  if (!__DEV__) {
    analytics().setAnalyticsCollectionEnabled(true);
  }
};

export const trackScreenView = (screenName) => {
  analytics().logScreenView({
    screen_name: screenName,
    screen_class: screenName,
  });
};

export const trackError = (error) => {
  Sentry.captureException(error);
};

export const trackPerformance = (name, startTime) => {
  const duration = Date.now() - startTime;
  analytics().logEvent('performance_metric', {
    name,
    duration,
  });
}; 