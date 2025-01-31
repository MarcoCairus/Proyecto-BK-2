import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/auth.middleware.js";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.post('/', passport.authenticate('current', { session: false }), authorization(["admin"]), createProduct);

router.get('/', getProducts);

router.get('/:pid', getProductById);

router.put('/:pid', passport.authenticate('current', { session: false }), authorization(["admin"]), updateProduct);

router.delete('/:pid', passport.authenticate('current', { session: false }), authorization(["admin"]), deleteProduct);

export default router;
