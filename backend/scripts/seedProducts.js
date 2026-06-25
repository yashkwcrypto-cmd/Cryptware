import { query } from '../services/database/msSqlStore.js';

const seedProducts = async () => {
  try {
    console.log('Starting product seed...');
    
    const { catalogData } = await import('../../frontend/src/data/catalog.js');
    
    if (!catalogData || !Array.isArray(catalogData)) {
      throw new Error('catalogData not found or not an array');
    }

    for (const product of catalogData) {
      // Check if product exists
      const existing = await query('SELECT id FROM products WHERE id = @id', { id: product.id });
      
      if (existing.length > 0) {
        const sql = `UPDATE products SET 
          title = @title, category = @category, subcategory = @subcategory, brand = @brand,
          printerType = @printerType, description = @description, img = @img,
          specs = @specs, models = @models, useCases = @useCases,
          officialUrl = @officialUrl, documents = @documents, type = @type,
          classification = @classification, featured = @featured
          WHERE id = @id`;

        await query(sql, {
          id: product.id, title: product.title, category: product.category,
          subcategory: product.subcategory, brand: product.brand || '',
          printerType: product.printerType || '', description: product.description,
          img: product.img ? Buffer.from(product.img, 'utf8') : null, specs: JSON.stringify(product.specs || []),
          models: JSON.stringify(product.models || []),
          useCases: JSON.stringify(product.useCases || []),
          officialUrl: product.officialUrl || '',
          documents: JSON.stringify(product.documents || []),
          type: product.type || 'hardware', classification: product.classification || '',
          featured: product.featured ? 1 : 0
        });
      } else {
        const sql = `INSERT INTO products 
          (id, title, category, subcategory, brand, printerType, description, img, specs, models, useCases, officialUrl, documents, type, classification, featured) 
          VALUES (@id, @title, @category, @subcategory, @brand, @printerType, @description, @img, @specs, @models, @useCases, @officialUrl, @documents, @type, @classification, @featured)`;

        await query(sql, {
          id: product.id, title: product.title, category: product.category,
          subcategory: product.subcategory, brand: product.brand || '',
          printerType: product.printerType || '', description: product.description,
          img: product.img ? Buffer.from(product.img, 'utf8') : null, specs: JSON.stringify(product.specs || []),
          models: JSON.stringify(product.models || []),
          useCases: JSON.stringify(product.useCases || []),
          officialUrl: product.officialUrl || '',
          documents: JSON.stringify(product.documents || []),
          type: product.type || 'hardware', classification: product.classification || '',
          featured: product.featured ? 1 : 0
        });
      }
    }

    console.log(`Seeded ${catalogData.length} products successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedProducts();
