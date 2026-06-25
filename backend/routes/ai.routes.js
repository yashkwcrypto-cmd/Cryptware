import express from 'express';
import { getRecommendation } from '../controller/ai.controller.js';

const router = express.Router();

router.post('/recommend', getRecommendation);

export default router;
