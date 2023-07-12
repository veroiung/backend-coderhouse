import { promises as fs } from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  _writeProductsToFile = async (products) => {
    await fs.writeFile(this.path, JSON.stringify(products, null, "\t"), "utf-8");
  };

  async addProduct(product) {
    let currentProducts = await this.getProducts();

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.error("Data missing. All data is required");
      return;
    }

    if (currentProducts.some((p) => p.code === product.code)) {
      console.log(`A product with the code: ${product.code} already exists`);
      return;
    }

    let productId = 1;

    if (currentProducts.length != 0) {
      productId = currentProducts[currentProducts.length - 1].id + 1;
    }
    const newProducto = { ...product, id: productId };

    currentProducts.push(newProducto);

    try {
      await this._writeProductsToFile(currentProducts);
    } catch (error) {
      console.error(`Error reading file: ${this.path} - ${error.message}`);
    }

    return newProducto;
  }

  getProducts = async () => {
    let productsFromFile = [];
    try {
      const fileContent = await fs.readFile(this.path, "utf-8");
      productsFromFile = JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading file: ${this.path} - ${error.message}`);
    }
    return productsFromFile;
  };

  getProductById = (id) => {
    const products = this.getProducts();
    return products.find((product) => product.id === id);
  };

  async updateProduct(updateProduct) {
    const updateArray = await this.getProducts();
    const indexOfProductToUpdate = updateArray.findIndex((p) => p.id === updateProduct.id);

    if (indexOfProductToUpdate < 0) {
      console.error(`Can't find the product you are trying to update: id: ${updateProduct.id}`);
      return;
    }

    updateArray[indexOfProductToUpdate] = updateProduct;

    try {
      await this._writeProductsToFile(updateArray);
    } catch (error) {
      console.error(`Error writing file: ${this.path} - ${error.message}`);
    }

    return updateProduct;
  }

  removeProduct = async (id) => {
    const arrayToUpdate = await this.getProducts();
    const indexOfProductToDelete = arrayToUpdate.findIndex((p) => p.id === id);

    if (indexOfProductToDelete < 0) {
      console.error(`Can't find the product you are trying to delete: id: ${id}`);
      return;
    }

    arrayToUpdate.splice(indexOfProductToDelete, 1);

    try {
      await this._writeProductsToFile(arrayToUpdate);
    } catch (error) {
      console.error(`Error writing file: ${this.path} - ${error.message}`);
    }

    return arrayToUpdate;
  };
}