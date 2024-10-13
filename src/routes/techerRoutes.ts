import { Router } from "express";
// import { createUser, getUser, getUsers } from "../controllers/userController";
import { log } from "console";
// import verifyUser from "../middleware/verifyUser";

const techerRoute = Router();

techerRoute.post("/",);//create user
techerRoute.post("/grades",);//add grade
techerRoute.get("/",);//get grades for class
techerRoute.get("/avg", );//get avg grades
techerRoute.get("/:id", );//get grades for student
techerRoute.patch("/", );//edite grade for student

export default techerRoute;
