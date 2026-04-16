import { Router } from 'express';

import { checkout, getOrders } from '../controllers/order-controllers.js';

const router = Router();

router.get('/', getOrders);
router.post('/', checkout);
// router.patch('/items/:itemId', updateCart);
// router.delete('/items/:itemId', deleteFromCart);

export default router;
