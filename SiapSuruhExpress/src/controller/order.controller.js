import { prisma } from '../config/prisma.js';

export const getAllOrders = async (req, res) => {
  try {
    const data = await prisma.order.findMany();
    return res.status(200).json({ message: 'Get all orders successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    if (!data) return res.status(404).json({ message: 'Order not found' });
    return res
      .status(200)
      .json({ message: 'Get order by id successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      service_id,
      provider_id,
      details,
      location,
      status,
      order_date,
      total_price,
      payment_status,
    } = await req.body;

    const data = await prisma.order.create({
      data: {
        user_id,
        service_id,
        provider_id,
        details,
        location,
        status,
        order_date,
        total_price,
        payment_status,
      },
    });
    return res.status(200).json({ message: 'Create order successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const editOrder = async (req, res) => {
  try {
    const { id } = await req.params;
    const {
      user_id,
      service_id,
      provider_id,
      details,
      location,
      status,
      order_date,
      total_price,
      payment_status,
    } = await req.body;

    const existedOrder = await prisma.order.findFirst({
      where: {
        id,
      },
    });

    if (!existedOrder)
      return res.status(404).json({ message: 'Order not found' });

    const data = await prisma.order.update({
      where: { id },
      data: {
        user_id,
        service_id,
        provider_id,
        details,
        location,
        status,
        order_date,
        total_price,
        payment_status,
      },
    });

    return res.status(201).json({
      message: 'Update order successful',
      data,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = await req.params;
    const existedOrder = await prisma.order.findFirst({
      where: {
        id,
      },
    });
    if (!existedOrder)
      return res.status(404).json({ message: 'Order not found' });
    const data = await prisma.order.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: 'Delete order successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
