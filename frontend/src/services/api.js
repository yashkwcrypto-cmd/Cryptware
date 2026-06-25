const isDev = import.meta.env.DEV;
const BASE_URL = isDev ? '' : 'https://backwebsite.cryptwareinfotech.com';

const API_BASE = `${BASE_URL}/api/products`;
const AI_BASE = `${BASE_URL}/api/ai`;
export async function fetchProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.category) query.set('category', params.category);
  if (params.subcategory) query.set('subcategory', params.subcategory);
  if (params.brand) query.set('brand', params.brand);
  if (params.search) query.set('search', params.search);
  if (params.type) query.set('type', params.type);

  const url = `${API_BASE}${query.toString() ? '?' + query.toString() : ''}`;
  const res = await fetch(url);
  const json = await res.json();

  if (!json.status) throw new Error(json.message || 'Failed to fetch products');
  return json.data;
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  const json = await res.json();

  if (!json.status) throw new Error(json.message || 'Failed to fetch product');
  return json.data;
}

export async function createProduct(productData) {
  const isFormData = productData instanceof FormData;
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? productData : JSON.stringify(productData),
  });
  const json = await res.json();
  if (!json.status) throw new Error(json.message || 'Failed to create product');
  return json.data;
}

export async function updateProduct(id, productData) {
  const isFormData = productData instanceof FormData;
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? productData : JSON.stringify(productData),
  });
  const json = await res.json();
  if (!json.status) throw new Error(json.message || 'Failed to update product');
  return json.data;
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  const json = await res.json();
  if (!json.status) throw new Error(json.message || 'Failed to delete product');
  return json.data;
}

export async function fetchAiRecommendation(prompt, history = []) {
  if (!prompt?.trim()) return { error: 'Please enter a message.' };

  try {
    const res = await fetch(`${AI_BASE}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, history }),
    });

    const json = await res.json();

    if (!json.status) {
      throw new Error(json.message || 'Error communicating with AI service.');
    }

    return { text: json.data.reply };
  } catch (error) {
    console.error("[AI Frontend Error]:", error);

    const msg = error.response?.data?.message || error.message || 'Unknown error';

    if (msg.includes('timeout') || error.code === 'ECONNABORTED') {
      return { error: 'The request timed out. Please check your connection and try again.' };
    }
    if (msg.includes('network') || error.code === 'ERR_NETWORK') {
      return { error: 'Network error. Please check your internet connection.' };
    }

    return { error: msg || 'Our AI assistant is temporarily unavailable. Please try again shortly or reach out at +91 7490971996.' };
  }
}