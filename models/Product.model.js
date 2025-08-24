import mongoose from "mongoose";

// __define-ocg__ Product schema definition
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String, // URL to product image
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
