import React from 'react';

export default function AddProduct({
  formData,
  handleChange,
  handleSubmit,
  editingId,
  setEditingId,
  setFormData,
  defaultForm
}) {
  return (
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
  );
}
