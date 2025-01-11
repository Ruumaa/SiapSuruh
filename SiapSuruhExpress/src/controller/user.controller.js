import { hash } from 'bcrypt';
import { prisma } from '../config/prisma.js';

export const getAllUser = async (req, res) => {
  try {
    const data = await prisma.user.findMany({
      include: {
        Provider: true,
        Review: true,
        Order: true,
        Report: true,
      },
    });
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
      include: {
        Provider: true,
        Review: true,
        Order: true,
        Report: true,
      },
    });
    if (!data) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ message: 'Get user by id successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = await req.params;
    const { username, email, password, phone_number, address, img_url, role } =
      await req.body;

    const existedUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }, { phone_number }],
      },
    });

    if (existedUser)
      return res
        .status(400)
        .json({ message: 'Username, Email or Phone Number already exists' });

    let updatedData = {
      username,
      email,
      phone_number,
      address,
      img_url,
      role,
    };

    if (password) {
      const hashedPassword = await hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: updatedData,
    });

    const { password: _, ...user } = updatedUser;

    return res
      .status(201)
      .json({ message: 'User updated successfully', data: user });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = await req.params;
    const existedId = await prisma.user.findUnique({
      where: { id },
    });

    if (!existedId) return res.status(404).json({ message: 'User not found' });

    await prisma.user.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: `User ${id} deleted successfully` });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
