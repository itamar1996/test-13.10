import { Request, Response, NextFunction } from "express";
import newPostDTO from "../DTO/newPostDTO";
import studentService from "../services/studentService";
import updatePostDTO from "../DTO/updatePostDTO";
import addCommentDTO from "../DTO/addCommentDTO";
import jwt from 'jsonwebtoken';
import SignUpDTO from "../DTO/registerDTO";

// Create a new post
export const handelRegister = async (
  req: Request<any,any,SignUpDTO>,
  res: Response,
): Promise<void> => {
  try {
    const result =  await studentService.signup(req.body);
    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};

export const handelGetGrades = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {    
    const token = req.cookies.auth_token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    const studentId = (decodedToken as any).id;
    const result =  await studentService.GetGrades(studentId);

    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};

export const handelGetGrade = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.cookies.auth_token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    const studentId = (decodedToken as any).id;
    const result =  await studentService.GetGrade(studentId,req.params.id);
    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};
