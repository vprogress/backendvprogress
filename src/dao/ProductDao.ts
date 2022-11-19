import ProductSchema from "../schema/ProductSchema";
import { Response } from "express";
import VentasSchema from "../schema/VentasSchema";

class ProductDao{

    /**
    * Método para consultar los perfiles existentes
    *protectes: hace referencia a un método público pero para quien lo hereda se vuelve privado
    *async: hace referencia a que no espera que termine para continuar con la ejecución
    *definimos red como un parametro de tipo respuesta que escon la que se le entregarán los resultados al frontend
    */
    protected static async consultProduct(res: Response):Promise <any> {

        /**
         * la siguiente línea es la que trae los perfiles existentes en la bd y el -1 los ordena en forma ascendente
         * parametro rest entregará el json resultante de la consulta hecha al mongo
        */
        const allProducts= await ProductSchema.find().sort({_id:-1}) 
        console.log(allProducts);
        res.status(200).json(allProducts);
        // res.status(200).json({respuesta: "Excelente"});
    }

    /**
     * Método para consultar un sólo perfil de acuerdo al id indicado
     * @param idProduct : id del perfil a buscar
     * @param res : retorna un json con los datos del perfil encontrado
     */
    protected static async consultOneProduct(idProduct:any, res:Response):Promise <any>{
        const productToSearch= {_id: idProduct};
        const productResult= await ProductSchema.findOne(productToSearch).exec();
        if (productResult) {
            res.status(200).json(productResult);
        } else { 
            res.status(400).json({result:"No se encontró el producto buscado"})
        }
    }

    /**
     * método para crear un nuevo perfil 
     * nota: la línea delete newProfile._id, se crea por su seguridad para evitar que desde el frontend se vaya 
     * a insertar el id, teniendo en cuenta debe ser automático del sistema
     * @param newProduct : variable tipo json que contiene los datos del nuevo perfil a crear
     * @param res : variable que contendrá los resultados de la solicitud de creación del perfil 
     */
    protected static async createProduct(newProduct:any, res:Response):Promise <any>{
        delete newProduct._id;
        //validar que el perfil no existe
        const existProduct=await ProductSchema.findOne(newProduct).exec();
        if(existProduct){
            //si el perfil ya existe , no le permite la creación
            res.status(400).json({result:"El producto ya existe"})
        }
        else{
            //se crea un nuevo objeto de tipo perfil eschema con los datos que vienen en el newProfile
            const objProduct=new ProductSchema(newProduct);
            objProduct.save(
                (myError, myObjectResult)=>{
                    if (myError) {
                        res.status(400).json({result:"El producto no se creó correctamente"})
                    } else {
                        res.status(200).json({
                            result:"El producto se guardó como: ",
                            id: myObjectResult._id
                        });
                       
                    }
                }
            );
        }
    }
//     
// //  Revisar Linea 76, no hace sentido para este servicio.   
// //  
    protected static async deleteProduct(idProduct:any, res: Response):Promise <any>{
        const productToDelete= {_id: idProduct};
        const countVentas = await VentasSchema.countDocuments({ codeProduct: productToDelete});

        if (countVentas>0) {
            res.status(400).json({result:"Error, el producto no se puede eliminar, debido a que tiene ventas asociadas."})
            
        } else {
            //verifiquemos primero la i¿existencia
            const existe = await ProductSchema.findById(productToDelete).exec();
            if (existe) {
                ProductSchema.findByIdAndDelete(productToDelete, (myError: any, myObject: any)=>{
                    if (myError) {
                        res.status(400).json({result:"No se pudo eliminar el producto"})
                    } else {
                        res.status(200).json({result:"Producto eliminado exitosamente", 
                    objetDelet:myObject});
                        
                    }

                })
                                
            } else {
                res.status(400).json({result:"El producto no existe"}); 
            }
            
        }
    }

    protected static async updateProduct(idProduct:any, dataProduct: any, res: Response):Promise <any>{
        // se busca el producto a actualizar por el id, en caso que lo encuentre se va a
        // modificar, si no se encuentra se informa al frontend
        const searchProduct = await ProductSchema.findById(idProduct).exec();
        if (searchProduct) {
            // si el producto existe se actuaiza tomando como referencia el _id recibido
            ProductSchema.findOneAndUpdate(
                {_id: idProduct}, // filtro de busqueda del producto a actualizar
                { $set: dataProduct}, // datos a ser actualizados
                (myError: any, myObject: any) => {
                    if (myError){
                        res.status(400).json({result:"El producto no se puede actualizar."}); 
                    }else{
                        res.status(200).json({result:"Producto actualizado exitosamente.", 
                        profileOld: myObject,
                        profileNew: dataProduct});
                    }
                }
            );
        } else {
            res.status(400).json({result:"El producto no existe, no se puede actualizar."}); 
        }
    }

    protected static async listProductNotEmpty(res: Response):Promise <any>{

        const notEmpty= {productStock:{$gt:0}};
        const allProductsNotEmpty= await ProductSchema.find(notEmpty).sort({_id:-1}) 
        res.status(200).json(allProductsNotEmpty);

    }

    

    
 }

 export default ProductDao;
