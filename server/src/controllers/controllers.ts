import type { Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth.js";
import Database from "better-sqlite3";
import { AuthedRequest } from "../middleware/requireUser.js";
import { CartItem, CartTotals, Product, ProductRaw } from "./types.js";

const db = new Database("database.sqlite");

export const checkAuth = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
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
    const items = db.prepare("SELECT * FROM products").all() as ProductRaw[];

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
    return res.status(500).json({ error: "Failed to fetch products" } as any);
  }
};

export const getProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try {
    const item = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(id) as ProductRaw;

    const product: Product = {
      ...item,
      rating: {
        rate: item.rating_rate,
        count: item.rating_count,
      },
    };

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch products" } as any);
  }
};

export const getCart = (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;

  const items = db
    .prepare(
      `
      SELECT
        cart_items.id,
        cart_items.productId,
        cart_items.quantity,
        products.title,
        products.price,
        products.image
      FROM cart_items
      JOIN products ON products.id = cart_items.productId
      WHERE cart_items.userId = ?
      ORDER BY cart_items.id DESC
      `,
    )
    .all(user.id) as CartItem[];

  const totals = items.reduce(
    (acc: CartTotals, item: CartItem) => {
      acc.price += item.price * item.quantity;
      acc.quantity += item.quantity;
      return acc;
    },
    { price: 0, quantity: 0 },
  );

  res.json({
    items,
    ...totals,
  });
};

export const addToCart = (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const { productId, quantity = 1 } = req.body as {
    productId?: number;
    quantity?: number;
  };

  if (!productId) {
    return res.status(400).json({ message: "productId is required" });
  }

  const product = db
    .prepare("SELECT id FROM products WHERE id = ?")
    .get(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existing = db
    .prepare(
      "SELECT id, quantity FROM cart_items WHERE userId = ? AND productId = ?",
    )
    .get(user.id, productId) as { id: number; quantity: number } | undefined;

  if (existing) {
    db.prepare(
      "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
    ).run(quantity, existing.id);
  } else {
    db.prepare(
      "INSERT INTO cart_items (userId, productId, quantity) VALUES (?, ?, ?)",
    ).run(user.id, productId, quantity);
  }

  res.json({ ok: true });
};

export const updateCart = (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;
  const itemId = Number(req.params.itemId);
  const { quantity } = req.body as { quantity?: number };

  if (!Number.isInteger(itemId)) {
    return res.status(400).json({ message: "Invalid itemId" });
  }

  if (typeof quantity !== "number") {
    return res.status(400).json({ message: "quantity is required" });
  }

  const item = db
    .prepare("SELECT id FROM cart_items WHERE productId = ? AND userId = ?")
    .get(itemId, user.id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (quantity <= 0) {
    db.prepare("DELETE FROM cart_items WHERE productId = ? AND userId = ?").run(
      itemId,
      user.id,
    );
    return res.json({ ok: true, removed: true });
  }

  db.prepare(
    "UPDATE cart_items SET quantity = ? WHERE productId = ? AND userId = ?",
  ).run(quantity, itemId, user.id);

  res.json({ ok: true });
};

export const deleteFromCart = (req: Request, res: Response) => {
  const user = (req as AuthedRequest).user;

  const itemId = Number(req.params.itemId);

  if (!Number.isInteger(itemId)) {
    return res.status(400).json({ message: "Invalid itemId" });
  }

  const item = db
    .prepare("SELECT id FROM cart_items WHERE productId = ? AND userId = ?")
    .get(itemId, user.id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  db.prepare("DELETE FROM cart_items WHERE productId = ? AND userId = ?").run(
    itemId,
    user.id,
  );

  res.json({ ok: true });
};
