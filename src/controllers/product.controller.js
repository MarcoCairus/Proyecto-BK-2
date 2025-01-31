import productModel from "../models/product.model.js";


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        const newProduct = new productModel({ name, description, price, stock, category });
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: "Error creating product" });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};


export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findById(pid);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Error fetching product" });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const { name, description, price, stock } = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(pid, { name, description, price, stock }, { new: true });
        if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: "Error updating product" });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(pid);
        if (!deletedProduct) return res.status(404).json({ error: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting product" });
    }
};
