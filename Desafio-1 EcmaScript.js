
class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        const exitsteProducto = this.products.find((producto)=> producto.code === product.code);

        if (exitsteProducto) {
            console.log(`El producto con el codigo ${product.code} ya existe y no se agrego`);
        }else{
            if (this.products.length === 0) {
                product.id = 1;
            }else{
                product.id = this.products[this.products.length-1].id + 1;
            }
            this.products.push(product);
            console.log(`El producto ${product.title} fue agregado con exito`);
        }
    }


    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const idFound =this.products.find((product) => product.id === id);
        if (idFound) {
            console.log(`El producto con el id ${id} es ${idFound.title}`);
        }
        else{
            console.log(`Not Found`);
        }
    }
}

class product {
    constructor(title,description,price,thumbnail,code,stock) {
        this.id = "";
        this.title = title;
        this.price = price;
        this.description = description;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}



// TEST  si quiere probar el funcionamiento desmarque los console.log profesor.

// Crea objetos utilizando la clase product .

const computadoras = new product('Lenovo','pc portatil',2000,'http:zzz',123,10);
// console.log(computadoras);
const celular = new product('Samsung','celular',1000,'http:zzz',124,11);
// console.log(celular);
const tablet = new product('Ipad','tablet',1500,'http:zzz',125,12);
// console.log(tablet);


// Metodos de la clase :

const manager = new ProductManager();

// Agrega los productos al array de products y genera un id.

manager.addProduct(computadoras);
manager.addProduct(celular);
manager.addProduct(tablet);

// Error al agregar un producto con el mismo codigo.

manager.addProduct(computadoras);

// Devuelve el array de productos.

manager.getProducts();
console.log(manager)

// Devuelve el producto con el id indicado en caso de no encontrarlo devuelve un mensaje de error "not found".
manager.getProductById(1);
manager.getProductById(2);
manager.getProductById(5);






