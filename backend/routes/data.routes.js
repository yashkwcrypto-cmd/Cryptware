import express from 'express';
import multer from 'multer';
import { create, getAll, getOne, update, deleteData, getSubcategories, getDistinctValues, getImage } from '../controller/data.controller.js';
import { validateProduct } from '../service/validation/data-validation.js';
import { requireAuth } from '../service/middleware/verify-token.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.get('/subcategories', getSubcategories);
router.get('/distinct', getDistinctValues);
router.get('/image/:id', getImage);
router.post('/', requireAuth, upload.single('imageFile'), validateProduct, create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', requireAuth, upload.single('imageFile'), validateProduct, update);
router.delete('/:id', requireAuth, deleteData);

export default router;
