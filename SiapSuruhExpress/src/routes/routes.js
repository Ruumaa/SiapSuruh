import { Router } from 'express';
import { getHealth } from '../controller/health.controller.js';
import { getAllUser, getUserById } from '../controller/user.controller.js';
import { authorization } from '../middleware/authentication.js';
import { AuthRouter } from '../auth/auth.js';

const router = Router();

router.get('/api/health', getHealth);

router.get('/api/user', authorization, getAllUser);
router.get('/api/user/:id', getUserById);

router.use('/api/auth', AuthRouter);

export { router };
