import { Request, Response } from "express";
import LoginDTO from "../DTO/loginDTO";
import AuthService from "../services/authService";


export const handleSigninRequest = async (
    req: Request<any, any, LoginDTO>,
    res: Response
): Promise<void> => {
    try {
        const result = await AuthService.login(req.body);
        if (result.err) {
                res.status(200).json(result)
                return
            }
            
        console.log(result);
        res.cookie('auth_token', result.data?.token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });        
        res.status(200).json(result)

    } catch (error) {
        console.log("Server error:", error);
        res.status(400).json(error)

    }
};



export const handleLogoutRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });


        res.status(200).json({ message: 'logout ' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};