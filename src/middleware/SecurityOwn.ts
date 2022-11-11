// gestion de acceso haciendo uso de los Tokens

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class SecurityOwn {
  // req: recibe los querimientos, res: envia el resultado, next: continua dentro del codigo
  public tokenAnalize(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      // valida si existe la credencial
      try {
        const myKey = String(process.env.PASSWORD);
        
        const tokenRcb = req.headers.authorization?.split(" ")[1] as string;
        console.log(tokenRcb);
        const infoUsuario = jwt.verify(tokenRcb, myKey);
        req.body.datosUsuario = infoUsuario;
        console.log(req.body.datosUsuario);
        next();
      } catch (error) {
        res
          .status(401)
          .json({
            respuesta: "No se cuenta con credenciales de ingreso correctas",
          });
      }
    } else {
      // Codigo 401 es usuario no autorizado
      res
        .status(401)
        .json({ respuesta: "No se cuenta con credenciales de ingreso" });
    }

}
}

const securityOwn = new SecurityOwn();
export default securityOwn;