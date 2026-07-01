import React, { useState, useMemo } from 'react';

export default function ProductList({
  products,
  loading,
  handleEdit,
  handleDelete
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

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

  const renderSortIcon = (column) => {
    if (sortConfig.key !== column) return <span className="text-paper-3 ml-1 text-[10px]">↕</span>;
    return <span className="text-brand ml-1 text-[10px]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
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
                  <div className="flex items-center gap-1">ID {renderSortIcon("id")}</div>
                </th>
                <th className="p-4 px-6 text-xs tracking-widest uppercase font-bold text-ink-3">Image</th>
                <th onClick={() => requestSort('title')} className="p-4 px-6 text-xs tracking-widest uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none">
                  <div className="flex items-center gap-1">Product Details {renderSortIcon("title")}</div>
                </th>
                <th onClick={() => requestSort('type')} className="p-4 px-6 text-xs tracking-widest uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none">
                  <div className="flex items-center gap-1">Type {renderSortIcon("type")}</div>
                </th>
                <th onClick={() => requestSort('subcategory')} className="p-4 px-6 text-xs tracking-widest uppercase font-bold text-ink-3 cursor-pointer hover:bg-paper-3/50 transition-colors select-none">
                  <div className="flex items-center gap-1">Subcategory {renderSortIcon("subcategory")}</div>
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
                      <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2-2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
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
  );
}
