import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // allow frontend to connect

import productRoutes from "./routes/Products.js";
import cartRoutes from "./routes/Cart.js";
import authRoutes from "./routes/Auth.js"; // Auth routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); 
app.use(express.json()); // parse JSON

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes); // protected routes
app.use("/auth", authRoutes); // register/login

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected...");
    app.listen(PORT, () =>
      console.log(` Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error(" DB Connection Error:", err.message));
