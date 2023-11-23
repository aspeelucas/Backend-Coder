import { Router } from "express";
import { cartManager } from "../../../Product-Manager/cartManager.js";


const cartManagerr = new cartManager('./Product-Manager/carrito.json');

export const cartRouter = Router();

cartRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const carts = await cartManagerr.getCart(cid);
    return res.json(carts);
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const { pid, cid } = req.params;

    await cartManagerr.addProductToCart(cid, pid);
    const updatedCart = await cartManagerr.getCart(cid);
    return res.json({ message: 'El producto fue agregado con exito', updatedCart });
    
});

cartRouter.post('/', async (req, res) => {
    const cartId = await cartManagerr.addCart();
    return res.json({ message: 'El carrito fue agregado con exito' , cartId});
       
})