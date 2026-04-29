import Database from 'better-sqlite3';
import type { Request, Response } from 'express';

import { AuthedRequest } from '../middleware/requireUser.js';

import { db } from '../db.js';

export const checkout = async (req: Request, res: Response) => {
  const userId = (req as AuthedRequest).user?.id;

  const begin = db.prepare('BEGIN TRANSACTION');
  const commit = db.prepare('COMMIT');
  const rollback = db.prepare('ROLLBACK');

  try {
    begin.run();

    //Товары текущей корзины
    const cartItems = db
      .prepare(
        `
        SELECT 
          cart_items.productId,
          cart_items.quantity,
          products.price AS currentPrice
        FROM cart_items
        JOIN products ON products.id = cart_items.productId
        WHERE cart_items.userId = ?
        `
      )
      .all(userId) as { productId: number; quantity: number; currentPrice: number }[];

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    //Сумма корзины
    const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.currentPrice, 0);

    //Создание order
    const insertOrder = db
      .prepare(`INSERT INTO orders (userId, totalAmount) VALUES (?, ?)`)
      .run(userId, totalAmount);
    const orderId = insertOrder.lastInsertRowid;

    //Вставка позиций в order_items
    const insertOrderItem = db.prepare(`
      INSERT INTO order_items (orderId, productId, quantity, priceAtPurchase)
      VALUES (?, ?, ?, ?)
    `);
    for (const item of cartItems) {
      insertOrderItem.run(orderId, item.productId, item.quantity, item.currentPrice);
    }

    //Очистка корзины
    db.prepare('DELETE FROM cart_items WHERE userId = ?').run(userId);

    //Коммит транзакции
    commit.run();

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: orderId,
      totalAmount: totalAmount,
    });
  } catch (error: any) {
    rollback.run();
    console.error('Checkout error:', error.message);
    res.status(500).json({ message: error.message || 'Checkout failed' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const userId = (req as AuthedRequest).user?.id;

  const orders = db
    .prepare(
      `
      SELECT 
        id,
        orderDate,
        totalAmount
      FROM orders
      WHERE userId = ?
      ORDER BY orderDate DESC
      `
    )
    .all(userId);

  res.json({ orders: orders });
};

export const getOrderDetails = async (req: Request, res: Response) => {
  const userId = (req as AuthedRequest).user?.id;
  let { id } = req.params;

  const order = db.prepare('SELECT * FROM orders WHERE id = ? AND userId = ?').get(id, userId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const items = db
    .prepare(
      `
      SELECT 
        order_items.productId,
        order_items.quantity,
        order_items.priceAtPurchase,
        products.title,
        products.image
      FROM order_items
      JOIN products ON products.id = order_items.productId
      WHERE order_items.orderId = ?
      `
    )
    .all(id);

  res.json({ items });
};
