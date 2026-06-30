import express from 'express';
import multer from 'multer';
import { create, getAll, getOne, update, deleteData, getSubcategories, getDistinctValues, getImage } from '../controller/data.controller.js';
import { validateProduct } from '../services/validation/data.validation.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.get('/subcategories', getSubcategories);
router.get('/distinct', getDistinctValues);
router.get('/image/:id', getImage);
router.post('/', upload.single('imageFile'), validateProduct, create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', upload.single('imageFile'), validateProduct, update);
router.delete('/:id', deleteData);

export default router;
