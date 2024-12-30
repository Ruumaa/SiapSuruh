import { Router } from 'express';
import { getHealth } from '../controller/health.controller.js';
import {
  deleteUser,
  editUser,
  getAllUser,
  getUserById,
} from '../controller/user.controller.js';
import { authorization } from '../middleware/authentication.js';
import { AuthRouter } from '../auth/auth.js';
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  getCategoryById,
} from '../controller/category.controller.js';

const router = Router();

router.get('/api/health', getHealth);

// Auth
router.use('/api/auth', AuthRouter);

// User
router.get('/api/user', authorization, getAllUser);
router.get('/api/user/:id', authorization, getUserById);
router.put('/api/user/:id', authorization, editUser);
router.delete('/api/user/:id', authorization, deleteUser);

// Category
router.get('/api/category', authorization, getAllCategory);
router.get('/api/category/:id', authorization, getCategoryById);
router.post('/api/category', authorization, createCategory);
router.put('/api/category/:id', authorization, editCategory);
router.delete('/api/category/:id', authorization, deleteCategory);

export { router };
