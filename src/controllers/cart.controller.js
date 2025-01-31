import { TicketRepository } from "../service/ticket.repository.js";
import { CartRepository } from "../service/carts.repository.js";
import { ProductRepository } from "../service/products.repository.js";
import { cartModel } from "../models/cart.model.js";  // Asegúrate de importar el modelo

const ticketRepository = new TicketRepository();
const cartRepository = new CartRepository();
const productRepository = new ProductRepository();


export const createCart = async (req, res) => {
    try {
        const user = req.user; 
        const existingCart = await cartRepository.getCartByUserId(user._id);
        if (existingCart) {
            return res.status(400).json({ error: "El usuario ya tiene un carrito" });
        }

        
        const newCart = {
            user: user._id,
            products: [] 
        };
        const createdCart = await cartRepository.createCart(newCart);

        return res.status(201).json({ message: "Carrito creado", cart: createdCart });
    } catch (error) {
        console.error("Error en createCart:", error);
        return res.status(500).json({ error: "Error interno al crear el carrito" });
    }
};


export const purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const user = req.user;

        // 1️⃣ Verificar si el carrito existe
        const cart = await cartRepository.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        let totalAmount = 0;
        let purchasedItems = [];
        let outOfStockItems = [];

        // 2️⃣ Recorrer productos y verificar stock
        for (const item of cart.products) {  // Cambié 'cart.items' por 'cart.products' (asegúrate de usar el nombre correcto)
            const product = await productRepository.getProductById(item.productId);
            
            // 🔹 Si el producto fue eliminado, lo marcamos como fuera de stock
            if (!product) {
                outOfStockItems.push(item.productId);
                continue;
            }

            // 🔹 Si hay suficiente stock, se descuenta
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await productRepository.updateProduct(product._id, { stock: product.stock });

                totalAmount += product.price * item.quantity;
                purchasedItems.push(item);
            } else {
                outOfStockItems.push(item.productId);
            }
        }

        // 3️⃣ Generar ticket solo si hay productos comprados
        if (purchasedItems.length > 0) {
            try {
                const ticket = await ticketRepository.generateTicket(totalAmount, user.email);
                // 4️⃣ Filtrar los productos que NO se pudieron comprar y actualizar el carrito
                const newCartItems = cart.products.filter(item => outOfStockItems.includes(item.productId));
                await cartRepository.updateCart(cid, { products: newCartItems });

                return res.status(200).json({ message: "Compra realizada", ticket, outOfStockItems });
            } catch (error) {
                return res.status(500).json({ error: "Error al generar el ticket" });
            }
        }

        return res.status(400).json({ error: "No se pudo procesar la compra", outOfStockItems });

    } catch (error) {
        console.error("Error en purchaseCart:", error);
        return res.status(500).json({ error: "Error interno en la compra" });
    }
};



export const addProductToCart = async (req, res) => {
    try {
        const { cid } = req.params; // Obtener el ID del carrito desde la URL
        const products = req.body; // El cuerpo de la solicitud debe contener los productos a agregar
        
        const cart = await cartRepository.getCartById(cid); // Obtener el carrito por ID
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        // Agregar productos al carrito
        for (const product of products) {
            const existingProduct = cart.products.find(p => p.productId.toString() === product.productId);
            if (existingProduct) {
                existingProduct.quantity += product.quantity; // Incrementar la cantidad si ya existe
            } else {
                cart.products.push(product); // Agregar el producto si no existe en el carrito
            }
        }

        await cartRepository.updateCart(cid, cart); // Actualizar el carrito con los nuevos productos
        return res.status(200).json({ message: "Productos agregados al carrito", cart });
    } catch (error) {
        console.error("Error al agregar productos al carrito:", error);
        return res.status(500).json({ error: "Error interno en la adición de productos" });
    }
};








