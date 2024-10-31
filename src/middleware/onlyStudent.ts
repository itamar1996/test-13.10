import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import TokenPayloadDTO from "../DTO/tokenPayloadDTO";
import { error } from "console";

const onlyStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // @ts-ignore
      const token: string = String (req.cookies?.auth_token || "");
      if (!token) {
        res.status(401).json({ message: "Token missing" });
        return
      }
        const decoded: TokenPayloadDTO = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as TokenPayloadDTO;
      if (decoded.role !== "student") {
        res.status(403).json({ message: "Access denied, only Students allowed" });
        return
      }      
      //@ts-ignore
      req.user = decoded
      next()
    } catch (err) {
      console.error("Error verifying token:", err);
      res.status(401).json({ message: "Unauthorized" });
    }
  };

  export default onlyStudent;
