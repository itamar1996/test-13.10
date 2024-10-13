import { Router } from "express";
import {
  handelRegister,
  handelGetGrade,
  handelGetGrades
} from "../controllers/studentController";

// import verifyUser from "../middleware/verifyUser";

const studentRouter = Router();

studentRouter.post("/",handelRegister );//create user
studentRouter.get("/", handelGetGrades);//get grades
studentRouter.get("/:id", handelGetGrade);//get grade

export default studentRouter;
