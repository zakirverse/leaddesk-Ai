import jwt from 'jsonwebtoken';
import { inMemoryDB } from '../config/db.js';
import { UnauthorizedError } from '../utils/errors.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new UnauthorizedError('Email and password are required');
  }

  const user = inMemoryDB.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.is_active);

  // Demo credential logic: Accept Password123! or matching hash
  if (!user || (password !== 'Password123!' && !user.password_hash.includes('4m5v6n7b8v9c0x1z2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0'))) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const secret = process.env.JWT_SECRET || 'leaddesk_super_secret_jwt_key_2026_enterprise_secure';
  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name
    },
    secret,
    { expiresIn: '24h' }
  );

  user.last_login_at = new Date().toISOString();

  res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    }
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = inMemoryDB.users.find(u => u.id === req.user.sub);
  if (!user) throw new UnauthorizedError('User not found');

  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      last_login_at: user.last_login_at
    }
  });
});
