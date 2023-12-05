import { Router } from "express";
import { ProductManager } from "../../../Product-Manager/productManager.js";
const productManager = new ProductManager('./Product-Manager/productos.json');


const ViewRouter = Router();

ViewRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('home.hbs', {
    fileCss: "home.css",
    products,              
    });
});

ViewRouter.get ("/realtimeproducts" , async(req, res) => {
    res.render("realTimeProducts.hbs",{
        fileCss: "realTimeProd.css",
    })
})

export default ViewRouter;