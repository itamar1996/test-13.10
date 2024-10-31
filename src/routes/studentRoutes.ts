import { Router } from "express";
import {
  handelRegister,
  handelGetGrade,
  handelGetGrades
} from "../controllers/studentController";
import onlyStudent from "../middleware/onlyStudent";

// import verifyUser from "../middleware/verifyUser";

const studentRouter = Router();

studentRouter.post("/",handelRegister );//create user
studentRouter.get("/",onlyStudent, handelGetGrades);//get grades
studentRouter.get("/:id",onlyStudent, handelGetGrade);//get grade

export default studentRouter;
