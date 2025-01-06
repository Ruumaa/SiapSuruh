import { Router } from 'express';
import { getHealth } from '../controller/health.controller.js';
import {
  deleteUser,
  editUser,
  getAllUser,
  getUserById,
} from '../controller/user.controller.js';
import {
  authorization,
  roleAuthorization,
} from '../middleware/authentication.js';
import { AuthRouter } from '../auth/auth.js';
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  getCategoryById,
} from '../controller/category.controller.js';
import {
  createService,
  deleteService,
  editService,
  getAllServices,
  getServiceById,
} from '../controller/service.controller.js';
import {
  createProvider,
  deleteProvider,
  editProvider,
  getAllProviders,
} from '../controller/provider.controller.js';
import {
  createOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getOrderById,
} from '../controller/order.controller.js';
import {
  createReport,
  deleteReport,
  editReport,
  getAllReports,
  getReportById,
} from '../controller/report.controller.js';

const router = Router();

router.get('/api/health', getHealth);

// Auth
router.use('/api/auth', AuthRouter);

// User
router.get(
  '/api/users',
  authorization,
  roleAuthorization(['ADMIN', 'PROVIDER']),
  getAllUser
);
router.get('/api/users/:id', authorization, getUserById);
router.put('/api/users/:id', authorization, editUser);
router.delete('/api/users/:id', authorization, deleteUser);

// Category
router.get('/api/categories', authorization, getAllCategory);
router.get('/api/categories/:id', authorization, getCategoryById);
router.post(
  '/api/categories',
  authorization,
  roleAuthorization(['ADMIN', 'PROVIDER']),
  createCategory
);
router.put(
  '/api/categories/:id',
  authorization,
  roleAuthorization(['ADMIN', 'PROVIDER']),
  editCategory
);
router.delete(
  '/api/categories/:id',
  authorization,
  roleAuthorization(['ADMIN', 'PROVIDER']),
  deleteCategory
);

// Services
router.get('/api/services', authorization, getAllServices);
router.get('/api/services/:id', authorization, getServiceById);
router.post(
  '/api/services',
  authorization,
  roleAuthorization(['PROVIDER'], ['ADMIN']),
  createService
);
router.put(
  '/api/services/:id',
  authorization,
  roleAuthorization(['PROVIDER'], ['ADMIN']),
  editService
);
router.delete(
  '/api/services/:id',
  authorization,
  roleAuthorization(['PROVIDER'], ['ADMIN']),
  deleteService
);

// Provider
router.get('/api/providers', authorization, getAllProviders);
router.get('/api/providers/:id', authorization, getUserById);
router.post(
  '/api/providers',
  authorization,
  roleAuthorization(['ADMIN', 'PROVIDER']),
  createProvider
);
router.put(
  '/api/providers/:id',
  authorization,
  roleAuthorization(['ADMIN', 'PROVIDER']),
  editProvider
);
router.delete(
  '/api/providers/:id',
  authorization,
  roleAuthorization(['ADMIN', 'PROVIDER']),
  deleteProvider
);

// Order
router.get('/api/orders', authorization, getAllOrders);
router.get('/api/orders/:id', authorization, getOrderById);
router.post('/api/orders', authorization, createOrder);
router.put('/api/orders/:id', authorization, editOrder);
router.delete('/api/orders/:id', authorization, deleteOrder);

// Report
router.get(
  '/api/reports',
  authorization,
  roleAuthorization(['ADMIN']),
  getAllReports
);
router.get(
  '/api/reports/:id',
  authorization,
  roleAuthorization(['ADMIN']),
  getReportById
);
router.post('/api/reports', authorization, createReport);
router.put('/api/reports/:id', authorization, editReport);
router.delete(
  '/api/reports/:id',
  authorization,
  roleAuthorization(['ADMIN']),
  deleteReport
);

export { router };