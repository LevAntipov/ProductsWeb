import { fromNodeHeaders } from 'better-auth/node';
import Database from 'better-sqlite3';
import type { Request, Response } from 'express';

import { auth } from '../auth.js';
import { Product, ProductRaw } from './types.js';

const db = new Database('database.sqlite');

export const checkAuth = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.json({
    user: session.user,
    session: session.session,
  });
};

export const checkHealth = (req: Request, res: Response) => {
  res.json({ ok: true });
};

//products

export const getProducts = (req: Request, res: Response) => {
  try {
    const items = db.prepare('SELECT * FROM products').all() as ProductRaw[];

    const products: Product[] = items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      rating: {
        rate: item.rating_rate,
        count: item.rating_count,
      },
      createdAt: item.createdAt,
    }));

    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' } as any);
  }
};

export const getProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }
  try {
    const item = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as ProductRaw;

    const product: Product = {
      ...item,
      rating: {
        rate: item.rating_rate,
        count: item.rating_count,
      },
    };

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' } as any);
  }
};
