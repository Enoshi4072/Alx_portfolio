import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder } from '../controllers/OrderController.js';

const router = express.Router(); // Use a generic router name

router.post('/place', authMiddleware, placeOrder);

export default router;
