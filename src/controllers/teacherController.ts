import { Request, Response } from "express";
import techerService from "../services/techerService";
import SignUpDTO from "../DTO/registerDTO";
import addGradeDTO from "../DTO/addGradeDTO";
import jwt from 'jsonwebtoken';


export const handelRegister = async (
    req: Request<any,any,SignUpDTO>,
     res: Response)
     :Promise<void> => {
    try {
        const result =  await techerService.signup(req.body);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
export const handelAddGrade = async (
    req: Request<any,any,addGradeDTO>,
     res: Response):Promise<void> => {
    try {
        const token = req.cookies.auth_token;
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        const teacherId = (decodedToken as any).id;
        const result =  await techerService.addGrade(req.body,teacherId);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};

export const handelGetGrades = async (req: Request, res: Response):Promise<void> => {
    try {
        const token = req.cookies.auth_token;
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        const teacherId = (decodedToken as any).id;
        const result =  await techerService.GetGrades(teacherId);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};
export const handelGetAVG = async (req: Request, res: Response):Promise<void> => {
    try {
        const token = req.cookies.auth_token;
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        const teacherId = (decodedToken as any).id;
        const result =  await techerService.GetAVG(teacherId);               res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};
export const handelGetGrade = async (req: Request, res: Response):Promise<void> => {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        const teacherId = (decodedToken as any).id;
        const result =  await techerService.GetGrade(teacherId,req.params.id);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};
export const handelEditeGrade = async (req: Request<any, any ,addGradeDTO>, res: Response):Promise<void> => {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        const teacherId = (decodedToken as any).id;
        const result =  await techerService.EditeGrade(teacherId,req.body); 
              res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};

