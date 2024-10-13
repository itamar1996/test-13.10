import { Types } from "mongoose";
import registerDTO from "../DTO/registerDTO";
import responseData from "../DTO/responceDataDTO";
import teacherModel from "../models/teacherModel";
import userModel from "../models/teacherModel";
import classModel from "../models/classModel";
import bcrypt from 'bcrypt'
import addGradeDTO from "../DTO/addGradeDTO";
import { log } from "console";
import { Istudent } from "../models/studentModel";
export default class techerService{
    public static async signup(user:registerDTO):Promise<responseData<{ id: string }>>{
        try {                        
            const { username, email ,password,classname} = user;
            console.log(username);
            
            if(!username || !email || !password ||!classname){
                return {
                    err: true,
                    message: "missing detales",
                    status: 400,
                };
            }
            const classDoc = await classModel.findOne({ name: classname });
            if(classDoc){
                return {
                    err: true,
                    message: "the class already have a techer",
                    status: 400,
                };
            }
            const dbClass = new classModel({
                name:classname
            })
            await dbClass.save()
            const dbUser = new teacherModel({
                Username: username,
                email,
                password:await bcrypt.hash(password, 10),
                class: dbClass._id
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
    public static async addGrade(gradeData:addGradeDTO,teacherId:string): Promise<responseData<{ id: string; testname: string; grade: number }>> {
        try {
            const { studentId, testName, grade } = gradeData;

            const teacher = await teacherModel.findById(teacherId)
            .select('class')
            if (!teacher) {
                return {
                  err: true,
                  message: "Teacher not found",
                  status: 404,
                };
              }
            // const classDoc = await classModel.findById(teacher?.class).populate('students','_id tests')
            const classDoc = await classModel.findById(teacher?.class).populate<{ students: Istudent[] }>('students', '_id tests');

            if (!classDoc) {
              return {
                err: true,
                message: "class not found",
                status: 404,
              };
            }
            const student = classDoc.students.find(s => s._id.equals(new Types.ObjectId(studentId)));

            
            if (!student) {
              return {
                err: true,
                message: "Student not found",
                status: 404,
              };
            }
            
            student.tests.push({
                name: testName,
                grade
              });
            
            await student.save();
            
            return {
              err: false,
              message: "Test added successfully",
              status: 200,
              data:student
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