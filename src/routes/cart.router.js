import { Router } from "express";
import { addProductToCart, purchaseCart } from "../controllers/cart.controller.js";
import { createCart } from "../controllers/cart.controller.js";  // Importa el controlador para crear el carrito
import { passportCall } from "../utils/passportCall.js";
import { authorization } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/', passportCall('current'), authorization(["user"]), createCart);

router.post('/:cid/products', passportCall('current'), authorization(["user"]), addProductToCart);



router.post('/:cid/purchase', passportCall('current'), authorization(["user"]), purchaseCart);

export default router;
