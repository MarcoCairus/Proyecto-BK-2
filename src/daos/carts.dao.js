// carts.dao.js
import { cartModel } from "../models/cart.model.js";

export class CartDAO {
    async getCartById(cid) {
        return await cartModel.findById(cid).populate("products.productId");
    }

    async updateCart(cid, cartData) {
        return await cartModel.findByIdAndUpdate(cid, cartData, { new: true });
    }

    // Método para obtener el carrito por userId
    async getCartByUserId(userId) {
        return await cartModel.findOne({ user: userId }).populate("products.productId");
    }

    // Método para crear un carrito
    async createCart(cartData) {
        const cart = new cartModel(cartData);
        return await cart.save();
    }
}
