import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import TokenPayloadDTO from "../DTO/tokenPayloadDTO";

const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // @ts-ignore
      const token: string = String (req.cookies?.auth_token || "");
      console.log("Token from cookie:", token);
        const decoded: TokenPayloadDTO = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as TokenPayloadDTO;
      console.log(decoded);
      
      //@ts-ignore
      req.user = decoded
      next()
    } catch (err) {
      console.log(err)
      res.sendStatus(401)
    }
  };

  export default verifyUser;
