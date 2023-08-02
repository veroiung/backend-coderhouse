import express from 'express';

import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

import { engine } from "express-handlebars"
import * as path from "path";

import __dirname from "./utils.js";

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


app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Server ok en puerto ${PORT}`);
})

