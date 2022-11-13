import { connect } from "mongoose";

const ConectDB=()=>{
    const urlDB=String(process.env.DB_MONGO);
    //const urlDB=String(process.env.DB_MONGO_LOCAL);

    console.log("la variable ", urlDB);
    //funcion promesa, si se cumple, se hace algo, si no, se va por el catch
    connect(urlDB).then(()=>{
        console.log("conectado a la base de datos")
    } 
    )
    .catch((errorVar)=>{ //se creo la variable errorVar para que retorne el error que se genera
        console.log("No se pudo conectar, por el siguiente error: ", errorVar)
    })
}

export default ConectDB;
