import type { Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth.js";
import Database from "better-sqlite3";

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

export const getProducts = (req: Request, res: Response) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
};

export const getProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);

  res.json(product);
};
