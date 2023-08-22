import {Router} from 'express';
import CartService from '../services/db/cartsService.js';
import ProductService from '../services/db/productsService.js';



const cartService = new CartService();
const productService = new ProductService();

const router = Router();

router.get('/',async(req,res)=>{
    let products = await productService.getAll();
    console.log(products);
    res.render('products',{products: products})
})

router.get('/carts',async(req,res)=>{
    let carts = await cartService.getAll();
    console.log(carts);
    res.render('carts',{carts})
})


export default router;