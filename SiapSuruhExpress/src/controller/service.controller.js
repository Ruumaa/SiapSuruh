import { prisma } from '../config/prisma.js';

export const getAllServices = async (req, res) => {
  try {
    const data = await prisma.service.findMany();
    return res
      .status(200)
      .json({ message: 'Get all services successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.service.findUnique({
      where: {
        id,
      },
    });
    if (!data) return res.status(404).json({ message: 'Service not found' });
    return res
      .status(200)
      .json({ message: 'Get service by id successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { provider_id, title, description, price } = req.body;
    const data = await prisma.service.create({
      data: {
        provider_id,
        title,
        description,
        price,
      },
    });
    return res.status(200).json({ message: 'Create service successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const editService = async (req, res) => {
  try {
    const { id } = await req.params;
    const { title, description, price } = await req.body;

    const existedService = await prisma.service.findFirst({
      where: {
        id,
      },
    });

    if (!existedService)
      return res.status(404).json({ message: 'Service not found' });

    const data = await prisma.service.update({
      where: { id },
      data: { title, description, price },
    });

    return res.status(201).json({
      message: 'Update service successful',
      data,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = await req.params;
    const existedService = await prisma.service.findFirst({
      where: { id },
    });

    if (!existedService)
      return res.status(404).json({ message: 'Service not found' });

    const data = await prisma.service.delete({
      where: { id },
    });

    return res.status(200).json({ message: `Delete service successful`, data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
