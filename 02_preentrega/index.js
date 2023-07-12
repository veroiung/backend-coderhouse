import ProductManager from "./ProductManager.js";

const pm = new ProductManager("./files/products.json");

let producto = await pm.addProduct( {
  title: "Denim",
  description: "Violeta",
  price: 8500,
  thumbnail: "Images not available",
  code: "001a",
  stock: "20",
});

console.log("added producto", JSON.stringify(await pm.getProducts()));

producto = await pm.addProduct( {
  title: "Denim",
  description: "Negro",
  price: 7500,
  thumbnail: "Images not available",
  code: "002a",
  stock: "25",
});

console.log("added producto", JSON.stringify(await pm.getProducts()));
producto = await pm.addProduct( {
  title: "Denim",
  description: "Gris",
  price: 9500,
  thumbnail: "Images not available",
  code: "003a",
  stock: "30",
});

console.log("added producto", JSON.stringify(await pm.getProducts()));

console.log("added producto", JSON.stringify(await pm.getProducts()));
producto = await pm.addProduct( {
  title: "Denim",
  description: "Azul",
  price: 6500,
  thumbnail: "Images not available",
  code: "004a",
  stock: "35",
});

console.log("added producto", JSON.stringify(await pm.getProducts()));

//await pm.updateProduct({ ...producto, price: 44000 });
//console.log("updated producto", JSON.stringify(await pm.getProducts()));

//await pm.removeProduct(producto.id);
//console.log("removed pproducto", JSON.stringify(await pm.getProducts())); 