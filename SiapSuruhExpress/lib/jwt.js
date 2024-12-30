import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;
const generateToken = (payload) => {
  const exp = 60 * 60 * 7;
  return jwt.sign(payload, secretKey, { expiresIn: exp });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

export { generateToken, verifyToken };
