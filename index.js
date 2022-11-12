 "use strict";
 var __importDefault = (this && this.__importDefault) || function (mod) {
     return (mod && mod.__esModule) ? mod : { "default": mod };
 };
 Object.defineProperty(exports, "__esModule", { value: true });
 const Server_1 = __importDefault(require("./build/config/Server"));
 const myServer = new Server_1.default();
 myServer.initServer();


//bluuweb.github.io/node/05-db/#cluster
//https://bravedeveloper.com/2021/03/22/crear-un-api-rest-con-nodejs-y-express-nunca-fue-tan-provechoso-y-sencillo/

/*
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const morgan=require('morgan');
const Usuario =require("./build/schema/UserSchema")

const uri = "mongodb+srv://Seb:123@dbvprogress.opfxe7f.mongodb.net/?retryWrites=true&w=majority"

//Configuraciones puerto
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//Conexion a MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Conectado a MongoDB Atlas')) 
  .catch(e => console.log('error de conexión', e))

//Rutas
app.get('/', (req, res) => {    
    res.send("Hola Mundo")
})

app.post("/user", (req, res) => {    
    console.log(req.body)
})

//Conexion al servidor, escuchando...
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});
*/
