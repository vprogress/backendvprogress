import ProductEntitie from './ProductEntitie';
import UserEntities from './UserEntitie';
class VentasEntities{
    public codeProduct: ProductEntitie;
    public codeClient: UserEntities;
    public valorVenta: Number;
    public dateVenta: Date;
    public cantidadProduct: Number;

    constructor(codeProduct:ProductEntitie, codeClient:UserEntities, valor:Number, date:Date, cantidad:Number){
        this.codeProduct=codeProduct;
        this.codeClient=codeClient;
        this.valorVenta=valor;
        this.dateVenta=date;
        this.cantidadProduct=cantidad;

    }
}

export default VentasEntities;