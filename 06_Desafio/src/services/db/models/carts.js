import mongoose from 'mongoose';

const collectionName = 'carts';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};


const cartsSchema = new mongoose.Schema({
    id: stringTypeSchemaNonUniqueRequired,
    products: {
        type:Array,
        default:[]
    }
});

export const cartsModel = mongoose.model(collectionName, cartsSchema);