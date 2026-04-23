import { Router } from 'express';

import { checkout, getOrderDetails, getOrders } from '../controllers/order-controller.js';

const router = Router();

router.get('/', getOrders);
router.get('/:id', getOrderDetails);
router.post('/', checkout);

export default router;
