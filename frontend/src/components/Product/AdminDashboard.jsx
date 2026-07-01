import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../util/Requests';
import Navbar from '../common/Layout/Navbar';
import Footer from '../common/Layout/Footer';
import { useAuth } from '../../context/AuthContext';
import AddProduct from './AddProduct';
import ProductList from './ProductList';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const defaultForm = {
    id: '', title: '', category: 'products', subcategory: '', brand: '', printerType: '',
    description: '', img: '', specs: '', models: '', useCases: '', officialUrl: '',
    documents: '', type: 'hardware', classification: '', featured: false, isActive: true
  };
  
  const [formData, setFormData] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const parseArrayField = (val) => {
    if (!val) return [];
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        return val.split('\n').map(s => s.trim()).filter(s => s);
      }
    }
    return val;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload;
      if (formData.img && formData.img instanceof File) {
        payload = new FormData();
        Object.keys(formData).forEach(key => {
          if (key === 'img') {
            payload.append('imageFile', formData.img);
          } else if (['specs', 'models', 'useCases', 'documents'].includes(key)) {
            payload.append(key, JSON.stringify(parseArrayField(formData[key])));
          } else {
            payload.append(key, formData[key]);
          }
        });
      } else {
        payload = {
          ...formData,
          specs: parseArrayField(formData.specs),
          models: parseArrayField(formData.models),
          useCases: parseArrayField(formData.useCases),
          documents: parseArrayField(formData.documents),
        };
        // Do not send base64 string back to server if image wasn't changed
        if (typeof payload.img === 'string') {
          delete payload.img;
        }
      }

      if (editingId) {
        await updateProduct(editingId, payload);
        alert('Product updated successfully!');
      } else {
        await createProduct(payload);
        alert('Product created successfully!');
      }
      setFormData(defaultForm);
      setEditingId(null);
      loadProducts();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      id: product.id || '',
      title: product.title || '',
      category: product.category || 'products',
      subcategory: product.subcategory || '',
      brand: product.brand || '',
      printerType: product.printerType || '',
      description: product.description || '',
      img: product.img || '',
      specs: Array.isArray(product.specs) ? JSON.stringify(product.specs, null, 2) : (product.specs || ''),
      models: Array.isArray(product.models) ? JSON.stringify(product.models, null, 2) : (product.models || ''),
      useCases: Array.isArray(product.useCases) ? JSON.stringify(product.useCases, null, 2) : (product.useCases || ''),
      officialUrl: product.officialUrl || '',
      documents: Array.isArray(product.documents) ? JSON.stringify(product.documents, null, 2) : (product.documents || ''),
      type: product.type || 'hardware',
      classification: product.classification || '',
      featured: !!product.featured,
      isActive: product.isActive !== 0 && product.isActive !== false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        alert('Product deleted successfully!');
        loadProducts();
      } catch (err) {
        alert('Error deleting product: ' + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <Navbar onMenuToggle={() => {}} isMenuOpen={false} />
      <div className="max-w-[1280px] mx-auto pt-32 pb-20 px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif text-brand">Admin Dashboard</h1>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl shadow transition-colors flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm mb-8 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        <AddProduct 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId}
          setEditingId={setEditingId}
          setFormData={setFormData}
          defaultForm={defaultForm}
        />
        
        <ProductList 
          products={products}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      <Footer />
    </div>
  );
}
