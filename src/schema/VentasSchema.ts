import { model, Schema, Types } from 'mongoose';
import VentasEntities from '../entities/VentasEntitie';
import ProductEntitie from '../entities/ProductEntitie';

const VentasSchema=new Schema<VentasEntities>(
    { 
        codeProduct:{ type:Number, required:true},
        codeClient:{ type:Number, required:true},
        valorVenta:{ type:Number, required:true},
        dateVenta:{ type: Date, required:true},
        cantidadProduct:{ type: Number, required:true},
    },
    {
        versionKey: false
    }
);

export default model("Ventas", VentasSchema, "Ventas");