//se crea la ruta para acceder a los servicios del Backend
//Se importa la clase Router desde express para definir las rutas de acceso a los recursos del backend desde el frontend
import { Router } from "express";
import ventasController from '../controller/VentasController';

class VentasRoute{
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
        
        this.rutaApi.get("/listaventas", ventasController.consultVentas);
        this.rutaApi.get("/oneventa/:codigo", ventasController.consultOne);
        this.rutaApi.put("/createventas", ventasController.insertVentas);
        this.rutaApi.delete("/deleteventas/:codigo", ventasController.delVentas);
        this.rutaApi.post("/updateventas/:codigo", ventasController.updateVentas);

    }
}

const routeVentas= new VentasRoute();
export default routeVentas.rutaApi;