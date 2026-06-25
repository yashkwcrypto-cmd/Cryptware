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
        
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

        <div className="bg-white rounded-2xl shadow-sm border border-paper-3 p-8 mb-12 transition-all hover:shadow-md">
          <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm font-bold">
              {editingId ? '✎' : '+'}
            </span>
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">ID (Required)</label>
              <input required name="id" value={formData.id} onChange={handleChange} disabled={!!editingId} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" placeholder="e.g. tsc-te-244" />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Title (Required)</label>
              <input required name="title" value={formData.title} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-white">
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Category</label>
              <input required name="category" value={formData.category} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Subcategory</label>
              <input required name="subcategory" value={formData.subcategory} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Brand</label>
              <input name="brand" value={formData.brand} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Printer Type / Sub-brand</label>
              <input name="printerType" value={formData.printerType} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Classification</label>
              <input name="classification" value={formData.classification} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Image</label>
              {typeof formData.img === 'string' && formData.img && (
                <div className="mb-4">
                  <img src={formData.img} alt="Current product" className="w-32 h-32 object-contain bg-paper-2 rounded-lg border border-paper-3 shadow-sm" />
                  <p className="text-sm text-ink-3 mt-2">Current image (Upload new to replace)</p>
                </div>
              )}
              <input type="file" accept="image/*" name="img" onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-paper-2/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-brand/10 file:text-brand hover:file:bg-brand/20" />
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" rows="3"></textarea>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Official URL</label>
              <input name="officialUrl" value={formData.officialUrl} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" />
            </div>

            <div className="col-span-1 lg:col-span-1">
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Specs (JSON array or Line Separated)</label>
              <textarea name="specs" value={formData.specs} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all font-mono text-sm" rows="4"></textarea>
            </div>

            <div className="col-span-1 lg:col-span-1">
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Models (JSON array or Line Separated)</label>
              <textarea name="models" value={formData.models} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all font-mono text-sm" rows="4"></textarea>
            </div>

            <div className="col-span-1 lg:col-span-1">
              <label className="block text-sm font-bold uppercase text-ink-3 mb-2">Use Cases (JSON array or Line Separated)</label>
              <textarea name="useCases" value={formData.useCases} onChange={handleChange} className="w-full border border-paper-3 rounded-lg p-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all font-mono text-sm" rows="4"></textarea>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center gap-8 py-4 px-6 bg-paper-2/50 rounded-xl border border-paper-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="peer w-6 h-6 opacity-0 absolute cursor-pointer" />
                  <div className="w-6 h-6 border-2 border-brand rounded flex items-center justify-center peer-checked:bg-brand transition-colors">
                    <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                </div>
                <span className="font-bold uppercase text-ink-3 group-hover:text-ink transition-colors">Featured</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="peer w-6 h-6 opacity-0 absolute cursor-pointer" />
                  <div className="w-6 h-6 border-2 border-brand rounded flex items-center justify-center peer-checked:bg-brand transition-colors">
                    <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                </div>
                <span className="font-bold uppercase text-ink-3 group-hover:text-ink transition-colors">Is Active</span>
              </label>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex gap-4 mt-2">
              <button type="submit" className="bg-brand text-white px-8 py-3.5 rounded-xl font-bold hover:bg-brand-h transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2">
                {editingId ? 'Save Changes' : 'Create Product'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setFormData(defaultForm); }} className="bg-paper-2 text-ink border border-paper-3 px-8 py-3.5 rounded-xl font-bold hover:bg-paper-3 transition-all active:scale-95">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-paper-3 p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
            <h2 className="text-2xl font-serif flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm">
                ☰
              </span>
              Product Inventory
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Search ID or Title..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full border border-paper-3 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-paper-2/30"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3">🔍</span>
              </div>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-paper-3 rounded-xl py-2.5 px-4 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-paper-2/30 font-bold text-ink-3 uppercase text-xs"
              >
                <option value="">All Types</option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-paper-3">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-paper-3 bg-paper-2/80">
                    <th onClick={() => requestSort('id')} className="p-4 text-xs tracking-wider uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none">
                      ID <SortIcon column="id" />
                    </th>
                    <th className="p-4 text-xs tracking-wider uppercase font-bold text-ink-3">Image</th>
                    <th onClick={() => requestSort('title')} className="p-4 text-xs tracking-wider uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none">
                      Title <SortIcon column="title" />
                    </th>
                    <th onClick={() => requestSort('type')} className="p-4 text-xs tracking-wider uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none">
                      Type <SortIcon column="type" />
                    </th>
                    <th onClick={() => requestSort('subcategory')} className="p-4 text-xs tracking-wider uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none">
                      Subcategory <SortIcon column="subcategory" />
                    </th>
                    <th className="p-4 text-xs tracking-wider uppercase font-bold text-ink-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedProducts.map(p => (
                    <tr key={p.id} className="border-b border-paper-3 hover:bg-brand/5 transition-colors group">
                      <td className="p-4 text-sm text-ink-3 font-mono">{p.id}</td>
                      <td className="p-4">
                        {p.img ? (
                          <img src={p.img} alt={p.title} className="w-12 h-12 object-contain bg-white rounded-lg border border-paper-3 shadow-sm group-hover:scale-110 transition-transform" />
                        ) : (
                          <div className="w-12 h-12 bg-paper-2 rounded-lg border border-paper-3 flex items-center justify-center text-[10px] text-ink-3 uppercase font-bold">No img</div>
                        )}
                      </td>
                      <td className="p-4 font-bold text-ink">{p.title}</td>
                      <td className="p-4">
                        <span className="bg-paper-2 border border-paper-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-ink-3 uppercase tracking-widest">{p.type}</span>
                      </td>
                      <td className="p-4 text-sm text-ink-3 uppercase font-semibold">{p.subcategory}</td>
                      <td className="p-4">
                        <div className="flex gap-3 justify-end items-center">
                          <button onClick={() => handleEdit(p)} className="text-brand font-bold text-sm uppercase hover:underline flex items-center gap-1">
                            ✎ Edit
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="text-red-500/70 hover:text-red-600 font-bold text-sm uppercase hover:underline transition-colors flex items-center gap-1">
                            × Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAndSortedProducts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-16 text-center">
                        <p className="text-ink-3 font-bold text-lg mb-2">No products found</p>
                        <p className="text-ink-3/70 text-sm">Try adjusting your search or filter settings.</p>
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
