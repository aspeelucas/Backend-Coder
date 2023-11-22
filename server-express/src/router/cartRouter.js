import { Router } from "express";
import { cartManager } from "../../../Product-Manager/cartManager.js";


const cartManagerr = new cartManager('./Product-Manager/carrito.json');

export const cartRouter = Router();

cartRouter.get('/cid', async (req, res) => {
    const { cid } = req.params;
    const carts = await cartManagerr.getCart(cid);
    return res.json(carts);
});

cartRouter.post('/cid/product/pid', async (req, res) => {
    const { pid } = req.params;
    const carts = await cartManagerr.getCart();
    const cartId = carts.find((cart) => cart.id === Number(pid));
    if (cartId) {
        await cartManagerr.addProduct(Number(pid));
        return res.json(cartId);
    }
    return res.status(404).json({ error: 'El carrito solicitado no existe' });
});

