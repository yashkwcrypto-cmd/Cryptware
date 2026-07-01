import express from 'express';
import { login, verify } from '../controller/auth.controller.js';
import { requireAuth } from '../service/middleware/verify-token.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', requireAuth, verify);

export default router;
