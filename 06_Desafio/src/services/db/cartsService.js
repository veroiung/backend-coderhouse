import {cartsModel} from "./models/carts.js";

export default class CartsService {
    constructor() { 
        console.log("Working carts with Database persistence in mongodb");
    }

    getAll = async () => {
        let carts = await cartsModel.find();
        return carts.map(cart=>cart.toObject());
    }
    save = async (cart) => {
        let result = await cartsModel.create(cart);
        return result;
    }
}
