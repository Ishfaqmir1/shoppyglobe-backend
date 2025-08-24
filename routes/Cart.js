import express from "express";
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";

const router = express.Router();

// POST - Add product to cart
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const cartItem = new Cart({ productId, quantity });
    const savedCartItem = await cartItem.save();

    res.status(201).json(savedCartItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT - Update cart item quantity
router.put("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ error: "Cart item not found" });

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Remove cart item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);

    if (!deletedItem) return res.status(404).json({ error: "Cart item not found" });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;