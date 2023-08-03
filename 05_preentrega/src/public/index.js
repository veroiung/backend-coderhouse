const socketClient = io()

socketClient.on('saludo', (message)=> {
    console.log(message);

    socketClient.emit('respuesta', 'Muchas Gracias')
})

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputCode = document.getElementById('code');

form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const code = inputCode.value;
    socketClient.emit('newProduct', {title, description, price, stock, code});
}