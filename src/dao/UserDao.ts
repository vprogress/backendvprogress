import UserSchema from "../schema/UserSchema";
import VentasSchema from "../schema/VentasSchema";
import { Response } from "express";


class UserDao{

    
    protected static async consultUser(res: Response):Promise <any> {

        const allUsers= await UserSchema.find().sort({_id:-1}) 
        res.status(200).json(allUsers);
    }

    
    protected static async consultOneUser(idUser:any, res:Response):Promise <any>{
        const userToSearch= {_id: idUser};
        const userResult= await UserSchema.findOne(userToSearch).exec();
        if (userResult) {
            res.status(200).json(userResult);
        } else { 
            res.status(400).json({result:"No se encontró el usuario buscado"})
        }
    }
    
        
    protected static async createUser(mail: any, newUser:any, res:Response):Promise <any>{
        delete newUser._id;
        //validar que el perfil no existe
        const existUser=await UserSchema.findOne(mail).exec();
        if(existUser){
            //si el perfil ya existe , no le permite la creación
            res.status(400).json({result:"El usuario ya existe"})
        }
        else{
            //se crea un nuevo objeto de tipo perfil eschema con los datos que vienen en el newProfile
            const objProduct=new UserSchema(newUser);
            objProduct.save(
                (myError, myObjectResult)=>{
                    if (myError) {
                        res.status(400).json({result:"El usuario no se creó correctamente"})
                    } else {
                        res.status(200).json({
                            result:"El usuario se guardó como: ",
                            id: myObjectResult._id
                        });
                       
                    }
                }
            );
        }
    }
    

    
    protected static async deleteUser(idUser:any, res: Response):Promise <any>{
        const userToDelete= {_id: idUser};
        const countVentas = await VentasSchema.countDocuments({ codeClient: userToDelete});
        console.log("Contador de ventas: ", countVentas);
        if (countVentas>0) {
            res.status(400).json({result:"Error, el usuario no se puede eliminar, debido a que tiene ventas asociadas."})
            
        } else {
            //verifiquemos primero la i¿existencia
            const existe = await UserSchema.findById(userToDelete).exec();
            if (existe) {
                UserSchema.findByIdAndDelete(userToDelete, (myError: any, myObject: any)=>{
                    if (myError) {
                        res.status(400).json({result:"No se pudo eliminar el usuario"})
                    } else {
                        res.status(200).json({result:"Usuario eliminado exitosamente", 
                    objetDelet:myObject});
                        
                    }

                })
                                
            } else {
                res.status(400).json({result:"El usuario no existe"}); 
            }
            
        }
    }



    protected static async updateUser(idUser:any, dataUser: any, res: Response):Promise <any>{

        const searchUser = await UserSchema.findById(idUser).exec();
        if (searchUser) {
            // si el producto existe se actuaiza tomando como referencia el _id recibido
            UserSchema.findOneAndUpdate(
                {_id: idUser}, // filtro de busqueda del producto a actualizar
                { $set: dataUser}, // datos a ser actualizados
                (myError: any, myObject: any) => {
                    if (myError){
                        res.status(400).json({result:"El usuario no se puede actualizar."}); 
                    }else{
                        res.status(200).json({result:"Uusario actualizado exitosamente.", 
                        userOld: myObject,
                        userNew: dataUser});
                    }
                }
            );
        } else {
            res.status(400).json({result:"El producto no existe, no se puede actualizar."}); 
        }
    }

 

    
 }

 export default UserDao;
