import {Router} from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import DashboardController from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/summary', authMiddleware, DashboardController.getSummary);

export default router;