const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb://127.0.0.1:27017/ShopSphere-II";
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MALIK DANIAL! MONGODB CONNECTED"))
    .catch(err => console.log("❌ Connection Error:", err.message));

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: String,
    image: String,
    stock: { type: Number, default: 0 }
});
const Product = mongoose.model('Product', productSchema);

// --- API ROUTES ---

// Get All Products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add New Product
app.post("/api/products", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend Server: http://localhost:${PORT}`);
});