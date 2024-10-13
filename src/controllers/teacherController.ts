import { Request, Response } from "express";
import UserService from "../services/studentService";
import SignUpDTO from "../DTO/registerDTO";

export const handelRegister = async (
    req: Request<any,any,SignUpDTO>,
     res: Response)
     :Promise<void> => {
    try {
        const result =  await UserService.signup(req.body);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
export const handelAddGrade = async (req: Request, res: Response):Promise<void> => {
    try {
        const result =  await UserService.getAll();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};

export const handelGetGrades = async (req: Request, res: Response):Promise<void> => {
    try {
        const result =  await UserService.getByUserName(req.params.username);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};
export const handelGetAVG = async (req: Request, res: Response):Promise<void> => {
    try {
        const result =  await UserService.getByUserName(req.params.username);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};
export const handelGetGrade = async (req: Request, res: Response):Promise<void> => {
    try {
        const result =  await UserService.getByUserName(req.params.username);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};
export const handelEditeGrade = async (req: Request, res: Response):Promise<void> => {
    try {
        const result =  await UserService.getByUserName(req.params.username);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};

