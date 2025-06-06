import express from 'express';
import { getAllUsers, deleteUser, deleteUserFileByAdmin } from '../controllers/adminController.js';
import authenticate from '../middleware/auth.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(authenticate);
router.use(adminMiddleware);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.delete('/users/:userId/delete/:fileId', deleteUserFileByAdmin);



export default router;
