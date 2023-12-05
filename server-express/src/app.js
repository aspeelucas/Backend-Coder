import express from 'express';
import { productsRouter } from './router/productsRouter.js';
import { cartRouter } from './router/cartRouter.js';
import { Server } from 'socket.io';
import  handlebars  from 'express-handlebars';
import  __dirname  from './utils.js';
import ViewRouter from './router/views.router.js';
import  { ProductManager } from "../../Product-Manager/productManager.js";




const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto : ${PORT}`);
})
const io = new Server(httpServer)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", 'hbs');
app.set('views', `${__dirname}/views`)

// Public
app.use(express.static(`${__dirname}/public`));



app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/', ViewRouter);

const manager = new ProductManager('./Product-Manager/productos.json');


io.on("connection", async (socket)=>{
  console.log("Nuevo cliente conectado!")

  socket.on("new-product", async (data)=>{
    console.log(data)

    data.price = Number(data.price)
    data.code = Number(data.code)
    data.stock = Number(data.stock)
   

    try {
      await manager.addProduct(data)
    } catch (error) {
      console.log(error)
    }
  })

 socket.emit("allProducts", await manager.getProducts())

});



