import { Router } from "express";
import { 
    handelRegister, 
    handelAddGrade,
    handelGetGrades,
    handelGetGrade,
    handelEditeGrade,
    handelGetAVG
 } from "../controllers/teacherController";
import onlyTeacher from "../middleware/onlyTeacher";
// import verifyUser from "../middleware/verifyUser";
const techerRoute = Router();

techerRoute.post("/",handelRegister);//create user
techerRoute.post("/grades",onlyTeacher,handelAddGrade);//add grade
techerRoute.get("/grades",onlyTeacher,handelGetGrades);//get grades for class
techerRoute.get("/grades/avg",onlyTeacher,handelGetAVG );//get avg grades
techerRoute.get("/grades/:id",onlyTeacher,handelGetGrade );//get grades for student
techerRoute.patch("/", onlyTeacher,handelEditeGrade);//edite grade for student



export default techerRoute;
