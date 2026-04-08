import { Router } from 'express';

import { checkAuth, checkHealth } from '../controllers/controllers.js';

export const router = Router();

router.get('/health', checkHealth);
router.get('/me', checkAuth);
router.post('/test', (req, res) => {
  console.log('Body:', req.body);
  res.json({ ok: true });
});

export default router;
