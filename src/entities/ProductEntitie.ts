class ProductEntitie{
    public productName: string;
    public productDescription: string;
    public productStock: number;
    public productValue: number;
    public productImage: string;

    constructor(name:string, description:string, stock:number, value:number, image:string){
        this.productName=name;
        this.productDescription=description;
        this.productStock=stock;
        this.productValue=value;
        this.productImage=image;
    }

}

export default ProductEntitie;