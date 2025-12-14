import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!JWT_SECRET || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error('Missing JWT_SECRET, ADMIN_EMAIL, or ADMIN_PASSWORD in backend/.env');
}

export const authenticate = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { 
          email, 
          role: 'admin',
          iat: Math.floor(Date.now() / 1000) - 30 // Add issued at time
        }, 
        JWT_SECRET, 
        { 
          expiresIn: '7d',
          algorithm: 'HS256' // Specify algorithm for security
        }
      );
      
      return { 
        token, 
        user: { 
          email, 
          role: 'admin' 
        } 
      };
    }
    
    throw new Error('Invalid email or password');
  } catch (error) {
    throw error; // Re-throw the error to be handled by the route
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    throw new Error('Invalid token');
  }
};

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  const token = authHeader.substring(7);
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, error: 'Invalid token' });
  }
};

