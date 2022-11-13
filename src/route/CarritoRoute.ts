import { Router } from "express";
import carController from "../controller/CarritoController";

class CarritoRoute{
    //se define la variable rutaApi de tipo Router 
    public rutaApi:Router;
    
    constructor(){
        this.rutaApi=Router();
        this.configRoute();
    }
    
    public configRoute(){ 
        
        this.rutaApi.put("/procesarcarrito", carController.procesar);
        
    }
}

const routeUsers= new CarritoRoute();
export default routeUsers.rutaApi;
