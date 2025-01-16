import { prisma } from '../config/prisma.js';

export const checkSuspendedProvider = async (req, res, next) => {
  try {
    const { username } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        Provider: true,
      },
    });

    if (!existingUser || existingUser.role !== 'PROVIDER') {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const report = await prisma.report.findFirst({
      where: {
        reported_provider_id: existingUser.Provider.id,
        OR: [
          { blocked_until: { gt: new Date() } },
          {
            action_taken: 'SUSPENSION',
          },
          { action_taken: 'DELETION' },
        ],
      },
    });

    if (report) {
      if (report.action_taken === 'DELETION') {
        return res.status(403).json({
          message: 'Your account has been deleted.',
        });
      }

      if (report.blocked_until && report.blocked_until < new Date()) {
        await prisma.report.update({
          where: { id: report.id },
          data: { action_taken: 'NONE', blocked_until: null },
        });
        return next();
      }
      if (report.blocked_until && report.blocked_until > new Date()) {
        return res.status(403).json({
          message: 'Your account is suspended',
        });
      }
      return res
        .status(403)
        .json({ message: 'Your account has been suspended.' });
    }

    next();
  } catch (error) {
    console.error('Error', error.message);
    return res.status(500).json(error.message);
  }
};
