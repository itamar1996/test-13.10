import registerDTO from "../DTO/registerDTO";
import responseData from "../DTO/responceDataDTO";
import userModel from "../models/userModel";
import UserModel from '../models/userModel'
import bcrypt from 'bcrypt'
export default class UserService{
    public static async signup(user:registerDTO):Promise<responseData<{ id: string }>>{
        try {                        
            const { username, email ,password} = user;
            const dbUser = new UserModel({
                username,
                email,
                password:await bcrypt.hash(password, 10)
              });              
            await dbUser.save()  
            return {
                err: false,
                message: "created",
                status: 200,
                data:dbUser._id
            };
        } catch (error) {
            return {
                err: true,
                message: "server eror",
                status: 500,
                data:error
            };
        }
    }
    public static async getAll(): Promise<responseData<{ id: string; username: string; email: string }>> {
        try {
            const users = await userModel.find({}).select('id username email');
            return {
                err: false,
                message: "Fetched users successfully",
                status: 200,
                data: users
            };
        } catch (error) {
            console.error("Error fetching users:", error); 
            return {
                err: true,
                message: "Server error",
                status: 500,
                data: error 
            };
        }
    }
    public static async getByUserName(username: string): Promise<responseData<{ id: string; username: string; email: string }>> {
        try {
            const user = await userModel.findOne({ username }).select('id username email'); 
    
            if (!user) {
                return {
                    err: true,
                    message: "User not found",
                    status: 404,
                    data: null 
                };
            }
    
            return {
                err: false,
                message: "Fetched user successfully",
                status: 200,
                data: user
            };
        } catch (error) {
            console.error("Error fetching user:", error); 
            return {
                err: true,
                message: "Server error",
                status: 500,
                data: error 
            };
        }
    }
    
    
}