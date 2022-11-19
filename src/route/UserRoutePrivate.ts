import { Router } from "express";
import usController from '../controller/UserController';

class UserRoute{
    //se define la variable rutaApi de tipo Router 
    public rutaApi:Router;
    
    constructor(){
        this.rutaApi=Router();
        this.configRoute();
    }
    
    public configRoute(){ 
        
        this.rutaApi.get("/listalluser", usController.consult);
        this.rutaApi.get("/oneuser/:buscar", usController.consultOne);
        //Deberia ser post para crear nuevos datos por buenas practicas.
        this.rutaApi.put("/createuser", usController.insertUser);
        this.rutaApi.delete("/deleteuser/:codigo", usController.delUser);
        this.rutaApi.post("/updateuser/:codigo", usController.update);
        //Deberia ser patch o put para actualizar por buenas practicas.

    }
}

const routeUsers= new UserRoute();
export default routeUsers.rutaApi;