import express from "express"
import dotenv from "dotenv"
import ConectDB from './ConectDB';
import cors from "cors"
import morgan from "morgan"

/**
 * este import lo que hace es tomar el export de la clase ProfileRoute y cambiarle el 
 * nombre a apiProfileRoute para no generar confusión y facilitar su use con respecto a la definición 
 * de las rutas
 */
import apiProfileRoute from "../route/ProfileRoute"
import apiProductRoute from "../route/ProductRoute"
import apiUserRoute from "../route/UserRoute"
import  apiVentasRoute  from "../route/VentasRoute";

class Server {
    //Variable para cargar la condiguracion de todo lo que se va a hacer
    public app: express.Application;

    constructor(){
        //Habilitamos las varianles de ambiente
        const prueb = "HOla";

        dotenv.config({
            path:"variables.env"
        })

        ConectDB();
        this.app=express();
        this.initConfig();
        this.initRoutes();
        
    }

    public initConfig(){
        this.app.set("PORT", process.env.PORT);
        this.app.use(morgan("dev"));
        this.app.use(express.json({
            limit:"50MB"
        }))
        this.app.use(express.urlencoded({
            extended: true
        })) 
        this.app.use(cors())
    }

    public initRoutes(){
        this.app.use("/api/profile", apiProfileRoute);
       // this.app.use("/api/users", apiProfileRoute);
        this.app.use("/api/product", apiProductRoute);
       // this.app.use("/api/ventas", apiProfileRoute);

    }

    public initServer(){
        this.app.listen(this.app.get("PORT"), ()=>
        {
            console.info("servidor iniciado en el puerto: ", this.app.get("PORT") );
        })

    }
}

export default Server;