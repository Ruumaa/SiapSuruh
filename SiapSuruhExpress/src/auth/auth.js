import { Router } from 'express';
import { compare, hash } from 'bcrypt';
import { generateToken } from '../../lib/jwt.js';
import { prisma } from '../config/prisma.js';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, phone_number, address, role } = req.body;
    const hashedPassword = await hash(password, 10);

    const existedUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existedUser) {
      return res
        .status(400)
        .json({ message: 'Username or Email already exists' });
    }

    const data = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phone_number,
        address,
        role,
      },
    });
    const { password: _, ...user } = data;

    if (role === 'PROVIDER')
      await prisma.provider.create({
        data: {
          user_id: data.id,
        },
      });

    return res.status(201).json({ message: 'Register successful', data: user });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post('/login/user', async (req, res, next) => {
  try {
    const { username, password } = await req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' });

    const passwordMatch = await compare(password, existingUser.password);
    if (!passwordMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    if (existingUser.role !== 'USER') {
      return res
        .status(403)
        .json({ message: 'Access denied. Not authorized as USER.' });
    }

    const accessToken = generateToken({
      id: existingUser.id,
      username: existingUser.username,
      role: existingUser.role,
    });

    return res
      .status(200)
      .json({ message: 'Sign in success', accessToken, id: existingUser.id });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post('/login/provider', async (req, res, next) => {
  try {
    const { username, password } = await req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!existingUser)
      return res.status(404).json({ message: 'User not found' });

    const passwordMatch = await compare(password, existingUser.password);
    if (!passwordMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    if (existingUser.role !== 'PROVIDER') {
      return res
        .status(403)
        .json({ message: 'Access denied. Not authorized as PROVIDER.' });
    }

    const accessToken = generateToken({
      id: existingUser.id,
      username: existingUser.username,
      role: existingUser.role,
    });

    return res
      .status(200)
      .json({ message: 'Sign in success', accessToken, id: existingUser.id });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export { router as AuthRouter };
