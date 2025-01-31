import { ProductDAO } from "../daos/products.dao.js";

export class ProductRepository {
    constructor() {
        this.dao = new ProductDAO();
    }

    async createProduct(productData) {
        return await this.dao.createProduct(productData);
    }

    async getProductById(pid) {
        return await this.dao.getProductById(pid);
    }

    async updateProduct(pid, updateData) {
        return await this.dao.updateProduct(pid, updateData);
    }

    async deleteProduct(pid) {
        return await this.dao.deleteProduct(pid);
    }
}

