import express from 'express'
import {
  addToCart,userCart,removeProductFromCart,clearCart,decreaseProudctQty} from "../Controllers/cart.js";

import { Authenticated } from '../Middlewares/Auth.js';

const router = express.Router();

// add To cart
router.post('/add',Authenticated,addToCart)
// router.post('/add',addToCart)

// get User Cart
router.get("/user", Authenticated, userCart);
// router.get("/user", userCart);

// // remove product from cart
router.delete("/remove/:productId", Authenticated, removeProductFromCart);
// router.delete("/remove/:productId", removeProductFromCart);

// // clear cart
router.delete("/clear", Authenticated, clearCart);
// router.delete("/clear", clearCart);

// // decrease items qty
router.post("/--qty", Authenticated, decreaseProudctQty);
// router.post("/--qty", decreaseProudctQty);


export default router;