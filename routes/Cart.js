import express from "express";
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST - Add product to cart (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Save to user’s cart
    const cartItem = new Cart({ userId: req.user.id, productId, quantity });
    const savedCartItem = await cartItem.save();

    res.status(201).json(savedCartItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Get user’s cart
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user.id }).populate("productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update quantity
router.put("/:id", auth, async (req, res) => {
  try {
    const { quantity } = req.body;

    const updatedItem = await Cart.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { quantity },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ error: "Cart item not found" });

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Remove item
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedItem = await Cart.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedItem) return res.status(404).json({ error: "Cart item not found" });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
