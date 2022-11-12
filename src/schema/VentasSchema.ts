import { model, Schema, Types } from 'mongoose';
import VentasEntities from '../entities/VentasEntitie';
import ProductEntitie from '../entities/ProductEntitie';

const VentasSchema=new Schema<VentasEntities>(
    { 
        codeProduct:{type: Types.ObjectId, ref:"Product", required:true},
        codeClient:{ type: Types.ObjectId, ref:"User", required:true},
        valorVenta:{ type:Number, required:true},
        dateVenta:{ type: Date, required:true},
        cantidadProduct:{ type: Number, required:true},
    },
    {
        versionKey: false
    }
);

export default model("Ventas", VentasSchema, "Ventas");