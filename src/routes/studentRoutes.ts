import { Router } from "express";
import {
  handelRegister,
  getGrades,
  getGrade,
  updatePost
} from "../controllers/studentController";
// import verifyUser from "../middleware/verifyUser";

const studentRouter = Router();

studentRouter.post("/",handelRegister );//create user
studentRouter.get("/", getGrades);//get grades
studentRouter.get("/:id", getGrade);//get grade

export default studentRouter;
