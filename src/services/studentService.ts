import registerDTO from "../DTO/registerDTO";
import responseData from "../DTO/responceDataDTO";
import studentModel from "../models/studentModel";
import bcrypt from 'bcrypt'
export default class UserService{
    public static async signup(user:registerDTO):Promise<responseData<{ id: string }>>{
        try {                        
            const { username, email ,password} = user;
            if(!username || !email || !password){
                return {
                    err: true,
                    message: "missing detales",
                    status: 400,
                };
            }
            const dbUser = new studentModel({
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
    public static async GetGrades(studentId:string): Promise<responseData<{ name: string; grade: number;}>> {
        try {
            const userGrades = await studentModel.findById(studentId).select('tests');
            return {
                err: false,
                message: "Fetched grades successfully",
                status: 200,
                data: userGrades
            };
        } catch (error) {
            console.error("Error fetching grades:", error); 
            return {
                err: true,
                message: "Server error",
                status: 500,
                data: error 
            };
        }
    }
    public static async GetGrade(studentId: string,testId:string): Promise<responseData<{ name: string; grade: number;}>> {
        try {
            const test = await studentModel.findById(studentId).select('tests')
            .findById(testId);
    
            if (!test) {
                return {
                    err: true,
                    message: "test not found",
                    status: 404,
                    data: null 
                };
            }
    
            return {
                err: false,
                message: "Fetched test successfully",
                status: 200,
                data: test
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