import Joi from 'joi';

export const productSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  brand: Joi.string().allow('').required(),
  printerType: Joi.string().allow('').optional(),
  description: Joi.string().required(),
  img: Joi.string().allow('').optional(), // Optional since it could be in req.file
  specs: Joi.array().items(Joi.string()).optional(),
  models: Joi.array().items(Joi.string()).optional(),
  useCases: Joi.array().items(Joi.string()).optional(),
  officialUrl: Joi.string().allow('').optional(),
  documents: Joi.array().items(Joi.string()).optional(),
  type: Joi.string().required(),
  classification: Joi.string().allow('').optional(),
  featured: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
});

export const validateProduct = (req, res, next) => {
  // If request contains multipart/form-data, array fields come as JSON strings
  ['specs', 'models', 'useCases', 'documents'].forEach(field => {
    if (typeof req.body[field] === 'string') {
      try {
        req.body[field] = JSON.parse(req.body[field]);
      } catch (e) {
        // ignore parsing error
      }
    }
  });
  
  if (req.body.featured === 'true') req.body.featured = true;
  if (req.body.featured === 'false') req.body.featured = false;
  if (req.body.isActive === 'true') req.body.isActive = true;
  if (req.body.isActive === 'false') req.body.isActive = false;

  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: error.details[0].message,
    });
  }
  next();
};
