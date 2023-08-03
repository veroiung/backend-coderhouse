import express from 'express';

import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

import { engine } from "express-handlebars"
import * as path from "path";

import __dirname from "./utils.js";
import { Server } from "socket.io";


import ProductManager from "./managers/productManager.js";

const app = express();
const productManager = new ProductManager("./src/db/products.json");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Static
app.use("/", express.static(__dirname + "/public"))

app.get("/", async (req, res) => {
 let allProducts = await productManager.getProducts()
 res.render("home", {
    title: "Handlebars",
    products : allProducts

 })
})


app.get("/realTimeProducts/", async (req, res) => {
 let allProducts = await productManager.getProducts()
 res.render("realTimeProducts", {
    title: "Carga de Productos",
    products : allProducts
 })
})

app.get("/input/", async (req, res) => {
    let form = await productManager.getProducts()
    res.render("websocket", {
       title: "Carga de Productos",
       products : form
    })
   })


app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


const PORT = 8080;

const httpServer = app.listen(PORT, ()=>{
    console.log(`Server ok en puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`Usuario desconectado`);
    })

    socket.emit('reloadProducts', await productManager.getProducts());

    socket.on('respuesta', (message) =>{
        console.log(message);
    });

    socket.on('newProduct', async (obj) =>{
    await productManager.addProduct(obj);
    socketServer.emit('reloadProducts', await productManager.getProducts());
})

})



