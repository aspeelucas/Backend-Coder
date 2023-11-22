
import fs from "fs";


export class ProductManager {
    constructor(path) {
        this.path = path;
        try {
            const products = fs.readFileSync(this.path, "utf8");
            this.products = JSON.parse(products);
        } catch (error) {
            this.products = [];
        }
    }

    async addProduct(product) {
        const exitsteProducto = this.products.find(
            (producto) => producto.code === product.code
        );

        if (exitsteProducto) {
            console.log(
                `El producto con el codigo ${product.code} ya existe y no se agrego`
            );
        } else {
            let id = 1;
            while (this.products.some(({ id: pid }) => pid == id)) {
                id++;
            }
            if (
                !product.title  ||
                !product.description  ||
                !product.price  ||
                !product.thumbnail?.length  ||
                !product.code  ||
                !product.stock  ||
                !product.status
            ) {
                console.log(`Error no se puede agregar el producto con campos vacios`);
            } else {
                this.products.push({...product, id});
                console.log(`El producto ${product.title} fue agregado con exito`);
                try {
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
                    console.log(`El archivo fue guardado con exito`);
                }
                catch (error) {
                    console.log(`error al guardar el archivo ${error}`);

                }
            }
        }
    }

    async getProducts() {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products);
    }

    async getProductById(id) {

        try {
            const products = await this.getProducts();
            const product = products.find((product) => product.id === id);
            if (product) {
                return product;
            } else {
                throw new Error(`Not Found`);
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    codeExist(code) {
        return this.products.find((product) => product.code === code);
    }

    async udpateProduct(id, product) {
        try {
            const productFound = await this.getProductById(id);
           
            if (!productFound) {
                throw new Error(`Producto no encontrado`);
            }
            else{
                const { title, description, price, thumbnail, code, stock } = product;
                console.log(product)
                if (this.codeExist(code) && code !== productFound.code) {
                    throw new Error(`El codigo ${code} ya existe`);
                }
                const udpatedProduct = { title, description, price, thumbnail, code, stock, id };
                const udpatedProducts = this.products.map((product) => {
                    if (product.id === id) {
                        return udpatedProduct;
                    }
                    return product;
                });
                try {

                    await fs.promises.writeFile(this.path, JSON.stringify(udpatedProducts, null, '\t'));
                    console.log(`El archivo fue guardado con exito`);
                }
                catch (error) {
                    console.log(`error al guardar el archivo ${error}`);
                }
            }    
        } catch (error) {
            console.error(`Error al actuliazar el producto:`,error.message);
        }
    }
    async deleteProduct(id) {
        try {
            const productFound = await this.getProductById(id);
            if (!productFound) {
                throw new Error(`Producto no encontrado`);
            }
            else {
                const udpatedProducts = this.products.filter((product) => product.id !== id);
                try {
                    await fs.promises.writeFile(this.path, JSON.stringify(udpatedProducts, null, '\t'));
                    console.log(`El archivo fue borrado con exito`);
                }
                catch (error) {
                    console.log(`Error al guardar el archivo ${error}`);
                }
            }
        } catch (error) {
            console.error(`Error al eliminar el producto:`, error.message);
        }
    }

}

 export class Product {
    constructor(title, description, price, thumbnail, code, stock,status) {
        this.id = null;
        this.title = title;
        this.price = price;
        this.description = description;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
    }
}

const main = async () => {// TEST  si quiere probar el funcionamiento desmarque los console.log profesor.

    // Crea objetos utilizando la clase product .

    const computadoras = new Product(
        "Lenovo",
        "pc portatil",
        2000,
        "http:zzz",
        123,
        10,
        true
    );

    // console.log(computadoras);
    const celular = new Product("Samsung", "celular", 1000, "http:zzz", 124, 11,true);
    // console.log(celular);
    const tablet = new Product("Ipad", "tablet", 1500, "http:zzz", 125, 12,true,);

    const motorola = new Product("Motorola", "celular", 1000, "http:zzz", 127, 14,true);
    const samsung = new Product("Samsung", "galaxy", 1000, "http:zzz", 128, 15,true);
    const lg = new Product("LG", "lavarropa", 1000, "http:zzz", 129, 16,true);
    const sony = new Product("Sony", "televisor", 1000, "http:zzz", 130, 17,true);
    const philips = new Product("Philips", "televisor", 1000, "http:zzz", 131, 18,true);
    const hitachi = new Product("Hitachi", "televisor", 1000, "http:zzz", 132, 19,true);
    const noblex = new Product("Noblex", "televisor", 1000, "http:zzz", 133, 20,true);
    // console.log(tablet);

    // Metodos de la clase :

    const manager = new ProductManager("./productos.json");


    console.log('\nAgrega los productos al array de products y genera un id.\n')
    await manager.addProduct(computadoras);
    await manager.addProduct(celular);
    await manager.addProduct(tablet);
    await manager.addProduct(motorola);
    await manager.addProduct(samsung);
    await manager.addProduct(lg);
    await manager.addProduct(sony);
    await manager.addProduct(philips);  
    await manager.addProduct(hitachi);
    await manager.addProduct(noblex);



    console.log('\nError al agregar un producto con el mismo codigo.\n')
    await manager.addProduct(computadoras);


    console.log('\nDevuelve el array de productos.\n')
    console.log(await manager.getProducts())


    console.log('\nDevuelve el producto con el id indicado en caso de no encontrarlo devuelve un mensaje de error "not found".\n')
    console.log(await manager.getProductById(1))
    console.log(await manager.getProductById(2))
    console.log(await manager.getProductById(5))



    console.log('\nError al agregar un producto con campos vacios.\n')
    const celular2 = new product("", "", "", "", "", "");

    await manager.addProduct(celular2);




    console.log('\nActualiza el producto con el id indicado y lo guarda en el archivo.\n')
    const televisor = new product("LG", "televisor", 2010, "http:zzz", 125, 18);                 // code que ya existe al id que tiene el mismo code lo actualiza.
    const televisor2 = new product("Hitachi", "televisor", 2011, "http:zzz", 125, 12);            // code que ya existe a un id diferente no actualiza.

    // await manager.udpateProduct(3, televisor);
    // console.log(await manager.getProductById(3))

    // console.log('\nError al actualizar un producto con el mismo codigo.\n')
    // await manager.udpateProduct(1, televisor2);
    // console.log(await manager.getProductById(1))


    // console.log('\nElimina el producto con el id indicado.\n')
    // await manager.deleteProduct(3);
}
// main();