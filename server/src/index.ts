import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { auth } from './auth.js';
import { requireUser } from './middleware/requireUser.js';
import cartRouter from './routes/cartRouter.js';
import healthRouter from './routes/healthRouter.js';
import productRouter from './routes/productsRouter.js';

const app = express();
const port = Number(process.env.PORT) || 3005;
console.log('CLIENT_URL:', process.env.CLIENT_URL);
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api', healthRouter);
app.use('/api/cart', requireUser, cartRouter);
app.use('/api/products', productRouter);

app.all('/api/auth/*splat', toNodeHandler(auth));

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
