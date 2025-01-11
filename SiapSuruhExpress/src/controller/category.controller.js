import { prisma } from '../config/prisma.js';

export const getAllCategory = async (req, res) => {
  try {
    const data = await prisma.category.findMany({
      include: { ProviderCategories: true },
    });
    return res
      .status(200)
      .json({ message: 'Get all category successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.category.findUnique({
      where: {
        id,
      },
      include: { ProviderCategories: true },
    });
    if (!data) return res.status(404).json({ message: 'Category not found' });

    return res
      .status(200)
      .json({ message: 'Get category by id successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existedCategory = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    if (existedCategory)
      return res.status(400).json({ message: 'Category name already exists' });

    const data = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return res
      .status(200)
      .json({ message: 'Create category successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const existedCategory = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    if (!existedCategory)
      return res.status(404).json({ message: 'Category not found' });

    const data = await prisma.category.update({
      where: {
        id,
      },
      data: { name, description },
    });

    return res
      .status(201)
      .json({ message: 'Update category successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existedCategory = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    if (!existedCategory)
      return res.status(404).json({ message: 'Category not found' });

    const data = await prisma.category.delete({
      where: {
        id,
      },
    });
    return res
      .status(200)
      .json({ message: 'Delete category successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
