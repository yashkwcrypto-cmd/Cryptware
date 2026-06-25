import { sendError, sendSuccess } from "../services/utility/response.js";
import { SUCCESS, ERROR, NOT_FOUND } from "../services/utility/statusCode.js";
import { query } from "../services/database/msSqlStore.js";

const logginKey = "DATA - STORE";

export const create = async (req, res) => {
  console.log(`${logginKey} - CREATE`);
  try {
    let {
      id, title, category, subcategory, brand, printerType, description,
      img, specs, models, useCases, officialUrl, documents, type, classification, featured, isActive
    } = req.body;

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      img = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const sql = `INSERT INTO products 
      (id, title, category, subcategory, brand, printerType, description, img, specs, models, useCases, officialUrl, documents, type, classification, featured, isActive) 
      VALUES (@id, @title, @category, @subcategory, @brand, @printerType, @description, @img, @specs, @models, @useCases, @officialUrl, @documents, @type, @classification, @featured, @isActive)`;

    await query(sql, {
      id, title, category, subcategory, brand: brand || '', printerType: printerType || '', description,
      img: img ? Buffer.from(img, 'utf8') : null, specs: JSON.stringify(specs || []), models: JSON.stringify(models || []),
      useCases: JSON.stringify(useCases || []), officialUrl: officialUrl || '', documents: JSON.stringify(documents || []),
      type, classification: classification || '', featured: featured ? 1 : 0, isActive: (isActive === false || isActive === 0) ? 0 : 1
    });

    sendSuccess(res, "Product created successfully", {}, SUCCESS);
  } catch (error) {
    console.log(`${logginKey} - ERROR`, error);
    if (error.code === 'ER_DUP_ENTRY' || (error.number && error.number === 2627)) {
      return res.status(400).json({ status: false, code: 400, message: "Product ID already exists" });
    }
    sendError(res, "Error creating product", ERROR);
  }
};

export const getAll = async (req, res) => {
  console.log(`${logginKey} - GET ALL`);
  try {
    const { category, subcategory, brand, search, type } = req.query;
    let sql = "SELECT * FROM products WHERE isActive = 1";
    const params = {};

    if (type) {
      sql += " AND type = @type";
      params.type = type;
    }

    if (category && category !== 'all') {
      sql += " AND subcategory = @category";
      params.category = category;
    }
    if (subcategory) {
      sql += " AND subcategory = @subcategory";
      params.subcategory = subcategory;
    }
    if (brand) {
      sql += " AND brand = @brand";
      params.brand = brand;
    }
    if (search) {
      sql += " AND (title LIKE @search OR description LIKE @search)";
      params.search = `%${search}%`;
    }

    sql += " ORDER BY id";

    const products = await query(sql, params);
    console.log(`${logginKey} - ROWS`, products?.length || 0);
    
    const parsed = (products || []).map(p => ({
      ...p,
      img: p.img ? p.img.toString('utf8') : null,
      specs: JSON.parse(p.specs || '[]'),
      models: JSON.parse(p.models || '[]'),
      useCases: JSON.parse(p.useCases || '[]'),
      documents: JSON.parse(p.documents || '[]'),
    }));

    sendSuccess(res, "Products fetched successfully", parsed, SUCCESS);
  } catch (error) {
    console.log(`${logginKey} - ERROR`, error);
    sendError(res, "Error fetching products", ERROR);
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM products WHERE id = @id";
    const products = await query(sql, { id });

    if (!products || products.length === 0) {
      return res.status(NOT_FOUND).json({
        status: false,
        code: NOT_FOUND,
        message: "Product not found",
      });
    }

    const product = products[0];
    product.img = product.img ? product.img.toString('utf8') : null;
    product.specs = JSON.parse(product.specs || '[]');
    product.models = JSON.parse(product.models || '[]');
    product.useCases = JSON.parse(product.useCases || '[]');
    product.documents = JSON.parse(product.documents || '[]');

    sendSuccess(res, "Product fetched successfully", product, SUCCESS);
  } catch (error) {
    console.log(`${logginKey} - ERROR`, error);
    sendError(res, "Error fetching product", ERROR);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    let {
      title, category, subcategory, brand, printerType, description,
      img, specs, models, useCases, officialUrl, documents, type, classification, featured, isActive
    } = req.body;

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      img = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const sql = `UPDATE products SET 
      title = @title, category = @category, subcategory = @subcategory, brand = @brand, printerType = @printerType, description = @description,
      img = @img, specs = @specs, models = @models, useCases = @useCases, officialUrl = @officialUrl, documents = @documents, type = @type, classification = @classification, featured = @featured, isActive = @isActive
      WHERE id = @id`;

    await query(sql, {
      title, category, subcategory, brand: brand || '', printerType: printerType || '', description,
      img: img ? Buffer.from(img, 'utf8') : null, specs: JSON.stringify(specs || []), models: JSON.stringify(models || []),
      useCases: JSON.stringify(useCases || []), officialUrl: officialUrl || '', documents: JSON.stringify(documents || []),
      type, classification: classification || '', featured: featured ? 1 : 0, isActive: (isActive === false || isActive === 0) ? 0 : 1, id
    });

    sendSuccess(res, "Product updated successfully", {}, SUCCESS);
  } catch (error) {
    console.log(`${logginKey} - ERROR`, error);
    sendError(res, "Error updating product", ERROR);
  }
};

export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM products WHERE id = @id";
    await query(sql, { id });

    sendSuccess(res, "Product deleted successfully", {}, SUCCESS);
  } catch (error) {
    console.log(`${logginKey} - ERROR`, error);
    sendError(res, "Error deleting product", ERROR);
  }
};
