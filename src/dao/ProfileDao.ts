import ProfileSchema from "../schema/ProfileSchema";
import { Response } from "express";

class ProfileDao{

    /**
    * Método para consultar los perfiles existentes
    *protectes: hace referencia a un método público pero para quien lo hereda se vuelve privado
    *async: hace referencia a que no espera que termine para continuar con la ejecución
    *definimos red como un parametro de tipo respuesta que escon la que se le entregarán los resultados al frontend
    */
    protected static async consultProfiles(res: Response):Promise <any> {

        //la siguiente línea es la que trae los perfiles existentes en la bd y el -1 los ordena en forma ascendente
        const allProfiles= await ProfileSchema.find().sort({_id:-1}) 
        //parametro rest entregará el json resultante de la consulta hecha al mongo
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
}

export default ProfileDao;
