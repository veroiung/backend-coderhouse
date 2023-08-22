import express from 'express';

import productsRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import viewsRoutes from "./routes/viewsRoutes.js";

import { engine } from "express-handlebars"
//import * as path from "path";

import __dirname from "./utils.js";
//import { Server } from "socket.io";

import handlebars from 'express-handlebars';
import mongoose from 'mongoose';


import ProductsService from '../services/db/productsService.js';
import { CartsService } from '../services/db/models/carts.js';


const app = express();
const ProductsService = new ProductsService("./src/db/products.json");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//handlebars
// app.engine("handlebars", engine())
// app.set("view engine", "handlebars")
// app.set("views", path.resolve(__dirname + "/views"))

/**
 * Template engine
 */
 app.engine('handlebars', handlebars.engine());
 app.set('views',__dirname+'/views');
 app.set('view engine','handlebars');
 app.use(express.static(__dirname+'/public'))


//Static
app.use("/", express.static(__dirname + "/public"))

app.get("/", async (req, res) => {
 let allProducts = await ProductsService.getProducts()
 res.render("home", {
    title: "Handlebars",
    products : allProducts

 })
})


app.get("/realTimeProducts/", async (req, res) => {
 let allProducts = await ProductsService.getProducts()
 res.render("realTimeProducts", {
    title: "Carga de Productos",
    products : allProducts
 })
})

// app.get("/input/", async (req, res) => {
//     let form = await ProductsService.getProducts()
//     res.render("websocket", {
//        title: "Carga de Productos",
//        products : form
//     })
//    })


//Declaración de Routers:
app.use('/', viewsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);


const PORT = 8080;

const httpServer = app.listen(PORT, ()=>{
    console.log(`Server ok en puerto ${PORT}`);
});

const connectMongoDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://VeroIung:coder2023@cluster0.fctujru.mongodb.net/?retryWrites=true&w=majority');
        console.log("Conectado con exito a MongoDB usando Moongose.");

        let product = await studentsModel.findOne({_id: "640a705f72d18c48ca6f6741"});
        console.log(JSON.stringify(product, null, '\t'));

    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();




// const socketServer = new Server(httpServer);

// socketServer.on('connection', async (socket) => {
//     console.log(`Usuario conectado: ${socket.id}`);
    
//     socket.on('disconnect', () => {
//         console.log(`Usuario desconectado`);
//     })

//     socket.emit('reloadProducts', await ProductsService.getProducts());

//     socket.on('respuesta', (message) =>{
//         console.log(message);
//     });

//     socket.on('newProduct', async (obj) =>{
//     await ProductsService.addProduct(obj);
//     socketServer.emit('reloadProducts', await ProductsService.getProducts());
// })

//})



