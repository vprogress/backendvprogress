import express from "express"
import dotenv from "dotenv"
import ConectDB from './ConectDB';
import cors from "cors"
import morgan from "morgan"

class Server {
    //Variable para cargar la condiguracion de todo lo que se va a hacer
    public app: express.Application;

    constructor(){
        //Habilitamos las varianles de ambiente
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

    }

    public initServer(){
        this.app.listen(this.app.get("PORT"), ()=>
        {
            console.info("servidor iniciado en el puerto: ", this.app.get("PORT") );
        })

    }
}

export default Server;