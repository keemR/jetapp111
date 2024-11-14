import { wooCommerceApi } from '../api/wordpress';

export const createPaymentIntent = async (orderId, amount) => {
  try {
    const response = await wooCommerceApi.post('/payment/create-intent', {
      orderId,
      amount,
    });
    return response.data.clientSecret;
  } catch (error) {
    throw new Error('Failed to create payment intent');
  }
}; 