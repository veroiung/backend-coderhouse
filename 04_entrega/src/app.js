import express from 'express';

import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);



const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Server ok en puerto ${PORT}`);
})