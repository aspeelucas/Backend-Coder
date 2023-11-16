import express from 'express';
import { ProductManager } from '../../Product-Manager/productManager.js';


const productManager = new ProductManager('./Product-Manager/productos.json');


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products',  async (req, res) => {
  const {limit} = req.query;
  const products = await productManager.getProducts();
  if (limit) {
    res.json(products.slice(0, limit));
  } 
  return res.json(products);
}); 


app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  console.log(pid)

  const products = await productManager.getProducts();
  const  productId = products.find((product) => product.id === Number(pid));

  if (productId) {
    return res.json(productId);
  }
  return res.status(404).json({ error: 'Product not found' });
});


app.listen(PORT, () => {
  console.log('Server started on port 8080');
}); 