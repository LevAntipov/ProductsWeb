import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import productRouter from "./routes/productsRouter.js";
import healthRouter from "./routes/healthRouter.js";
import cartRouter from "./routes/cartRouter.js";

const app = express();
const port = Number(process.env.PORT) || 3005;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api", healthRouter);
app.use("/api/cart", cartRouter);
app.use("/api/products", productRouter);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
