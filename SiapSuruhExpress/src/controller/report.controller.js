import { prisma } from '../config/prisma.js';

export const getAllReports = async (req, res) => {
  try {
    const data = await prisma.report.findMany({
      include: {
        User: true,
        Provider: true,
      },
    });
    return res
      .status(200)
      .json({ message: 'Get all reports successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { id } = await req.params;
    const data = await prisma.report.findUnique({
      where: {
        id,
      },
      include: {
        User: true,
        Provider: true,
      },
    });

    if (!data) return res.status(404).json({ message: 'Report not found' });

    return res
      .status(200)
      .json({ message: 'Get report by id successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const {
      reported_by_id,
      reported_provider_id,
      description,
      action_taken,
      admin_id,
      action_reason,
      blocked_until,
    } = req.body;
    const data = await prisma.report.create({
      data: {
        reported_by_id,
        reported_provider_id,
        description,
        action_taken,
        admin_id,
        action_reason,
        blocked_until,
      },
    });
    return res.status(200).json({ message: 'Create report successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const editReport = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      reported_by_id,
      reported_provider_id,
      description,
      action_taken,
      admin_id,
      action_reason,
      blocked_until,
    } = req.body;

    const existedReport = await prisma.report.findUnique({
      where: {
        id,
      },
    });

    if (!existedReport)
      return res.status(404).json({ message: 'Report not found' });

    const data = await prisma.report.update({
      where: {
        id,
      },
      data: {
        reported_by_id,
        reported_provider_id,
        description,
        action_taken,
        admin_id,
        action_reason,
        blocked_until,
      },
    });
    return res.status(200).json({ message: 'Edit report successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = await req.params;
    const existedReport = await prisma.report.findUnique({
      where: {
        id,
      },
    });
    if (!existedReport)
      return res.status(404).json({ message: 'Report not found' });
    const data = await prisma.report.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: 'Delete report successful', data });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
