import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderTimeline = ({ status, timeline, isRTL }) => {
  const { t } = useTranslation();

  const steps = [
    { key: 'ordered', icon: 'shopping-cart', label: t('order.timeline.ordered') },
    { key: 'processing', icon: 'sync', label: t('order.timeline.processing') },
    { key: 'shipped', icon: 'local-shipping', label: t('order.timeline.shipped') },
    { key: 'delivered', icon: 'check-circle', label: t('order.timeline.delivered') },
  ];

  const getCurrentStep = () => {
    const statusIndex = steps.findIndex(step => step.key === status);
    return statusIndex === -1 ? 0 : statusIndex;
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index <= getCurrentStep();
        const isLast = index === steps.length - 1;

        return (
          <View 
            key={step.key}
            style={[
              styles.stepContainer,
              isRTL && styles.stepContainerRTL,
            ]}
          >
            <View style={styles.stepContent}>
              <View style={[
                styles.iconContainer,
                isActive && styles.activeIconContainer,
              ]}>
                <Icon
                  name={step.icon}
                  size={24}
                  color={isActive ? '#fff' : '#666'}
                />
              </View>
              
              <View style={[
                styles.labelContainer,
                isRTL && styles.labelContainerRTL,
              ]}>
                <Text style={[
                  styles.label,
                  isActive && styles.activeLabel,
                  isRTL && styles.textRTL,
                ]}>
                  {step.label}
                </Text>
                {timeline[step.key] && (
                  <Text style={[
                    styles.timestamp,
                    isRTL && styles.textRTL,
                  ]}>
                    {timeline[step.key]}
                  </Text>
                )}
              </View>
            </View>

            {!isLast && (
              <View style={[
                styles.connector,
                isActive && styles.activeConnector,
                isRTL && styles.connectorRTL,
              ]} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  stepContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  stepContainerRTL: {
    alignItems: 'flex-end',
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  activeIconContainer: {
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
  labelContainer: {
    marginLeft: 16,
    flex: 1,
  },
  labelContainerRTL: {
    marginLeft: 0,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeLabel: {
    color: '#333',
    fontWeight: '600',
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  timestamp: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  connector: {
    position: 'absolute',
    left: 24,
    top: 48,
    width: 2,
    height: 32,
    backgroundColor: '#ddd',
  },
  activeConnector: {
    backgroundColor: '#E91E63',
  },
  connectorRTL: {
    left: undefined,
    right: 24,
  },
});

export default OrderTimeline; 