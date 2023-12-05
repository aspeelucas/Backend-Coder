const socket = io();

const form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const dataForm = new FormData(form);

    const post ={
        title: dataForm.get('title'),
        price: Number (dataForm.get('price')),
        description: dataForm.get('description'),
        thumbnail: dataForm.get('thumbnail'),
        code: Number (dataForm.get('code')),
        stock: Number (dataForm.get('stock')),
        status: dataForm.get('status')== 'on' ? true : false,
    }

    console.log(post)
    socket.emit('new-product', post);
    
    form.reset();
    });

socket.on('allProducts',  (data) => {
     console.log(data)
});
