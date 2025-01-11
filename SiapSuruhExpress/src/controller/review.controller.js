import { prisma } from '../config/prisma.js';

export const getAllReviews = async (req, res) => {
  try {
    const data = await prisma.review.findMany({
      include: { User: true, Provider: true },
    });
    return res
      .status(200)
      .json({ message: 'Get all reviews successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.review.findUnique({
      where: {
        id,
      },
      include: { User: true, Provider: true },
    });
    if (!data) return res.status(404).json({ message: 'Review not found' });
    return res
      .status(200)
      .json({ message: 'Get review by id successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { user_id, provider_id, rating, comment } = await req.body;
    const data = await prisma.review.create({
      data: { user_id, provider_id, rating, comment },
    });
    return res.status(200).json({ message: 'Create review successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const editReview = async (req, res) => {
  try {
    const { id } = await req.params;
    const { user_id, provider_id, rating, comment } = await req.body;
    const existedReview = await prisma.review.findFirst({ where: { id } });
    if (!existedReview)
      return res.status(404).json({ message: 'Review not found' });

    const data = await prisma.review.update({
      where: { id },
      data: { user_id, provider_id, rating, comment },
    });

    return res.status(201).json({ message: 'Update review successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = await req.params;
    const existedReview = await prisma.review.findFirst({ where: { id } });
    if (!existedReview)
      return res.status(404).json({ message: 'Review not found' });

    const data = await prisma.review.delete({ where: { id } });
    return res.status(200).json({ message: 'Delete review successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
