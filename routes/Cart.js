import express from "express";
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//  POST - Add product to cart
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity);

    if (!qty || qty < 1) {
      return res.status(400).json({ error: "Please enter a valid quantity." });
    }

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found." });

    // Find user's cart
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId: req.user.id,
        items: [{ productId, quantity: qty }],
      });
    } else {
      // Check if product already exists in cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += qty;
      } else {
        cart.items.push({ productId, quantity: qty });
      }
    }

    const savedCart = await cart.save();
    res.status(201).json({
      message: "Product added to cart successfully ",
      cart: savedCart,
    });
  } catch (err) {
    res.status(400).json({ error: "Failed to add product to cart." });
  }
});

//  GET - Get user’s cart
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId", "name price image category");

    if (!cart || cart.items.length === 0) {
      return res.json({ message: "Your cart is empty ", items: [] });
    }

    res.json({
      message: "Cart fetched successfully ✅",
      items: cart.items.map((i) => ({
        id: i.productId._id,
        name: i.productId.name,
        price: i.productId.price,
        image: i.productId.image,
        category: i.productId.category,
        quantity: i.quantity,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart." });
  }
});

//  PUT - Update product quantity in cart
router.put("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity, action } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found." });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ error: "Product not in cart." });

    if (action === "increment") {
      item.quantity += 1;
    } else if (action === "decrement") {
      item.quantity = Math.max(item.quantity - 1, 1);
    } else if (quantity !== undefined) {
      const qty = Number(quantity);
      if (!qty || qty < 1) {
        return res.status(400).json({ error: "Invalid quantity entered." });
      }
      item.quantity = qty;
    }

    await cart.save();
    res.json({ message: "Cart updated successfully ", cart });
  } catch (err) {
    res.status(400).json({ error: "Failed to update cart." });
  }
});

//  DELETE - Remove product from cart
router.delete("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found." });

    const itemExists = cart.items.some(
      (item) => item.productId.toString() === productId
    );
    if (!itemExists) {
      return res.status(404).json({ error: "Product not found in cart." });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json({
      message: "Product removed from cart ",
      cart,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove product from cart." });
  }
});

export default router;
