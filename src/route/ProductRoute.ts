//se crea la ruta para acceder a los servicios del Backend
//Se importa la clase Router desde express para definir las rutas de acceso a los recursos del backend desde el frontend
import { Router } from "express";
import proController from '../controller/ProductController';

class ProductRoute{
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
        
        this.rutaApi.get("/listallproducts", proController.consult);
        this.rutaApi.get("/oneproduct/:buscar", proController.consultOne);
        //Deberia ser post para crear nuevos datos por buenas practicas.
        this.rutaApi.put("/createproduct", proController.insertProduct);
        this.rutaApi.delete("/deleteproduct/:codigo", proController.delProduct);
        this.rutaApi.post("/updateproduct/:codigo", proController.update);
        this.rutaApi.get("/notempty", proController.consultNotEmpty);
        //Deberia ser patch o put para actualizar por buenas practicas.

    }
}

const routeProduct= new ProductRoute();
export default routeProduct.rutaApi;