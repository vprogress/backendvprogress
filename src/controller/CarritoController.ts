import CarritoDao from "../dao/CarritoDao";
import {Request, Response} from 'express';

class CarritoController extends CarritoDao{

        
    public procesar(req: Request, res: Response){
        
        CarritoController.gestionarCarrito(req.body, res);
    }

}
const carController=new CarritoController();
export default carController;