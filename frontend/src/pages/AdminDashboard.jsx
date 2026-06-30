import React, { useState, useEffect, useMemo } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminDashboard() {
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

  // Sorting and Filtering States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
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

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let sortedProducts = [...products];

    if (searchTerm) {
      sortedProducts = sortedProducts.filter(p => 
        (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.id || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType) {
      sortedProducts = sortedProducts.filter(p => p.type === filterType);
    }

    if (sortConfig !== null) {
      sortedProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedProducts;
  }, [products, searchTerm, sortConfig, filterType]);

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <span className="text-paper-3 ml-1 text-[10px]">↕</span>;
    return <span className="text-brand ml-1 text-[10px]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <Navbar onMenuToggle={() => {}} isMenuOpen={false} />
      <div className="max-w-[1280px] mx-auto pt-32 pb-20 px-6">
        <h1 className="text-4xl font-serif mb-8 text-brand">Admin Dashboard</h1>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm mb-8 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-3xl font-serif mb-8 flex items-center gap-4 text-ink">
            <span className="w-12 h-12 rounded-xl bg-white border border-paper-3 text-brand flex items-center justify-center shadow-sm">
              {editingId ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              )}
            </span>
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* General Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-paper-3 p-8 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-6 text-brand border-b border-paper-3 pb-3 uppercase tracking-wider">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2 lg:col-span-1 group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 group-focus-within:text-brand transition-colors">ID (Required)</label>
                  <input required name="id" value={formData.id} onChange={handleChange} disabled={!!editingId} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner disabled:opacity-60 disabled:cursor-not-allowed" placeholder="e.g. tsc-te-244" />
                </div>
                
                <div className="col-span-1 md:col-span-2 group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 group-focus-within:text-brand transition-colors">Title (Required)</label>
                  <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner" placeholder="e.g. Zebra ZT411 Industrial Printer" />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 group-focus-within:text-brand transition-colors">Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner font-medium">
                    <option value="hardware">Hardware</option>
                    <option value="software">Software</option>
                  </select>
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 group-focus-within:text-brand transition-colors">Category</label>
                  <input required name="category" value={formData.category} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner" placeholder="e.g. products" />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 group-focus-within:text-brand transition-colors">Subcategory</label>
                  <input required name="subcategory" value={formData.subcategory} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner" placeholder="e.g. barcode-printers" />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 group-focus-within:text-brand transition-colors">Brand</label>
                  <input name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner" placeholder="e.g. Zebra" />
                </div>
              </div>
            </div>

            {/* Specifications Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-paper-3 p-8 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-6 text-brand border-b border-paper-3 pb-3 uppercase tracking-wider">Detailed Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 group-focus-within:text-brand transition-colors">Printer Type / Sub-brand</label>
                  <input name="printerType" value={formData.printerType} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner" placeholder="e.g. Industrial Printers" />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 group-focus-within:text-brand transition-colors">Classification</label>
                  <input name="classification" value={formData.classification} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner" placeholder="e.g. Premium" />
                </div>
                
                <div className="hidden lg:block"></div>

                <div className="col-span-1 lg:col-span-1 group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 flex items-center justify-between group-focus-within:text-brand transition-colors">
                    <span>Specs</span>
                    <span className="text-[10px] text-ink-3/50 font-normal normal-case border border-paper-3 rounded px-1.5 py-0.5">Line Separated</span>
                  </label>
                  <textarea name="specs" value={formData.specs} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner font-mono text-sm leading-relaxed" rows="5" placeholder="Print width: 4.09 in&#10;Resolution: 203 dpi"></textarea>
                </div>

                <div className="col-span-1 lg:col-span-1 group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 flex items-center justify-between group-focus-within:text-brand transition-colors">
                    <span>Models</span>
                    <span className="text-[10px] text-ink-3/50 font-normal normal-case border border-paper-3 rounded px-1.5 py-0.5">Line Separated</span>
                  </label>
                  <textarea name="models" value={formData.models} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner font-mono text-sm leading-relaxed" rows="5" placeholder="ZT41142-T010000Z&#10;ZT41143-T010000Z"></textarea>
                </div>

                <div className="col-span-1 lg:col-span-1 group">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 flex items-center justify-between group-focus-within:text-brand transition-colors">
                    <span>Use Cases</span>
                    <span className="text-[10px] text-ink-3/50 font-normal normal-case border border-paper-3 rounded px-1.5 py-0.5">Line Separated</span>
                  </label>
                  <textarea name="useCases" value={formData.useCases} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner font-mono text-sm leading-relaxed" rows="5" placeholder="Manufacturing&#10;Transportation & Logistics"></textarea>
                </div>
              </div>
            </div>

            {/* Media & Links Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-paper-3 p-8 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-6 text-brand border-b border-paper-3 pb-3 uppercase tracking-wider">Media & Content</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div className="col-span-1 flex flex-col gap-6">
                  <div className="group">
                    <label className="block text-xs font-bold uppercase text-ink-3 mb-2 group-focus-within:text-brand transition-colors">Product Image</label>
                    <div className="bg-paper/50 border-2 border-dashed border-paper-3 rounded-xl p-6 flex flex-col items-center justify-center relative hover:border-brand/50 hover:bg-brand/5 transition-all group-focus-within:border-brand">
                      {formData.img ? (
                        <div className="flex flex-col items-center z-10 pointer-events-none">
                          <img src={typeof formData.img === 'string' ? formData.img : URL.createObjectURL(formData.img)} alt="Product preview" className="w-32 h-32 object-contain bg-white rounded-xl shadow-sm mb-4" />
                          <p className="text-xs text-ink-3 font-medium bg-white px-3 py-1 rounded-full shadow-sm border border-paper-3 truncate max-w-[200px]">
                            {typeof formData.img === 'string' ? 'Click to replace' : formData.img.name}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-ink-3 z-10 pointer-events-none">
                          <svg className="w-10 h-10 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <p className="text-sm font-medium">Drag & drop or click to upload</p>
                        </div>
                      )}
                      <input type="file" accept="image/*" name="img" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold uppercase text-ink-3 mb-2 flex items-center justify-between group-focus-within:text-brand transition-colors">
                      <span>Official URL</span>
                      <svg className="w-4 h-4 text-ink-3/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    </label>
                    <input name="officialUrl" value={formData.officialUrl} onChange={handleChange} className="w-full bg-paper/50 border border-paper-3 rounded-xl p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner" placeholder="https://example.com/product" />
                  </div>
                </div>

                <div className="col-span-1 group flex flex-col">
                  <label className="block text-xs font-bold uppercase text-ink-3 mb-2 group-focus-within:text-brand transition-colors">Description</label>
                  <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full h-full min-h-[200px] bg-paper/50 border border-paper-3 rounded-xl p-4 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner resize-none leading-relaxed" placeholder="Enter a detailed product description..."></textarea>
                </div>
              </div>
            </div>

            {/* Status & Submit Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-paper-3 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sticky bottom-6 z-10">
              <div className="flex items-center gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="peer sr-only" />
                    <div className="w-11 h-6 bg-paper-3 rounded-full peer peer-focus:ring-4 peer-focus:ring-brand/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </div>
                  <span className="font-bold text-sm text-ink-3 uppercase tracking-wider group-hover:text-ink transition-colors">Featured</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="peer sr-only" />
                    <div className="w-11 h-6 bg-paper-3 rounded-full peer peer-focus:ring-4 peer-focus:ring-brand/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </div>
                  <span className="font-bold text-sm text-ink-3 uppercase tracking-wider group-hover:text-ink transition-colors">Active Status</span>
                </label>
              </div>

              <div className="flex gap-4 w-full sm:w-auto">
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setFormData(defaultForm); }} className="flex-1 sm:flex-none bg-white text-ink border-2 border-paper-3 px-6 py-3 rounded-xl font-bold hover:bg-paper-2 hover:border-ink-3 transition-all active:scale-95 text-sm uppercase tracking-wider">
                    Cancel
                  </button>
                )}
                <button type="submit" className="flex-1 sm:flex-none bg-brand text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-h transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0 flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                  {editingId ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                      Save Changes
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      Create Product
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Inventory Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-paper-3 overflow-hidden">
          <div className="p-8 border-b border-paper-3">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-serif flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-paper-2 border border-paper-3 text-ink-3 flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                  </span>
                  Product Inventory
                </h2>
                <p className="text-sm text-ink-3 font-medium">Manage and organize your product catalog</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative w-full sm:w-72">
                  <input 
                    type="text" 
                    placeholder="Search by ID or Title..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full bg-paper/50 border border-paper-3 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner text-sm font-medium"
                  />
                  <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-3/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <div className="relative">
                  <select 
                    value={filterType} 
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full sm:w-auto appearance-none bg-paper/50 border border-paper-3 rounded-xl py-2.5 pl-4 pr-10 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all shadow-inner font-bold text-ink-3 uppercase text-xs tracking-wider"
                  >
                    <option value="">All Types</option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Software</option>
                  </select>
                  <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 bg-paper/30">
              <div className="w-10 h-10 border-4 border-brand/30 border-t-brand rounded-full animate-spin mb-4"></div>
              <p className="text-ink-3 font-bold uppercase tracking-widest text-sm animate-pulse">Loading Inventory...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-paper-2/80 border-b border-paper-3">
                    <th onClick={() => requestSort('id')} className="p-4 px-6 text-xs tracking-widest uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none group">
                      <div className="flex items-center gap-1">ID <SortIcon column="id" /></div>
                    </th>
                    <th className="p-4 px-6 text-xs tracking-widest uppercase font-bold text-ink-3">Image</th>
                    <th onClick={() => requestSort('title')} className="p-4 px-6 text-xs tracking-widest uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none">
                      <div className="flex items-center gap-1">Product Details <SortIcon column="title" /></div>
                    </th>
                    <th onClick={() => requestSort('type')} className="p-4 px-6 text-xs tracking-widest uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none">
                      <div className="flex items-center gap-1">Type <SortIcon column="type" /></div>
                    </th>
                    <th onClick={() => requestSort('subcategory')} className="p-4 px-6 text-xs tracking-widest uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none">
                      <div className="flex items-center gap-1">Subcategory <SortIcon column="subcategory" /></div>
                    </th>
                    <th className="p-4 px-6 text-xs tracking-widest uppercase font-bold text-ink-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-paper-3 bg-white">
                  {filteredAndSortedProducts.map(p => (
                    <tr key={p.id} className="hover:bg-brand/5 transition-colors group">
                      <td className="p-4 px-6 text-sm text-ink-3 font-mono font-medium">{p.id}</td>
                      <td className="p-4 px-6">
                        {p.img ? (
                          <div className="w-14 h-14 bg-white rounded-xl border border-paper-3 shadow-sm p-1.5 group-hover:shadow-md transition-all group-hover:scale-105">
                            <img src={p.img} alt={p.title} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 bg-paper-2 rounded-xl border border-dashed border-paper-3 flex flex-col items-center justify-center text-[8px] text-ink-3 uppercase font-bold">
                            <svg className="w-4 h-4 mb-0.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            None
                          </div>
                        )}
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-ink text-base mb-1">{p.title}</span>
                          <span className="text-xs text-ink-3 font-medium bg-paper-2 w-fit px-2 py-0.5 rounded border border-paper-3">{p.brand || 'No Brand'}</span>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${p.type === 'hardware' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-purple-50 text-purple-600 border-purple-200'}`}>
                          {p.type}
                        </span>
                      </td>
                      <td className="p-4 px-6">
                        <span className="text-xs text-ink-3 font-bold bg-paper-2 px-3 py-1.5 rounded-lg border border-paper-3 uppercase tracking-wider">{p.subcategory}</span>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex gap-2 justify-end items-center">
                          <button onClick={() => handleEdit(p)} className="p-2 text-brand hover:bg-brand/10 rounded-lg transition-colors group/btn relative" aria-label="Edit">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Edit</span>
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors group/btn relative" aria-label="Delete">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAndSortedProducts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-20 text-center bg-paper/30">
                        <div className="flex flex-col items-center justify-center text-ink-3">
                          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                          <p className="font-bold text-xl mb-1 text-ink-2">No products found</p>
                          <p className="text-sm">Try adjusting your search or filter settings.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
