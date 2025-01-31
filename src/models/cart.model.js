import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', 
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
}, { timestamps: true });

export const cartModel = mongoose.model('Cart', cartSchema); 


