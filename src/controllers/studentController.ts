import { Request, Response, NextFunction } from "express";
import newPostDTO from "../DTO/newPostDTO";
import PostService from "../services/postService";
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
    const result =  await UserService.signup(req.body);
    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};

export const getGrades = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {    
    const token = req.cookies.auth_token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = (decodedToken as any).id;
    const result =  await PostService.deleteByPostId(req.params.id,userId);

    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};

export const getGrade = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result =  await PostService.getAllPosts();
    res.status(200).json(result)
} catch (error) {
    console.log(error);
}
};
