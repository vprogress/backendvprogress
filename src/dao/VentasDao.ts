import VentasSchema from "../schema/VentasSchema";
import { Response } from "express";
import ProductSchema from "../schema/ProductSchema";
import  UserSchema  from "../schema/UserSchema";

class VentasDao{

    /**
    * Método para consultar los perfiles existentes
    *protectes: hace referencia a un método público pero para quien lo hereda se vuelve privado
    *async: hace referencia a que no espera que termine para continuar con la ejecución
    *definimos red como un parametro de tipo respuesta que escon la que se le entregarán los resultados al frontend
    */
    protected static async consultVentas(res: Response):Promise <any> {

        /**
         * la siguiente línea es la que trae los perfiles existentes en la bd y el -1 los ordena en forma ascendente
         * parametro rest entregará el json resultante de la consulta hecha al mongo
        */
        const allVentas= await VentasSchema.find().sort({_id:-1}) 
        res.status(200).json(allVentas);
    }

     /**
     * Método para consultar un sólo perfil de acuerdo al id indicado
     * @param idProfile : id del perfil a buscar
     * @param res : retorna un json con los datos del perfil encontrado
     */
    protected static async consultOneVenta(idVentas:any, res:Response):Promise <any>{
        const ventasToSearch= {_id: idVentas};
        const ventasResult= await VentasSchema.findOne(ventasToSearch).exec();
        if (ventasResult) {
            res.status(200).json(ventasResult);
        } else { 
            res.status(400).json({result:"No se encontró la venta"})
        }
    }

    /**
     * método para crear un nuevo perfil 
     * nota: la línea delete newProfile._id, se crea por su seguridad para evitar que desde el frontend se vaya 
     * a insertar el id, teniendo en cuenta debe ser automático del sistema
     * @param newVentas : variable tipo json que contiene los datos del nuevo perfil a crear
     * @param res : variable que contendrá los resultados de la solicitud de creación del perfil 
     */
    protected static async createVentas(newVentas:any, res:Response):Promise <any>{
        delete newVentas._id;
        //validar que el perfil no existe
        const existVentas=await VentasSchema.findOne(newVentas).exec();
        if(existVentas){
            //si el perfil ya existe , no le permite la creación
            res.status(400).json({result:"La Venta ya existe"})
        }
        else{
            //se crea un nuevo objeto de tipo perfil eschema con los datos que vienen en el newProfile
            const objVentas=new VentasSchema(newVentas);
            objVentas.save(
                (myError, myObjectResult)=>{
                    if (myError) {
                        res.status(400).json({result:"La venta no se creó correctamente"})
                    } else {
                        res.status(200).json({
                            result:"La venta se guardó como: ",
                            id: myObjectResult._id
                        });
                       
                    }
                }
            );
        }
    }
    // //  
    protected static async deleteVentas(idVentas:any, res: Response):Promise <any>{
        const ventasToDelete= {_id: idVentas};
        // const countUser = await UserSchema.countDocuments({ codeVentas: ventasToDelete});
        const countProduct = await ProductSchema.countDocuments({ codeVentas: ventasToDelete});

        if (countProduct>0) {
            res.status(400).json({result:"Error, la venta no se puede eliminar, debido a que tiene productos asociadas."})
            
        } else {
            //verifiquemos primero la i¿existencia
            const existe = await VentasSchema.findById(ventasToDelete).exec();
            if (existe) {
                VentasSchema.findByIdAndDelete(ventasToDelete, (myError: any, myObject: any)=>{
                    if (myError) {
                        res.status(400).json({result:"No se pudo eliminar la venta"})
                    } else {
                        res.status(200).json({result:"venta eliminada exitosamente", 
                    objetDelet:myObject});
                        
                    }

                })
                                
            } else {
                res.status(400).json({result:"La venta no existe"}); 
            }
            
        }
    }
    //
     protected static async updateVentas(idVentas:any, dataVentas: any, res: Response):Promise <any>{
        // se busca el producto a actualizar por el id, en caso que lo encuentre se va a
        // modificar, si no se encuentra se informa al frontend
        const searchVentas = await VentasSchema.findById(idVentas).exec();
        if (searchVentas) {
            // si el producto existe se actuaiza tomando como referencia el _id recibido
            ProductSchema.findOneAndUpdate(
                {_id: idVentas}, // filtro de busqueda del producto a actualizar
                { $set: dataVentas}, // datos a ser actualizados
                (myError: any, myObject: any) => {
                    if (myError){
                        res.status(400).json({result:"La venta no se puede actualizar."}); 
                    }else{
                        res.status(200).json({result:"La venta se actualizo exitosamente.", 
                        profileOld: myObject,
                        profileNew: dataVentas});
                    }
                }
            );
        } else {
            res.status(400).json({result:"La venta no existe, no se puede actualizar."}); 
        }
    }

}

export default VentasDao;
