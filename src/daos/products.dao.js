import productModel from "../models/product.model.js";

export class ProductDAO {
    async createProduct(productData) {
        return await productModel.create(productData);
    }

    async getProductById(pid) {
        return await productModel.findById(pid);
    }

    async updateProduct(pid, updateData) {
        return await productModel.findByIdAndUpdate(pid, updateData, { new: true });
    }

    async deleteProduct(pid) {
        return await productModel.findByIdAndDelete(pid);
    }
}

