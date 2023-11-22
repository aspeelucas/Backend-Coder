import  { Router } from "express";
import  { ProductManager } from "../../../Product-Manager/productManager.js";

const productManager = new ProductManager('./Product-Manager/productos.json');


export const productsRouter = Router();


productsRouter.get('/',  async (req, res) => {
    const {limit} = req.query;
    const products = await productManager.getProducts();
    if (limit) {
        return res.json(products.slice(0, limit));
    } 
    return res.json(products);
} );

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    console.log(pid)

    const product = await productManager.getProductById (Number(pid));
  
    if (product) {
        return res.json(product);
    }
    return res.status(404).json({ error: 'El producto solicitado no existe' });
});

productsRouter.post('/', async (req, res) => {
    const product = req.body;
    await productManager.addProduct(product);
    return res.json(product);
});

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = req.body;
    const products = await productManager.getProducts();
    const productId = products.find((product) => product.id === Number(pid));
    if (productId) {
        await productManager.udpateProduct((Number(pid)), product);
        return res.json(product);
    }
    return res.status(404).json({ error: 'El producto solicitado no existe' });

});

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const products = await productManager.getProducts();
    const productId = products.find((product) => product.id === Number(pid));
    if (productId) {
        await productManager.deleteProduct(Number(pid));
        return res.json(productId);
    }
    return res.status(404).json({ error: 'El producto solicitado no existe' });
});

