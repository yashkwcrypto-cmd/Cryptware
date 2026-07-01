import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { fetchOneFromDb } from '../service/database/mssql.js';
import { sendSuccess, sendError } from '../service/response.js';
import { SUCCESS, BAD_REQUEST, UNAUTHORIZED, ERROR } from '../service/status-code.js';
import { TABLE } from '../service/global-constant.js';

const JWT_SECRET = process.env.JWT_SECRET || 'cryptware_super_secret_key';
const loggingKey = 'AUTH_CONTROLLER';

export const login = async (req, res) => {
  const localLoggingKey = `${loggingKey} - LOGIN`;
  try {
    console.log(`${localLoggingKey} - START`);
    const { username, password } = req.body;

    if (!username || !password) {
      return sendError(res, 'Username and password required', BAD_REQUEST);
    }

    const users = await fetchOneFromDb(localLoggingKey, TABLE.ADMINS, { username });

    if (!users || users.length === 0) {
      return sendError(res, 'Invalid credentials', UNAUTHORIZED);
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return sendError(res, 'Invalid credentials', UNAUTHORIZED);
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`${localLoggingKey} - END`);
    return sendSuccess(res, 'Login successful', {
      token,
      user: { id: user.id, username: user.username }
    }, SUCCESS);

  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    return sendError(res, 'Internal server error', ERROR);
  }
};

export const verify = async (req, res) => {
  const localLoggingKey = `${loggingKey} - VERIFY`;
  try {
    console.log(`${localLoggingKey} - START`);
    console.log(`${localLoggingKey} - END`);
    return sendSuccess(res, 'Token is valid', { user: req.user }, SUCCESS);
  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    return sendError(res, 'Verification error', ERROR);
  }
};
