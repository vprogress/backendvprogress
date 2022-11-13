import { Response } from "express";
import ProductSchema from "../schema/ProductSchema";
import UserSchema from "../schema/UserSchema";
import VentasSchema from "../schema/VentasSchema";

class CarritoDao{

    protected static async gestionarCarrito(datosCarrito: any, res: Response):Promise <any> {

        datosCarrito.map(
           async (itemVenta:any, index:any)=>{
                //validamos que el usuario que hace la compra existe
                const idUser= itemVenta.codeClient; 
                const userToSearch= {_id:idUser};
                const userCompra= await UserSchema.findOne(userToSearch).exec();

                if(userCompra){
                    const idProduct= itemVenta.codeProduct; 
                    const productToSearch= {_id:idProduct};
                    const productCompra= await ProductSchema.findOne(productToSearch).exec();
    
                    if(productCompra){
                     const cantidadAComprar=itemVenta.cantidadProduct;
                     if(productCompra.productStock < cantidadAComprar){
                        res.status(400).json({
                            respuesta: "Compra no válida, no hay stock suficiente para hacer la compra"
                        });
                     }
                    }
                    else{
                        res.status(400).json({
                            respuesta: "Usuario no válido para realizar compras"
                        });
                    }
                }
                else{
                    res.status(400).json({
                        respuesta: "Usuario no válido para realizar compras"
                    });
                    return;
                }

            }
        );

        let ventaTotal = 20;

        datosCarrito.map(
            async (itemVenta:any, index:any)=>{
                //actualizamos cantidad de productos

                const idProduct= itemVenta.codeProduct; 
                const productToSearch= {_id:idProduct};
                const productCompra= await ProductSchema.findOne(productToSearch).exec();

                if(productCompra){
                 const cantidadAComprar=itemVenta.cantidadProduct;
                 if(productCompra.productStock < cantidadAComprar){
                    res.status(400).json({
                        respuesta: "Compra no válida, no hay stock suficiente para hacer la compra"
                    });
                    return;
                 }
                 else{
                    ventaTotal= (ventaTotal+(cantidadAComprar*productCompra.productValue))
                    const newCantidad=productCompra.productStock - cantidadAComprar;
                    const productUpdate ={_id: itemVenta.codeProduct, productStock:newCantidad};
                    ProductSchema.findOneAndUpdate({_id: itemVenta.codeProduct}, productUpdate);
                    
                    const newVenta=new VentasSchema(itemVenta);
                    newVenta.save();

                    console.log(itemVenta, " , ", index, "," , ventaTotal)
                 }
                }

            });
       
        //const allProducts= await ProductSchema.find().sort({_id:-1}) 
        res.status(200).json({
            respuesta: "su compra fue registrada exitosamente", 
            valorCompra: ventaTotal
        });
    }

}
export default CarritoDao;