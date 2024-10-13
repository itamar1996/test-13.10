import { Request, Response } from "express";
import UserService from "../services/userService";
import SignUpDTO from "../DTO/registerDTO";

export const createUser = async (
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
export const getUsers = async (req: Request, res: Response):Promise<void> => {
    try {
        const result =  await UserService.getAll();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (req: Request, res: Response):Promise<void> => {
    try {
        const result =  await UserService.getByUserName(req.params.username);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};

// Optionally, add DELETE and EDIT functions
