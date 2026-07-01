import jwt from 'jsonwebtoken';
import { sendError } from '../response.js';
import { UNAUTHORIZED } from '../status-code.js';

const JWT_SECRET = process.env.JWT_SECRET || 'cryptware_super_secret_key';
const loggingKey = 'VERIFY_TOKEN_MIDDLEWARE';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Unauthorized. No token provided.', UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user payload to request
    next();
  } catch (error) {
    console.error(`${loggingKey} - ERROR:`, error.message);
    return sendError(res, 'Unauthorized. Invalid token.', UNAUTHORIZED);
  }
};
