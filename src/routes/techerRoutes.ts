import { Router } from "express";
import { 
    handelRegister, 
    handelAddGrade
 } from "../controllers/teacherController";
// import verifyUser from "../middleware/verifyUser";

const techerRoute = Router();

techerRoute.post("/",handelRegister);//create user
techerRoute.post("/grades",handelAddGrade);//add grade
// techerRoute.get("/",handelGetGrades);//get grades for class
// techerRoute.get("/avg",handelGetAVG );//get avg grades
// techerRoute.get("/:id",handelGetGrade );//get grades for student
// techerRoute.patch("/", handelEditeGrade);//edite grade for student

export default techerRoute;
