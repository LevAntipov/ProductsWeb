import { Router } from "express";

const router = Router();

router.post("/:cartid", (req, res) => {
  const { cartid } = req.params;

  console.log(cartid);

  res.json(req.body);
});

export default router;
