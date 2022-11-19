import { Router } from "express";
import usController from '../controller/UserController';

class UserRoutePublic{
    //se define la variable rutaApi de tipo Router 
    public rutaApi:Router;
    
    constructor(){
        this.rutaApi=Router();
        this.configRoute();
    }
    
    public configRoute(){ 
        
        this.rutaApi.put("/createuserguest", usController.insertUserGuest);
        this.rutaApi.put("/login", usController.autenticUser);

    }
}

const routeUsersPublic= new UserRoutePublic();
export default routeUsersPublic.rutaApi;