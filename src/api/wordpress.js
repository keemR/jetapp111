import axios from 'axios';

const WC_CONSUMER_KEY = 'ck_70b083c4d7243a75b53bd76127afb93b32c17b5a';
const WC_CONSUMER_SECRET = 'cs_dd4f09c56bfbd80d784f34f92eeb64efd45325be';

export const wooCommerceApi = axios.create({
  baseURL: 'https://jetaimeshopping.com/wp-json/wc/v3',
  timeout: 10000,
  auth: {
    username: WC_CONSUMER_KEY,
    password: WC_CONSUMER_SECRET,
  },
});

export const getProducts = async () => {
  try {
    const response = await wooCommerceApi.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await wooCommerceApi.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}; 