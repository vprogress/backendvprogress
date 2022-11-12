import ProfileSchema from "../schema/ProfileSchema";
import { Response } from "express";
import UserSchema from "../schema/UserSchema";

class ProfileDao{

    /**
    * Método para consultar los perfiles existentes
    *protectes: hace referencia a un método público pero para quien lo hereda se vuelve privado
    *async: hace referencia a que no espera que termine para continuar con la ejecución
    *definimos red como un parametro de tipo respuesta que escon la que se le entregarán los resultados al frontend
    */
    protected static async consultProfiles(res: Response):Promise <any> {

        /**
         * la siguiente línea es la que trae los perfiles existentes en la bd y el -1 los ordena en forma ascendente
         * parametro rest entregará el json resultante de la consulta hecha al mongo
        */
        const allProfiles= await ProfileSchema.find().sort({_id:-1}) 
        res.status(200).json(allProfiles);
    }

    /**
     * Método para consultar un sólo perfil de acuerdo al id indicado
     * @param idProfile : id del perfil a buscar
     * @param res : retorna un json con los datos del perfil encontrado
     */
    protected static async consultOneProfile(idProfile:any, res:Response):Promise <any>{
        const profileToSearch= {_id: idProfile};
        const profileResult= await ProfileSchema.findOne(profileToSearch).exec();
        if (profileResult) {
            res.status(200).json(profileResult);
        } else { 
            res.status(400).json({result:"No se encontró el perfil buscado"})
        }
    }

    /**
     * método para crear un nuevo perfil 
     * nota: la línea delete newProfile._id, se crea por su seguridad para evitar que desde el frontend se vaya 
     * a insertar el id, teniendo en cuenta debe ser automático del sistema
     * @param newProfile : variable tipo json que contiene los datos del nuevo perfil a crear
     * @param res : variable que contendrá los resultados de la solicitud de creación del perfil 
     */
    protected static async createProfile(newProfile:any, res:Response):Promise <any>{
        delete newProfile._id;
        //validar que el perfil no existe
        const existProfile=await ProfileSchema.findOne(newProfile).exec();
        if(existProfile){
            //si el perfil ya existe , no le permite la creación
            res.status(400).json({result:"El perfil ya existe"})
        }
        else{
            //se crea un nuevo objeto de tipo perfil eschema con los datos que vienen en el newProfile
            const objProfile=new ProfileSchema(newProfile);
            objProfile.save(
                (myError, myObjectResult)=>{
                    if (myError) {
                        res.status(400).json({result:"El perfil no se creó correctamente"})
                    } else {
                        res.status(200).json({
                            result:"El perfil se guardó como: ",
                            id: myObjectResult._id
                        });
                       
                    }
                }
            );
        }
    }

    protected static async deleteProfile(idProfile:any, res: Response):Promise <any>{
        const profileToDelete= {_id: idProfile};
        const countUser = await UserSchema.countDocuments({ userProfile: profileToDelete});

        if (countUser>0) {
            res.status(400).json({result:"Error, el perfil no se puede eliminar, debido a que tiene usuarios asociados"})
            
        } else {
            //verifiquemos primero la i¿existencia
            const existe = await ProfileSchema.findById(profileToDelete).exec();
            if (existe) {
                ProfileSchema.findByIdAndDelete(profileToDelete, (myError: any, myObject: any)=>{
                    if (myError) {
                        res.status(400).json({result:"No se pudo eliminar el perfil"})
                    } else {
                        res.status(200).json({result:"Perfil eliminado exitosamente", 
                    objetDelet:myObject});
                        
                    }

                })
                                
            } else {
                res.status(400).json({result:"El perfil no existe"}); 
            }
            
        }
    }

    protected static async updateProfile(idProfile:any, dataProfile: any, res: Response):Promise <any>{
        // se busca el perfil a actualizar por el id, en caso que lo encuentre se va a
        // modificar, si no se encuentra se informa al frontend
        const searchProfile = await ProfileSchema.findById(idProfile).exec();
        if (searchProfile) {
            // si el perfil existe se actuaiza tomando como referencia el _id recibido
            ProfileSchema.findOneAndUpdate(
                {_id: idProfile}, // filtro de busqueda del perfil a actualizar
                { $set: dataProfile}, // datos a ser actualizados
                (myError: any, myObject: any) => {
                    if (myError){
                        res.status(400).json({result:"El perfil no se puede actualizar"}); 
                    }else{
                        res.status(200).json({result:"Perfil actulizado exitosamente", 
                        profileOld: myObject,
                        profileNew: dataProfile});
                    }
                }
            );
        } else {
            res.status(400).json({result:"El perfil no existe, no se actualiza"}); 
        }
    }

    

    
}

export default ProfileDao;
