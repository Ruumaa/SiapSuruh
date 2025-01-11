import { prisma } from '../config/prisma.js';

export const getAllProviders = async (req, res) => {
  try {
    const data = await prisma.provider.findMany({
      include: {
        Service: true,
        Categories: true,
        ProviderCategories: true,
        Review: true,
        Order: true,
      },
    });
    return res
      .status(200)
      .json({ message: 'Get all providers successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getPoviderById = async (req, res) => {
  try {
    const { id } = await req.params;
    const data = await prisma.provider.findUnique({
      where: {
        id,
      },
      include: {
        Service: true,
        categories: true,
        ProviderCategories: true,
        Review: true,
        Order: true,
      },
    });
    return res.status(200).json({ message: 'Get provider successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const createProvider = async (req, res) => {
  try {
    const { user_id } = req.body;
    const data = await prisma.provider.create({
      data: {
        user_id,
      },
    });
    return res
      .status(200)
      .json({ message: 'Create provider successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const editProvider = async (req, res) => {
  try {
    const { id } = await req.params;
    const { rating, total_reviews, provider_name, bio } = await req.body;
    const existedProvider = await prisma.provider.findFirst({
      where: { id },
    });

    if (!existedProvider)
      return res.status(404).json({ message: 'Provider not found' });

    const data = await prisma.provider.update({
      where: { id },
      data: {
        rating,
        total_reviews,
        provider_name,
        bio,
      },
    });

    return res
      .status(201)
      .json({ message: 'Provider updated successful', data });
  } catch (error) {
    console.error('Error', error.message);
    return res.status(500).json(error.message);
  }
};

export const deleteProvider = async (req, res) => {
  try {
    const { id } = await req.params;
    const existedProvider = await prisma.provider.findFirst({
      where: { id },
    });
    if (!existedProvider)
      return res.status(404).json({ message: 'Provider not found' });

    const data = await prisma.provider.delete({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: 'Delete provider successful' }, data);
  } catch (error) {
    console.error('Error', error.message);
    return res.status(500).json(error.message);
  }
};
