import { prisma } from '../config/prisma.js';

export const getAllProviders = async (req, res) => {
  try {
    const data = await prisma.provider.findMany({
      where: {
        isSuspended: false,
        Report: {
          none: {
            action_taken: 'DELETION',
          },
        },
      },
      include: {
        Service: true,
        Categories: true,
        ProviderCategories: true,
        Review: true,
        Order: true,
        User: true,
        Report: true,
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
    const { id } = req.params;
    const data = await prisma.provider.findUnique({
      where: {
        id,
      },
      include: {
        Service: true,
        Categories: true,
        ProviderCategories: true,
        Review: true,
        Order: true,
        User: true,
        Report: true,
      },
    });
    return res.status(200).json({ message: 'Get provider successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getProviderByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const data = await prisma.provider.findUnique({
      where: {
        user_id,
      },
      include: {
        Service: true,
        Categories: true,
        ProviderCategories: true,
        Review: true,
        Order: {
          include: {
            User: true,
            Service: true,
          },
        },
        User: true,
      },
    });
    return res
      .status(200)
      .json({ message: 'Get provider by user id successful', data });
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

export const editProviderService = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { provider_name, bio, title, description, price } = req.body;

    const provider = await prisma.provider.findUnique({
      where: { user_id },
      include: {
        Service: true,
      },
    });

    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    let serviceData;
    if (provider.Service) {
      serviceData = await prisma.service.update({
        where: { provider_id: provider.id },
        data: {
          title,
          description,
          price,
        },
      });
    } else {
      serviceData = await prisma.service.create({
        data: {
          provider_id: provider.id,
          title,
          description,
          price,
        },
      });
    }

    // Update informasi provider
    const updatedProvider = await prisma.provider.update({
      where: { user_id },
      data: {
        provider_name,
        bio,
        Service: provider.Service
          ? {
              update: {
                title,
                description,
                price,
              },
            }
          : undefined,
      },
      include: {
        Service: true,
      },
    });

    return res.status(200).json({
      message: provider.Service
        ? 'Provider and service updated successfully'
        : 'Provider and service created successfully',
      data: updatedProvider,
    });
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

export const suspendProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await prisma.provider.update({
      where: {
        id,
      },
      data: {
        isSuspended: true,
      },
    });
    return res
      .status(200)
      .json({ message: 'Suspend provider successful', provider });
  } catch (error) {
    console.error('Error', error.message);
    return res.status(500).json(error.message);
  }
};

export const unSuspendProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await prisma.provider.update({
      where: {
        id,
      },
      data: {
        isSuspended: false,
      },
    });

    return res.status(200).json({
      message: 'Unsuspend provider successful',
      provider,
    });
  } catch (error) {
    console.error('Error', error.message);
    return res.status(500).json(error.message);
  }
};
