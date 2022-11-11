import ProfileDao from '../dao/ProfileDao';
import {Request, Response} from 'express';

//esta clase es heredada de ProfileDao, quiere decir que los puede utilizar, y como le dijimos en ProfileDao que era protecter, en esta clase queda privado
class ProfileController extends ProfileDao{

    /**
    * aquí se expone a través de un método oúblico los objetos de la clase Profile
    *Se crea un Método consult para obtener los perfiles disponibles en la BD a travpes 
    *del ProfileDao que es donde se ejecita la consulta
    */
    
    public consult(req: Request, res: Response){
        
        ProfileController.consultProfiles(res);
    }

    public consultOne(req: Request, res: Response){

        //le estamos diciendo que en la conexión al backend hay un parámetro en la ruta que indica el código o id a consultar
        ProfileController.consultOneProfile(req.params.codigo, res);

    }
}

//se crea un objeto de tipo ProfileController para que en el export no se  utilice la clase si no el objeto
const pController=new ProfileController();
export default pController;