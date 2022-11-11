//se crea la ruta para acceder a los servicios del Backend
//Se importa la clase Router desde express para definir las rutas de acceso a los recursos del backend desde el frontend
import { Router } from "express";
import pController from '../controller/ProfileController';

class ProfileRoute{
    //se define la variable rutaApi de tipo Router 
    public rutaApi:Router;
    
    constructor(){
        this.rutaApi=Router();
        this.configRoute();
    }
    /**
     * Aquí se crea el método para definir todas las rutas del backend y se llama a la variable
     * rutaApi para que capture (get) y redireccione cada una de las peticiones
     */
    public configRoute(){ 
        
        this.rutaApi.get("/listallprofile", pController.consult);
        this.rutaApi.get("/oneprofile/:codigo", pController.consultOne);
        this.rutaApi.put("/createprofile", pController.insertProfile);
        this.rutaApi.delete("/deleteprofile/:codigo", pController.delProfile);

    }
}

const routeProfile= new ProfileRoute();
export default routeProfile.rutaApi;