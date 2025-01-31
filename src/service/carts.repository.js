import { CartDAO } from "../daos/carts.dao.js";

export class CartRepository {
    constructor() {
        this.dao = new CartDAO();
    }

    async getCartById(cid) {
        return await this.dao.getCartById(cid);
    }

    async updateCart(cid, cartData) {
        return await this.dao.updateCart(cid, cartData);
    }
}

