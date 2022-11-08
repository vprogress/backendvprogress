import { model, Schema } from "mongoose";
import ProductEntitie from '../entities/ProductEntitie';

const ProductSchema = new Schema<ProductEntitie>(
    {
    productName: {type:String, required:true, unique:true, trim:true },
    productDescription: {type:String, required:true},
    productStock: {type:Number},
    productValue: {type:Number, required:true, trim:true},
    productImage: {type:String},
    },
    {versionKey: false}
)

export default model("Product", ProductSchema, "Product");