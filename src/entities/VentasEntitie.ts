import ProductEntitie from './ProductEntitie';
class VentasEntities{
    public codeProduct: ProductEntitie;
    public codeClient: Number;
    public valorVenta: Number;
    public dateVenta: Date;
    public cantidadProduct: Number;

    constructor(codeProduct:ProductEntitie, codeClient:Number, valor:Number, date:Date, cantidad:Number){
        this.codeProduct=codeProduct;
        this.codeClient=codeClient;
        this.valorVenta=valor;
        this.dateVenta=date;
        this.cantidadProduct=cantidad;

    }
}

export default VentasEntities;