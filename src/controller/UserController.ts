import UserDao from "../dao/UserDao";
import {Request, Response} from 'express';

class UserController extends UserDao{

        
    public consult(req: Request, res: Response){
        
        UserController.consultUser(res);
    }

    
    public consultOne(req: Request, res: Response){

        //le estamos diciendo que en la conexión al backend hay un parámetro en la ruta que indica el código o id a consultar
        UserController.consultOneUser(req.params.buscar, res);

    }
    
    
    
    public insertUser(req: Request, res: Response){
        const newMail={userMail:req.body.userMail};
        UserController.createUser(newMail, req.body, res);
    }



    public delUser(req: Request, res: Response){
        UserController.deleteUser(req.params.codigo, res);

    }



    public update(req: Request, res: Response){
        UserController.updateUser(req.params.codigo, req.body, res);

    }


}

//se crea un objeto de tipo ProfileController para que en el export no se  utilice la clase si no el objeto
const usController=new UserController();
export default usController;