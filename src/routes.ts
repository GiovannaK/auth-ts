import {Router} from 'express';
import UserController from './app/controllers/userController';

const router = Router();
router.post('/users', UserController.store);

export default router;