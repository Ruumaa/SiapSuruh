import { verifyToken } from '../../lib/jwt.js';

export const authorization = (req, res, next) => {
  // Mengambil header Authorization
  const { authorization } = req.headers;

  // Jika tidak ada token atau format salah
  if (!authorization || typeof authorization !== 'string') {
    return res.status(401).json({
      message: 'Token needed',
    });
  }

  // Mengambil token dari header Authorization
  const token = authorization.split(' ')[1];

  try {
    // Verifikasi token
    const jwtDecode = verifyToken(token);

    // Menyimpan userData ke dalam request (opsional, jika verifikasi sukses)
    if (typeof jwtDecode !== 'string') {
      req.userData = {
        id: jwtDecode.id,
        username: jwtDecode.username,
        role: jwtDecode.role,
      };
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Melanjutkan middleware berikutnya
  next();
};

export const roleAuthorization = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userData.role)) {
      return res.status(403).json({
        message:
          'Access denied. You do not have permission to perform this action.',
      });
    }
    next();
  };
};
