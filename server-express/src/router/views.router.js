import { Router } from "express";
import { ProductManager } from "../../../Product-Manager/productManager.js";
const productManager = new ProductManager('./Product-Manager/productos.json');


const ViewRouter = Router();

ViewRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('home.hbs', {products});
});

ViewRouter.get ("/realtimeproducts" , async(req, res) => {
    res.render("realTimeProducts.hbs")
})

export default ViewRouter;