import { sendError, sendSuccess } from "../service/response.js";
import { SUCCESS, ERROR, NOT_FOUND, BAD_REQUEST } from "../service/status-code.js";
import { executeQuery, fetchOneFromDb, insertOneToDb, updateOneToDb, deleteOneFromDb } from "../service/database/mssql.js";
import { TABLE } from "../service/global-constant.js";

const loggingKey = "DATA_CONTROLLER";

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
  const localLoggingKey = `${loggingKey} - CREATE`;
  console.log(`${localLoggingKey} - START`);
  try {
    let {
      id, title, category, subcategory, brand, printerType, description,
      img, specs, models, useCases, officialUrl, documents, type, classification, featured, isActive
    } = req.body;

    if (req.file) {
      img = req.file.buffer;
    }

    const data = {
      id, title, category, subcategory, brand: brand || '', printerType: printerType || '', description,
      img: encodeImg(req.file, img), specs: JSON.stringify(specs || []), models: JSON.stringify(models || []),
      useCases: JSON.stringify(useCases || []), officialUrl: officialUrl || '', documents: JSON.stringify(documents || []),
      type, classification: classification || '', featured: featured ? 1 : 0, isActive: (isActive === false || isActive === 0) ? 0 : 1
    };
    
    // Check if ID exists
    const existing = await fetchOneFromDb(localLoggingKey, TABLE.PRODUCTS, { id });
    if (existing && existing.length > 0) {
      return sendError(res, "Product ID already exists", BAD_REQUEST);
    }

    await insertOneToDb(localLoggingKey, TABLE.PRODUCTS, data);

    console.log(`${localLoggingKey} - END`);
    return sendSuccess(res, "Product created successfully", {}, SUCCESS);
  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    if (error.code === 'ER_DUP_ENTRY' || (error.number && error.number === 2627)) {
      return sendError(res, "Product ID already exists", BAD_REQUEST);
    }
    return sendError(res, "Error creating product", ERROR);
  }
};

export const getAll = async (req, res) => {
  const localLoggingKey = `${loggingKey} - GET_ALL`;
  console.log(`${localLoggingKey} - START`);
  try {
    const { category, subcategory, brand, search, type } = req.query;
    let sql = `SELECT * FROM ${TABLE.PRODUCTS} WHERE isActive = 1`;
    const params = {};

    if (type) {
      sql += " AND type = @type";
      params.type = { value: type };
    }

    if (category && category !== 'all') {
      sql += " AND subcategory = @category";
      params.category = { value: category };
    }
    if (subcategory) {
      sql += " AND subcategory = @subcategory";
      params.subcategory = { value: subcategory };
    }
    if (brand) {
      sql += " AND brand = @brand";
      params.brand = { value: brand };
    }
    if (search) {
      sql += " AND (title LIKE @search OR description LIKE @search)";
      params.search = { value: `%${search}%` };
    }

    sql += " ORDER BY id";

    const products = await executeQuery(localLoggingKey, sql, params);
    console.log(`${localLoggingKey} - ROWS ${products?.length || 0}`);
    
    const parsed = (products || []).map(p => ({
      ...p,
      img: parseImg(p.img, p.id),
      specs: JSON.parse(p.specs || '[]'),
      models: JSON.parse(p.models || '[]'),
      useCases: JSON.parse(p.useCases || '[]'),
      documents: JSON.parse(p.documents || '[]'),
    }));

    console.log(`${localLoggingKey} - END`);
    return sendSuccess(res, "Products fetched successfully", parsed, SUCCESS);
  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    return sendError(res, "Error fetching products", ERROR);
  }
};

export const getOne = async (req, res) => {
  const localLoggingKey = `${loggingKey} - GET_ONE`;
  console.log(`${localLoggingKey} - START`);
  try {
    const { id } = req.params;
    const products = await fetchOneFromDb(localLoggingKey, TABLE.PRODUCTS, { id });

    if (!products || products.length === 0) {
      return sendError(res, "Product not found", NOT_FOUND);
    }

    const product = {
      ...products[0],
      img: parseImg(products[0].img, products[0].id),
      specs: JSON.parse(products[0].specs || '[]'),
      models: JSON.parse(products[0].models || '[]'),
      useCases: JSON.parse(products[0].useCases || '[]'),
      documents: JSON.parse(products[0].documents || '[]'),
    };

    console.log(`${localLoggingKey} - END`);
    return sendSuccess(res, "Product fetched successfully", product, SUCCESS);
  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    return sendError(res, "Error fetching product", ERROR);
  }
};

