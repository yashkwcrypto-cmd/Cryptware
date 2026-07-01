import axios from 'axios';

const isDev = import.meta.env.DEV;
const BASE_URL = isDev ? '' : 'https://backwebsite.cryptwareinfotech.com';

const api = axios.create({
  baseURL: BASE_URL
});

export const getImageUrl = (imgStr) => {
  if (!imgStr) return imgStr;
  if (imgStr.startsWith('http')) {
    if (!isDev && imgStr.includes('localhost:8080')) {
      return imgStr.replace(/http:\/\/localhost:8080/g, BASE_URL);
    }
    if (isDev && imgStr.includes('backwebsite.cryptwareinfotech.com')) {
      return imgStr.replace(/https:\/\/backwebsite.cryptwareinfotech.com/g, '');
    }
    return imgStr;
  }
  if (imgStr.startsWith('/uploads') || imgStr.startsWith('/api/products/image')) {
    return `${BASE_URL}${imgStr}`;
  }
  return imgStr;
};

export const request = async (method, url, payload = null, params = {}, headers = {}, responseType = 'json') => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (!(payload instanceof FormData) && payload !== null) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await api({
      method,
      url,
      data: payload,
      params,
      headers,
      responseType,
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export async function fetchProducts(params = {}) {
  const data = await request('GET', '/api/products', null, params);
  if (!data.status) throw new Error(data.message || 'Failed to fetch products');
  return data.data.map(item => ({ ...item, img: getImageUrl(item.img) }));
}

export async function fetchProductById(id) {
  const data = await request('GET', `/api/products/${id}`);
  if (!data.status) throw new Error(data.message || 'Failed to fetch product');
  return { ...data.data, img: getImageUrl(data.data.img) };
}

export async function fetchSubcategories(params = {}) {
  const data = await request('GET', '/api/products/subcategories', null, params);
  if (!data.status) throw new Error(data.message || 'Failed to fetch subcategories');
  return data.data;
}

export async function fetchDistinctValues(field, params = {}) {
  const data = await request('GET', '/api/products/distinct', null, { field, ...params });
  if (!data.status) throw new Error(data.message || 'Failed to fetch distinct values');
  return data.data;
}

export async function createProduct(productData) {
  const data = await request('POST', '/api/products', productData);
  if (!data.status) throw new Error(data.message || 'Failed to create product');
  return data.data;
}

export async function updateProduct(id, productData) {
  const data = await request('PUT', `/api/products/${id}`, productData);
  if (!data.status) throw new Error(data.message || 'Failed to update product');
  return data.data;
}

export async function deleteProduct(id) {
  const data = await request('DELETE', `/api/products/${id}`);
  if (!data.status) throw new Error(data.message || 'Failed to delete product');
  return data.data;
}

export async function fetchAiRecommendation(prompt, history = []) {
  if (!prompt?.trim()) return { error: 'Please enter a message.' };
  try {
    const data = await request('POST', '/api/ai/recommend', { prompt, history });
    if (!data.status) throw new Error(data.message || 'Error communicating with AI service.');
    return { text: data.data.reply };
  } catch (error) {
    console.error("[AI Frontend Error]:", error);
    const msg = error.message || 'Unknown error';
    if (msg.includes('timeout') || error.code === 'ECONNABORTED') {
      return { error: 'The request timed out. Please check your connection and try again.' };
    }
    if (msg.includes('network') || error.code === 'ERR_NETWORK') {
      return { error: 'Network error. Please check your internet connection.' };
    }
    return { error: msg || 'Our AI assistant is temporarily unavailable. Please try again shortly or reach out at +91 7490971996.' };
  }
}