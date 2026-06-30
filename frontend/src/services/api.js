const isDev = import.meta.env.DEV;
const BASE_URL = isDev ? '' : 'https://backwebsite.cryptwareinfotech.com';

const API_BASE = `${BASE_URL}/api/products`;
const AI_BASE = `${BASE_URL}/api/ai`;
export const getImageUrl = (imgStr) => {
  if (!imgStr) return imgStr;
  if (imgStr.startsWith('http')) {
    // If it's a localhost upload but we are in production, fix it
    if (!isDev && imgStr.includes('localhost:8080')) {
      return imgStr.replace(/http:\/\/localhost:8080/g, BASE_URL);
    }
    // If it's the production url but we are in dev, proxy it
    if (isDev && imgStr.includes('backwebsite.cryptwareinfotech.com')) {
      return imgStr.replace(/https:\/\/backwebsite.cryptwareinfotech.com/g, '');
    }
    return imgStr;
  }
  // For relative paths or image APIs prepend BASE_URL
  if (imgStr.startsWith('/uploads') || imgStr.startsWith('/api/products/image')) {
    return `${BASE_URL}${imgStr}`;
  }
  return imgStr;
};

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
  
  return json.data.map(item => ({
    ...item,
    img: getImageUrl(item.img)
  }));
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  const json = await res.json();

  if (!json.status) throw new Error(json.message || 'Failed to fetch product');
  const item = json.data;
  return { ...item, img: getImageUrl(item.img) };
}

export async function fetchSubcategories(params = {}) {
  const query = new URLSearchParams();
  if (params.type) query.set('type', params.type);
  const url = `${API_BASE}/subcategories${query.toString() ? '?' + query.toString() : ''}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.status) throw new Error(json.message || 'Failed to fetch subcategories');
  return json.data;
}

export async function fetchDistinctValues(field, params = {}) {
  const query = new URLSearchParams();
  query.set('field', field);
  if (params.type) query.set('type', params.type);
  const url = `${API_BASE}/distinct?${query.toString()}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.status) throw new Error(json.message || 'Failed to fetch distinct values');
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