export const update = async (req, res) => {
  const localLoggingKey = `${loggingKey} - UPDATE`;
  console.log(`${localLoggingKey} - START`);
  try {
    const { id } = req.params;
    let {
      title, category, subcategory, brand, printerType, description,
      img, specs, models, useCases, officialUrl, documents, type, classification, featured, isActive
    } = req.body;

    if (req.file) {
      img = req.file.buffer;
    }

    const data = {
      title, category, subcategory, brand: brand || '', printerType: printerType || '', description,
      specs: JSON.stringify(specs || []), models: JSON.stringify(models || []),
      useCases: JSON.stringify(useCases || []), officialUrl: officialUrl || '', documents: JSON.stringify(documents || []),
      type, classification: classification || '', featured: featured ? 1 : 0, isActive: (isActive === false || isActive === 0) ? 0 : 1
    };

    const encodedImg = encodeImg(req.file, img);
    if (encodedImg !== null) {
      data.img = encodedImg;
    }

    await updateOneToDb(localLoggingKey, TABLE.PRODUCTS, { id }, data);

    console.log(`${localLoggingKey} - END`);
    return sendSuccess(res, "Product updated successfully", {}, SUCCESS);
  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    return sendError(res, "Error updating product", ERROR);
  }
};

export const deleteData = async (req, res) => {
  const localLoggingKey = `${loggingKey} - DELETE`;
  console.log(`${localLoggingKey} - START`);
  try {
    const { id } = req.params;
    await deleteOneFromDb(localLoggingKey, TABLE.PRODUCTS, { id });

    console.log(`${localLoggingKey} - END`);
    return sendSuccess(res, "Product deleted successfully", {}, SUCCESS);
  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    return sendError(res, "Error deleting product", ERROR);
  }
};

export const getSubcategories = async (req, res) => {
  const localLoggingKey = `${loggingKey} - GET_SUBCATEGORIES`;
  console.log(`${localLoggingKey} - START`);
  try {
    const { type } = req.query;
    let sql = `SELECT subcategory, COUNT(*) as count FROM ${TABLE.PRODUCTS} WHERE isActive = 1`;
    const params = {};

    if (type) {
      sql += " AND type = @type";
      params.type = { value: type };
    }

    sql += " GROUP BY subcategory ORDER BY subcategory";

    const rows = await executeQuery(localLoggingKey, sql, params);
    const result = (rows || []).map(r => ({
      subcategory: r.subcategory,
      count: r.count,
    }));

    console.log(`${localLoggingKey} - END`);
    return sendSuccess(res, "Subcategories fetched successfully", result, SUCCESS);
  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    return sendError(res, "Error fetching subcategories", ERROR);
  }
};

export const getDistinctValues = async (req, res) => {
  const localLoggingKey = `${loggingKey} - GET_DISTINCT_VALUES`;
  console.log(`${localLoggingKey} - START`);
  try {
    const { type, field } = req.query;
    const allowedFields = ['subcategory', 'brand', 'printerType', 'classification', 'category'];
    if (!field || !allowedFields.includes(field)) {
      return sendError(res, "Invalid field requested", BAD_REQUEST);
    }

    let sql = `SELECT DISTINCT ${field}, subcategory FROM ${TABLE.PRODUCTS} WHERE isActive = 1 AND ${field} IS NOT NULL AND ${field} != ''`;
    const params = {};

    if (type) {
      sql += " AND type = @type";
      params.type = { value: type };
    }

    sql += ` ORDER BY ${field}`;

    const rows = await executeQuery(localLoggingKey, sql, params);
    console.log(`${localLoggingKey} - END`);
    return sendSuccess(res, "Distinct values fetched successfully", rows || [], SUCCESS);
  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    return sendError(res, "Error fetching distinct values", ERROR);
  }
};

export const getImage = async (req, res) => {
  const localLoggingKey = `${loggingKey} - GET_IMAGE`;
  console.log(`${localLoggingKey} - START`);
  try {
    const { id } = req.params;
    const products = await fetchOneFromDb(localLoggingKey, TABLE.PRODUCTS, { id });
    
    if (!products || products.length === 0 || !products[0].img) {
      return res.status(NOT_FOUND).send('Image not found');
    }

    const imgBuffer = products[0].img;
    
    // If it's a legacy string path (starts with / or h), redirect to it
    if (imgBuffer[0] === 0x2F || imgBuffer[0] === 0x68) {
      console.log(`${localLoggingKey} - END`);
      return res.redirect(imgBuffer.toString('utf8'));
    }

    // Otherwise, send the binary data
    res.setHeader('Content-Type', 'image/png');
    res.send(imgBuffer);
    console.log(`${localLoggingKey} - END`);
  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    res.status(ERROR).send('Server Error');
  }
};
