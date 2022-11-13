import ProductDao from '../dao/ProductDao';
import {Request, Response} from 'express';

//esta clase es heredada de ProfileDao, quiere decir que los puede utilizar, y como le dijimos en ProfileDao que era protecter, en esta clase queda privado
class ProductController extends ProductDao{

    /**
    * aquí se expone a través de un método oúblico los objetos de la clase Profile
    *Se crea un Método consult para obtener los perfiles disponibles en la BD a travpes 
    *del ProfileDao que es donde se ejecita la consulta
    */
    
    public consult(req: Request, res: Response){
        
        ProductController.consultProduct(res);
    }

    public consultOne(req: Request, res: Response){

        //le estamos diciendo que en la conexión al backend hay un parámetro en la ruta que indica el código o id a consultar
        ProductController.consultOneProduct(req.params.buscar, res);

    }

    /**
     * se crea el controlador para la creación de un nuevo Producto
     * nota: el req.body lo que hace es extraer los datos que fueron diligenciados en el formulario y
     * vienen en formato json
     * @param req : contiene los datos enviados desde el frontend
     * @param res : envía la respuesta al frontend 
     */
    public insertProduct(req: Request, res: Response){
        ProductController.createProduct(req.body, res);
    }

    public delProduct(req: Request, res: Response){
        ProductController.deleteProduct(req.params.codigo, res);

    }

    public update(req: Request, res: Response){
        ProductController.updateProduct(req.params.codigo, req.body, res);

    }


    public consultNotEmpty(req: Request, res: Response){
        
        ProductController.listProductNotEmpty(res);
    }
}

//se crea un objeto de tipo ProfileController para que en el export no se  utilice la clase si no el objeto
const proController=new ProductController();
export default proController;