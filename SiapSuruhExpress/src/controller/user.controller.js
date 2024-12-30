import { prisma } from '../config/prisma.js';

export const getAllUser = async (req, res) => {
  try {
    const data = await prisma.user.findMany();
    return res.status(200).json({ message: 'Get all user successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!data) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ message: 'Get user by id successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
