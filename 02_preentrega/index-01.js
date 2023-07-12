import ProductManager from "./ProductManager.js";

const pm = new ProductManager("./files/products.json");

let producto = {
  title: "Denim",
  description: "Violeta oscuro",
  price: 500,
  thumbnail: "Images not available",
  code: "001",
  stock: "20",
  id: 6
};


await pm.updateProduct({ ...producto});
console.log("updated producto", JSON.stringify(await pm.getProducts()));

//await pm.removeProduct(7);
//console.log("removed pproducto", JSON.stringify(await pm.getProducts())); 