import {Router} from 'express';
import authController from './app/controllers/authController';
import UserController from './app/controllers/userController';
import authMiddleware from './app/middlewares/authMiddleware';

const router = Router();
router.post('/users', UserController.store);
router.post('/auth', authController.authenticate);
router.get('/users', authMiddleware, UserController.index);

export default router;