import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Rating } from 'react-native-ratings';
import ReviewForm from './ReviewForm';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductReviews = ({ productId, reviews, isRTL }) => {
  const { t } = useTranslation();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const renderReviewItem = ({ item }) => (
    <View style={[styles.reviewItem, isRTL && styles.reviewItemRTL]}>
      <View style={[styles.reviewHeader, isRTL && styles.reviewHeaderRTL]}>
        <Text style={[styles.reviewerName, isRTL && styles.textRTL]}>
          {item.userName}
        </Text>
        <Rating
          readonly
          startingValue={item.rating}
          imageSize={16}
          style={styles.rating}
        />
        <Text style={[styles.reviewDate, isRTL && styles.textRTL]}>
          {new Date(item.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
        </Text>
      </View>
      <Text style={[styles.reviewText, isRTL && styles.textRTL]}>
        {isRTL ? item.comment_ar : item.comment}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.summary, isRTL && styles.summaryRTL]}>
        <View style={styles.ratingContainer}>
          <Text style={[styles.averageRating, isRTL && styles.textRTL]}>
            {averageRating.toFixed(1)}
          </Text>
          <Rating
            readonly
            startingValue={averageRating}
            imageSize={24}
            style={styles.rating}
          />
          <Text style={[styles.totalReviews, isRTL && styles.textRTL]}>
            {t('reviews.total', { count: reviews.length })}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.writeReviewButton}
          onPress={() => setShowReviewModal(true)}
        >
          <Text style={styles.writeReviewText}>
            {t('reviews.writeReview')}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.reviewsList}
      />

      <Modal
        visible={showReviewModal}
        animationType="slide"
        transparent={true}
      >
        <ReviewForm
          productId={productId}
          onClose={() => setShowReviewModal(false)}
          isRTL={isRTL}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summary: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryRTL: {
    direction: 'rtl',
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  totalReviews: {
    color: '#666',
    marginTop: 8,
  },
  writeReviewButton: {
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  writeReviewText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewsList: {
    padding: 16,
  },
  reviewItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reviewItemRTL: {
    direction: 'rtl',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  reviewDate: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
});

export default ProductReviews; 