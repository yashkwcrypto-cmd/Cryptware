import express from 'express';
import multer from 'multer';
import { create, getAll, getOne, update, deleteData } from '../controller/data.controller.js';
import { validateProduct } from '../services/validation/data.validation.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/', upload.single('imageFile'), validateProduct, create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', upload.single('imageFile'), validateProduct, update);
router.delete('/:id', deleteData);

export default router;
