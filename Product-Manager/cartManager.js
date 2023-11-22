import fs from "fs";

export class cartManager {
        constructor(path) {
            this.path = path;
            try {
                const cart = fs.readFileSync(this.path, "utf8");
                this.cart = JSON.parse(cart);
            } catch (error) {
                this.cart = [];
            }
    }

  
    async addCart(cart) {
        const exitsteCart = this.cart.find(
            (cart) => cart.id === cart.id
        );

        if (exitsteCart) {
            console.log(
                `El carrito con el id ${cart.id} ya existe y no se agrego`
            );
        } else {
            let id = 1;
            while (this.cart.some(({ id: pid }) => pid == id)) {
                id++;
            }
            if (
                !cart.id 
            ) {
                console.log(`Error no se puede agregar el carrito con campos vacios`);
            } else {
                this.cart.push({...cart, id});
                console.log(`El carrito ${cart.id} fue agregado con exito`);
                try {
                    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'));
                    console.log(`El archivo fue guardado con exito`);
                }
                catch (error) {
                    console.log(`error al guardar el archivo ${error}`);

                }
            }
        }
    }


    async getCart() {
        try{
            const carts = await fs.promises.readFile(this.path, "utf8");
            return JSON.parse(carts);
        }catch(error){
            await fs.promises.writeFile(this.path, JSON.stringify([], null, '\t'));
            return [];
        }
    }


}


class Cart {
    constructor( ) {
        this.products = [];
    }
}


const main = async () => {// TEST  si quiere probar el funcionamiento desmarque los console.log profesor.

    // Crea objetos utilizando la clase product .



    const Cartt = new Cart(
        []
    );

    // Metodos de la clase :


    const manager = new cartManager("./carrito.json");

    console.log('\nAgrega los productos al array de products y genera un id.\n')
    await manager.addCart(Cartt);

    
    console.log('\nDevuelve el array de productos.\n')
    await manager.getCart();
    
}
// main();