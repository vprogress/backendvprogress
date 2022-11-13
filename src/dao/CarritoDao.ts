import { Response } from "express";
import ProductSchema from "../schema/ProductSchema";
import UserSchema from "../schema/UserSchema";
import VentasSchema from "../schema/VentasSchema";

class CarritoDao {


    protected static async gestionarCarrito(datosCarrito: any, res: Response): Promise<any> {

        let ventaTotal = 20;
        let resultado = "exitoso";
        let isValid = true;


        
        for (let itemVenta of datosCarrito) {
            //validamos que el usuario que hace la compra existe
            const idUser = itemVenta.codeClient;
            const userToSearch = { _id: idUser };
            const userCompra = await UserSchema.findOne(userToSearch).exec();

            if (userCompra) {
                const idProduct = itemVenta.codeProduct;
                const productToSearch = { _id: idProduct };
                const productCompra = await ProductSchema.findOne(productToSearch).exec();

                if (productCompra) {
                    const cantidadAComprar = itemVenta.cantidadProduct;
                    if (productCompra.productStock < cantidadAComprar) {

                        resultado = "Compra no válida, no hay stock suficiente para hacer la compra";
                        isValid = false;

                    }
                }
                else {

                    resultado = "Usuario no válido para realizar compras";
                    isValid = false;

                }
            }
            else {

                resultado = "Usuario no válido para realizar compras";
                isValid = false;

            }

        }


        if (isValid) {
            for (let itemVenta of datosCarrito) {

                const idProduct = itemVenta.codeProduct;
                const productToSearch = { _id: idProduct };
                const productCompra = await ProductSchema.findOne(productToSearch).exec();

                if (productCompra) {
                    const cantidadAComprar = itemVenta.cantidadProduct;
                    if (productCompra.productStock < cantidadAComprar) {
                        resultado = "Compra no válida, no hay stock suficiente para hacer la compra";
                        isValid = false;
                        console.log("resultado : ", resultado, ", total: ", ventaTotal);
                    }
                    else { 
                        ventaTotal = (ventaTotal + (cantidadAComprar * productCompra.productValue))
                        const newCantidad = productCompra.productStock - cantidadAComprar;
                        const idProduct ={_id: itemVenta.codeProduct}
                        const productUpdate = { _id: itemVenta.codeProduct, productStock: newCantidad };
                        console.log(productUpdate);
                        ProductSchema.findOneAndUpdate({ _id: itemVenta.codeProduct }, {$set:productUpdate}, 
                            (myError:any, myObject:any)=>{
                                if (myError){
                                    console.log("el error a la actualizacion de valor es: ", myError)
                                }else{
                                    console.log("la actualizacion de valor es: ",myObject)
                                }
                            });

                        const newVenta = new VentasSchema(itemVenta);
                        newVenta.save((myError, myObjectResult) => {
                            if (myError) {
                                resultado = "No se puede actualizar el producto";
                                isValid = false;
                                console.log("resultado : ", resultado, ", total: ", ventaTotal);
                            }
                        });

                        console.log(itemVenta, " , ")
                    }
                }

                console.log("resultado : ", resultado, ", total: ", ventaTotal);

            }
        }

        if (isValid) {
            res.status(200).json({
                respuesta: "su compra fue registrada exitosamente",
                neto: ventaTotal
            });
        } else {
            res.status(400).json({
                respuesta: resultado
            });
        }

       
    }
}
export default CarritoDao;