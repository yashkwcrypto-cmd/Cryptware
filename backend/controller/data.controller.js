import { sendError, sendSuccess } from "../services/utility/response.js";
import { SUCCESS, ERROR, NOT_FOUND } from "../services/utility/statusCode.js";
import { query } from "../services/database/msSqlStore.js";

const logginKey = "DATA - STORE";

const parseImg = (imgBuffer, id) => {
  if (!imgBuffer) return null;
  if (imgBuffer[0] === 0x2F || imgBuffer[0] === 0x68) {
    return imgBuffer.toString('utf8');
  }
  return `/api/products/image/${id}`;
};

const encodeImg = (reqFile, imgString) => {
  if (reqFile) return reqFile.buffer;
  if (!imgString) return null;
  if (imgString.startsWith('data:image')) {
    const base64Data = imgString.split(',')[1];
    return Buffer.from(base64Data, 'base64');
  }
  return Buffer.from(imgString, 'utf8');
};

export const create = async (req, res) => {
  console.log(`${logginKey} - CREATE`);
  try {
    let {
      id, title, category, subcategory, brand, printerType, description,
      img, specs, models, useCases, officialUrl, documents, type, classification, featured, isActive
    } = req.body;

    if (req.file) {
      img = req.file.buffer;
    }

    const sql = `INSERT INTO products 
      (id, title, category, subcategory, brand, printerType, description, img, specs, models, useCases, officialUrl, documents, type, classification, featured, isActive) 
      VALUES (@id, @title, @category, @subcategory, @brand, @printerType, @description, @img, @specs, @models, @useCases, @officialUrl, @documents, @type, @classification, @featured, @isActive)`;

    await query(sql, {
      id, title, category, subcategory, brand: brand || '', printerType: printerType || '', description,
      img: encodeImg(req.file, img), specs: JSON.stringify(specs || []), models: JSON.stringify(models || []),
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
      img: parseImg(p.img, p.id),
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

    const product = {
      ...products[0],
      img: parseImg(products[0].img, products[0].id),
      specs: JSON.parse(products[0].specs || '[]'),
      models: JSON.parse(products[0].models || '[]'),
      useCases: JSON.parse(products[0].useCases || '[]'),
      documents: JSON.parse(products[0].documents || '[]'),
    };

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
      img = req.file.buffer;
    }

    let sql = `UPDATE products SET 
      title = @title, category = @category, subcategory = @subcategory, brand = @brand, printerType = @printerType, 
      description = @description, specs = @specs, models = @models, useCases = @useCases, 
      officialUrl = @officialUrl, documents = @documents, type = @type, classification = @classification, featured = @featured, isActive = @isActive`;

    if (req.file || img) {
      sql += `, img = @img`;
    }

    sql += ` WHERE id = @id`;

    await query(sql, {
      id, title, category, subcategory, brand: brand || '', printerType: printerType || '', description,
      img: encodeImg(req.file, img), specs: JSON.stringify(specs || []), models: JSON.stringify(models || []),
      useCases: JSON.stringify(useCases || []), officialUrl: officialUrl || '', documents: JSON.stringify(documents || []),
      type, classification: classification || '', featured: featured ? 1 : 0, isActive: (isActive === false || isActive === 0) ? 0 : 1
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

export const getSubcategories = async (req, res) => {
  try {
    const { type } = req.query;
    let sql = "SELECT subcategory, COUNT(*) as count FROM products WHERE isActive = 1";
    const params = {};

    if (type) {
      sql += " AND type = @type";
      params.type = type;
    }

    sql += " GROUP BY subcategory ORDER BY subcategory";

    const rows = await query(sql, params);
    const result = (rows || []).map(r => ({
      subcategory: r.subcategory,
      count: r.count,
    }));

    sendSuccess(res, "Subcategories fetched successfully", result, SUCCESS);
  } catch (error) {
    console.log(`${logginKey} - ERROR`, error);
    sendError(res, "Error fetching subcategories", ERROR);
  }
};

export const getDistinctValues = async (req, res) => {
  try {
    const { type, field } = req.query;
    const allowedFields = ['subcategory', 'brand', 'printerType', 'classification', 'category'];
    if (!field || !allowedFields.includes(field)) {
      return res.status(400).json({ status: false, message: 'Invalid field requested' });
    }

    let sql = `SELECT DISTINCT ${field}, subcategory FROM products WHERE isActive = 1 AND ${field} IS NOT NULL AND ${field} != ''`;
    const params = {};

    if (type) {
      sql += " AND type = @type";
      params.type = type;
    }

    sql += ` ORDER BY ${field}`;

    const rows = await query(sql, params);
    sendSuccess(res, "Distinct values fetched successfully", rows || [], SUCCESS);
  } catch (error) {
    console.log(`${logginKey} - ERROR`, error);
    sendError(res, "Error fetching distinct values", ERROR);
  }
};

export const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await query(`SELECT img FROM products WHERE id = @id`, { id });
    
    if (!products || products.length === 0 || !products[0].img) {
      return res.status(404).send('Image not found');
    }

    const imgBuffer = products[0].img;
    
    // If it's a legacy string path (starts with / or h), redirect to it
    if (imgBuffer[0] === 0x2F || imgBuffer[0] === 0x68) {
      return res.redirect(imgBuffer.toString('utf8'));
    }

    // Otherwise, send the binary data
    res.setHeader('Content-Type', 'image/png');
    res.send(imgBuffer);
  } catch (error) {
    console.log(`${logginKey} - ERROR`, error);
    res.status(500).send('Server Error');
  }
};
