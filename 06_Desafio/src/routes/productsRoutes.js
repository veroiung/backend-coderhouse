import { Router } from 'express';
//import ProductService from '../services/filesystem/productService.js';
import ProductsService from '../services/db/productsService.js';

const router = Router();
const productsService = new ProductsService();



router.get('/', async(req, res, next)=>{
    try {
        const products = await productService.getProducts();
        res.status(200).json(products);
    }catch (error){
        
        res.status(404).json({message: error.message});
    }
})

router.get('/:productId', async(req, res, next)=>{
    try {
        const {productId} = req.params;
        const product = await productService.getProductById(Number(productId));
        if(product){
            res.json(product)
        }else{
            res.status(404).json({message: error.message});
        }
    }catch (error){
       
        res.status(500).json({message: error.message});
    }
});

router.post('/', async(req, res)=>{
    //const product = req.body
    try{
    const { title, description, price, thumbnail, code, stock } = req.body;
    const product ={
        title, 
        description, 
        price, 
        thumbnail, 
        code, 
        stock,
    }
    const newProducto = await productService.addProduct(product);
    res.json(newProducto);
} catch (error){

    res.status(500).json({message: error.message});
}
});

router.put('/:productId', async (req, res, next)=> {
    try {
    const product = req.body;
    const { productId } = req.params;
    const idNumber = parseInt(productId);
    const productExist = await productService.getProductById(idNumber);
    if(productExist) {
        await productService.updateProduct(product, idNumber);
        res.status(200).json({message: `Producto id: ${idNumber} actualizado`})
    } else {
        res.status(400).json({message: `Producto id: ${idNumber} no encontrado`})
    }
}catch(error){
   
    res.status(500).json({message: error.message});
}
});

router.delete('/:productId', async (req, res, next)=> {
    try {
        const { productId } = req.params;
        const idNumber = parseInt(productId);
        const productExist = await productService.getProductById(idNumber);
    if(productExist) {
        await productService.removeProduct(idNumber);
        res.status(200).json({message: `Producto id: ${idNumber} eliminado`})
    } else {
        res.status(400).json({message: `Producto id: ${idNumber} no encontrado`})
    }

    }catch(error){
       
        res.status(500).json({message: error.message});
}
});

export default router;