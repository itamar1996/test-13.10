import { Types } from "mongoose";
import registerDTO from "../DTO/registerDTO";
import responseData from "../DTO/responceDataDTO";
import teacherModel from "../models/teacherModel";
import classModel, { IClass } from "../models/classModel";
import bcrypt from 'bcrypt'
import addGradeDTO from "../DTO/addGradeDTO";
import studentModel, { Istudent } from "../models/studentModel";
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

    public static async GetGrades(teacherId:string): Promise<responseData<{ name: string; grade: number;}>> {
        try {
            
            const teacher = await teacherModel.findById(teacherId)
            .select('class')
            if (!teacher) {
                return {
                  err: true,
                  message: "Teacher not found",
                  status: 404,
                };
              }
            const classDoc = await classModel.findById(teacher?.class).populate<{ students: Istudent[] }>('students', 'name tests');



            if (!classDoc) {
              return {
                err: true,
                message: "class not found",
                status: 404,
              };
            }
    
            return {
                err: false,
                message: "Fetched user successfully",
                status: 200,
                data: classDoc
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
    public static async GetGrade(teacherId: string, studentId: string): Promise<responseData<{ name: string; grade: number }[]>> {
        try {
            const teacher = await teacherModel.findById(teacherId)
                .select('class')
    
            if (!teacher) {
                return {
                    err: true,
                    message: "Teacher or class not found",
                    status: 404,
                };
            }
    
            const student = await studentModel.findById(studentId)
            .select('class tests');
            if (!student ) {
                return {
                    err: true,
                    message: "student not found",
                    status: 404,
                };
            }
            
            if (student.class.toString() != teacher.class.toString() ) {
                return {
                    err: true,
                    message: "class not youres",
                    status: 402,
                };
            }
            return {
                err: false,
                message: "Fetched student grades successfully",
                status: 200,
                data: student.tests,
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
    public static async EditeGrade(teacherId: string, gradeData: addGradeDTO): Promise<responseData<{ name: string; grade: number }[]>> {
        try {
            const teacher = await teacherModel.findById(teacherId)
                .select('class')
    
            if (!teacher) {
                return {
                    err: true,
                    message: "Teacher or class not found",
                    status: 404,
                };
            }
    
            const student = await studentModel.findById(gradeData.studentId)
            .select('class tests');
            if (!student ) {
                return {
                    err: true,
                    message: "student not found",
                    status: 404,
                };
            }
            if (student.class != teacher.class ) {
                return {
                    err: true,
                    message: "class not youres",
                    status: 402,
                };
            }

            const test = student.tests.find(n => n.name == gradeData.testName)
            if (!test) {
                return {
                    err: true,
                    message: "test not youres",
                    status: 402,
                };
            }
            test.grade = gradeData.grade;
            student.save()

            return {
                err: false,
                message: "Fetched student grades successfully",
                status: 200,
                data: student.tests,
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
    
    
    
    public static async GetAVG(teacherId: string): Promise<responseData<{ name: string; avg: number | null }>> {
        try {
          const teacher = await teacherModel.findById(teacherId).select('class');
          if (!teacher) {
            return {
              err: true,
              message: "Teacher not found",
              status: 404,
            };
          }
          const classDoc = await classModel.findById(teacher.class).populate('students');

          if (!classDoc) {
            return {
              err: true,
              message: "Class not found",
              status: 404,
            };
          }
    
          if (classDoc.students.length === 0) {
            return {
              err: false,
              message: "Class has no students yet",
              status: 200,
              data: { name: classDoc.name, avg: null }
            };
          }
          const students = await studentModel.find({ _id: { $in: classDoc.students } }).exec();

        //   const students = classDoc.students as Istudent[];
             
          const studentAverages = students.map(student => {
            if (student.tests.length === 0) return 0;
            const sum = student.tests.reduce((acc, test) => acc + test.grade, 0);
            return sum / student.tests.length;
          });

          const classAverage = studentAverages.reduce((acc, avg) => acc + avg, 0) / students.length;

          await classModel.findByIdAndUpdate(teacher.class.toString(), { avg: classAverage });
      
    
          return {
            err: false,
            message: "Fetched average grade successfully",
            status: 200,
            data: { name: classDoc.name, avg: classAverage }
          };
        } catch (error) {
          console.error("Error fetching average grade:", error);
          return {
            err: true,
            message: "Server error",
            status: 500,
          };
        }
      }
    
}