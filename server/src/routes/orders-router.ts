import { Router } from 'express';

import { checkout, getOrderDetails, getOrders } from '../controllers/orders-controllers.js';

const router = Router();

router.get('/', getOrders);
router.get('/:id', getOrderDetails);
router.post('/', checkout);
// router.patch('/items/:itemId', updateCart);
// router.delete('/items/:itemId', deleteFromCart);

export default router;
